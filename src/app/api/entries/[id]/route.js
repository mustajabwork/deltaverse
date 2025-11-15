import { NextResponse } from "next/server";
import connect from "@/lib/mongoose";
import Entry from "@/models/Entry";
import { checkRateLimit } from "@/lib/rateLimiter";

export async function GET(req, { params }) {
  const ip = req.headers.get("x-forwarded-for") || req.ip || "unknown";
  const rl = checkRateLimit(`${ip}:GET:/api/entries/:id`);
  if (!rl.ok)
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  const { id } = params;
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  try {
    await connect();
    const entry = await Entry.findById(id).lean();
    if (!entry)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(entry);
  } catch (err) {
    console.error("GET /api/entries/[id] error", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  // you probably want auth here for delete in future
  const ip = req.headers.get("x-forwarded-for") || req.ip || "unknown";
  const rl = checkRateLimit(`${ip}:DELETE:/api/entries/:id`);
  if (!rl.ok)
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  const { id } = await params;
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  try {
    await connect();
    const deleted = await Entry.findByIdAndDelete(id);
    if (!deleted)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("DELETE /api/entries/[id] error", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
