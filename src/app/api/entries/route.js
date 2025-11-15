import { NextResponse } from "next/server";
import connect from "@/lib/mongoose";
import Entry from "@/models/Entry";
import { validateEntryInput } from "@/lib/validators";
import { checkRateLimit } from "@/lib/rateLimiter";

export async function GET(req) {
  // Rate limit read requests a little
  const ip = req.headers.get("x-forwarded-for") || req.ip || "unknown";
  const rl = checkRateLimit(`${ip}:GET:/api/entries`);
  if (!rl.ok)
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  try {
    await connect();
    // allow query args for sort/limit/pagination if needed
    const url = new URL(req.url);
    const limit = Math.min(
      parseInt(url.searchParams.get("limit") || "0", 10) || 0,
      200
    );
    const sort =
      url.searchParams.get("sort") === "asc" ? { date: 1 } : { date: -1 };

    const query = Entry.find();
    if (limit > 0) query.limit(limit);
    query.sort(sort);
    const entries = await query.lean();
    return NextResponse.json(entries);
  } catch (err) {
    console.error("GET /api/entries error", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  // Rate limit writes more strictly
  const ip = req.headers.get("x-forwarded-for") || req.ip || "unknown";
  const rl = checkRateLimit(`${ip}:POST:/api/entries`);
  if (!rl.ok)
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  // protect size: reject very large bodies early by reading text and limiting length
  const text = await req.text();
  const MAX_BODY = 200_000; // ~200KB
  if (text.length > MAX_BODY) {
    return NextResponse.json(
      { error: "Request body too large" },
      { status: 413 }
    );
  }

  let payload;
  try {
    payload = JSON.parse(text);
  } catch (err) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // validate + sanitize
  const { success, data, errors } = validateEntryInput(payload);
  if (!success) {
    return NextResponse.json(
      { error: "Validation failed", details: errors },
      { status: 400 }
    );
  }

  try {
    await connect();

    // ensure media objects are valid and limited to allowed types/sizes already by schema
    // create entry
    const entry = new Entry({
      date: data.date,
      title: data.title,
      content: data.content,
      categories: data.categories,
      tags: data.tags,
      media: data.media,
      externalLinks: data.externalLinks,
    });

    await entry.save();
    return NextResponse.json(entry, { status: 201 });
  } catch (err) {
    console.error("POST /api/entries error", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
