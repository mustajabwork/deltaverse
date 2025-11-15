"use client";
import React, { useEffect, useState, useRef } from "react";

const Delta = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null });
  const [codeModal, setCodeModal] = useState({ open: false, code: "" });

  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10), // yyyy-mm-dd
    title: "",
    content: "",
    categories: "",
    tags: "",
    mediaUrl: "",
    mediaType: "image",
    externalLinks: "",
  });

  const containerRef = useRef(null);

  const fetchEntries = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/entries");
      const data = await res.json();
      setEntries(data.sort((a, b) => new Date(a.date) - new Date(b.date)));
    } catch (e) {
      console.error("🔴Error while fetching entries...", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    // Normalize categories/tags/links as arrays
    const body = {
      ...form,
      categories: form.categories
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      tags: form.tags
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      externalLinks: form.externalLinks
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      media: form.mediaUrl
        ? [
            {
              url: form.mediaUrl,
              type: form.mediaType,
              title: form.title || "", // optional, or add a separate field
            },
          ]
        : [],
    };
    try {
      const res = await fetch("/api/entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(await res.text());
      setForm({
        date: new Date().toISOString().slice(0, 10),
        title: "",
        content: "",
        categories: "",
        tags: "",
        mediaUrl: "",
        mediaType: "image",
        externalLinks: "",
      });
      fetchEntries();
      // scroll to bottom to see new entry
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }, 250);
    } catch (err) {
      console.error(err);
      alert("🔴Failed to save entry: " + err.message);
    }
  };

  const confirmDelete = (id) => {
    setDeleteModal({ open: true, id });
  };

  const handleDelete = async () => {
    if (!deleteModal.id) return;
    const res = await fetch("/api/entries/" + deleteModal.id, {
      method: "DELETE",
    });
    if (!res.ok) {
      const text = await res.text();
      console.error("Failed to delete:", res.status, text);
      alert("Failed to delete entry");
    }
    setDeleteModal({ open: false, id: null });
    fetchEntries();
  };

  const MediaItem = ({ media, className = "" }) => {
    return (
      <div className={`overflow-hidden rounded ${className}`}>
        {media.type === "image" && (
          <img
            src={media.url}
            alt={media.title || "image"}
            className="w-full h-full object-cover rounded"
          />
        )}
        {media.type === "youtube" && (
          <div className="aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${extractYouTubeId(
                media.url
              )}`}
              title={media.title || "youtube"}
              allowFullScreen
              className="w-full h-full rounded"
            />
          </div>
        )}
        {media.type === "video" && (
          <video controls className="w-full h-full rounded object-cover">
            <source src={media.url} />
            Your browser does not support the video tag.
          </video>
        )}
        {media.type === "document" && (
          <a
            href={media.url}
            target="_blank"
            rel="noreferrer"
            className="underline block p-2"
          >
            Open document
          </a>
        )}
      </div>
    );
  };

  return (
    <main className="min-h-screen p-6" ref={containerRef}>
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold">My Diary</h1>
          <p className="mt-2 text-sm text-zinc-500">
            This is the place where I store my absolutely raw reality in form of
            text, images, videos and links.
          </p>
        </header>

        <section className="mb-8 p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">New Entry</h2>
          <form onSubmit={submit} className="space-y-3">
            <div className="flex gap-2">
              <input
                name="date"
                value={form.date}
                onChange={handleChange}
                type="date"
                className="flex-1 p-2 border rounded"
              />
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Title (optional)"
                className="flex-2 p-2 border rounded w-2/3"
              />
            </div>

            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="Write your journal entry here..."
              rows="6"
              className="w-full p-3 border rounded"
            />

            <div className="grid grid-cols-2 gap-2">
              <input
                name="categories"
                value={form.categories}
                onChange={handleChange}
                placeholder="categories (comma separated)"
                className="p-2 border rounded"
              />
              <input
                name="tags"
                value={form.tags}
                onChange={handleChange}
                placeholder="tags (comma separated)"
                className="p-2 border rounded"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <select
                name="mediaType"
                value={form.mediaType}
                onChange={handleChange}
                className="p-2 border rounded"
              >
                <option value="image">Image URL</option>
                <option value="youtube">YouTube URL</option>
                <option value="video">Video URL</option>
                <option value="document">External document link</option>
              </select>
              <input
                name="mediaUrl"
                value={form.mediaUrl}
                onChange={handleChange}
                placeholder="media / document URL"
                className="p-2 border rounded col-span-2"
              />
            </div>

            <textarea
              name="externalLinks"
              value={form.externalLinks}
              onChange={handleChange}
              placeholder="Extra links (one per line)"
              rows={2}
              className="w-full p-2 border rounded"
            />

            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-sky-600 text-white rounded-2xl"
              >
                Save entry
              </button>
              <button
                type="button"
                onClick={() => {
                  setForm({
                    date: new Date().toISOString().slice(0, 10),
                    title: "",
                    content: "",
                    categories: "",
                    tags: "",
                    mediaUrl: "",
                    mediaType: "image",
                    externalLinks: "",
                  });
                }}
                className="px-4 py-2 border rounded-2xl"
              >
                Reset
              </button>
            </div>
          </form>
        </section>

        <section className="space-y-6">
          {loading && <p className="text-zinc-500">⚫Loading...</p>}
          {entries.length === 0 && !loading && (
            <p className="text-zinc-500">
              No entries yet — write your first one above.
            </p>
          )}

          {entries.map((entry) => (
            <article key={entry._id} className="p-6 rounded-2xl shadow">
              <div className="flex justify-between items-start">
                <div>
                  <time className="text-sm text-zinc-500">
                    {new Date(entry.date).toLocaleDateString()}
                  </time>
                  <h3 className="text-2xl font-semibold">
                    {entry.title || "—"}
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-sm text-zinc-600">
                    {entry.categories?.join(", ")}
                  </div>
                  <div className="mt-2 space-x-2">
                    <button
                      onClick={() =>
                        setCodeModal({
                          open: true,
                          code: JSON.stringify(entry, null, 2),
                        })
                      }
                      className="text-xs px-2 py-1 border rounded"
                    >
                      View JSON
                    </button>
                    <button
                      onClick={() => confirmDelete(entry._id)}
                      className="text-xs px-2 py-1 border rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>

              <div className="prose max-w-none mt-4">
                {/* Raw content (rendered as simple paragraph + linebreaks) */}
                {entry.content.split("\n").map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {/* Media rendering */}
              {entry.media?.length > 0 && (
                <div className="mt-4 w-full">
                  {entry.media.length === 1 && (
                    <div className="flex justify-center w-full">
                      <MediaItem
                        media={entry.media[0]}
                        className="w-full max-h-[500px]"
                      />
                    </div>
                  )}

                  {entry.media.length === 2 && (
                    <div className="grid grid-cols-2 gap-2 w-full">
                      {entry.media.map((m, i) => (
                        <MediaItem key={i} media={m} className="h-[300px]" />
                      ))}
                    </div>
                  )}

                  {entry.media.length === 3 && (
                    <div className="grid grid-cols-2 gap-2 w-full">
                      <div className="grid grid-rows-2 gap-2">
                        <MediaItem
                          media={entry.media[0]}
                          className="h-[145px]"
                        />
                        <MediaItem
                          media={entry.media[1]}
                          className="h-[145px]"
                        />
                      </div>
                      <MediaItem
                        media={entry.media[2]}
                        className="row-span-2 h-[300px]"
                      />
                    </div>
                  )}

                  {entry.media.length === 4 && (
                    <div className="grid grid-cols-3 gap-2 w-full">
                      <MediaItem
                        media={entry.media[2]}
                        className="row-span-2 h-[300px]"
                      />
                      <div className="grid grid-rows-2 gap-2">
                        <MediaItem
                          media={entry.media[0]}
                          className="h-[145px]"
                        />
                        <MediaItem
                          media={entry.media[1]}
                          className="h-[145px]"
                        />
                      </div>
                      <MediaItem
                        media={entry.media[3]}
                        className="row-span-2 h-[300px]"
                      />
                    </div>
                  )}

                  {entry.media.length === 5 && (
                    <div className="grid grid-cols-4 gap-2 w-full">
                      <div className="grid grid-rows-2 gap-2">
                        <MediaItem
                          media={entry.media[0]}
                          className="h-[145px]"
                        />
                        <MediaItem
                          media={entry.media[1]}
                          className="h-[145px]"
                        />
                      </div>
                      <MediaItem
                        media={entry.media[2]}
                        className="col-span-2 h-[300px]"
                      />
                      <div className="grid grid-rows-2 gap-2">
                        <MediaItem
                          media={entry.media[3]}
                          className="h-[145px]"
                        />
                        <MediaItem
                          media={entry.media[4]}
                          className="h-[145px]"
                        />
                      </div>
                    </div>
                  )}

                  {entry.media.length === 6 && (
                    <div className="flex gap-2">
                      <div className="grid grid-cols-3 gap-2 w-full">
                        <MediaItem
                          media={entry.media[0]}
                          className="col-span-3 row-span-3 h-[450px]"
                        />
                        <MediaItem
                          media={entry.media[1]}
                          className="col-span-3 h-[150px]"
                        />
                      </div>
                      <div className="grid grid-rows-3 gap-2">
                        <MediaItem
                          media={entry.media[2]}
                          className="h-[145px]"
                        />
                        <MediaItem
                          media={entry.media[3]}
                          className="h-[145px]"
                        />
                        <MediaItem
                          media={entry.media[4]}
                          className="h-[145px]"
                        />
                        <MediaItem
                          media={entry.media[4]}
                          className="h-[145px]"
                        />
                      </div>
                    </div>
                  )}

                  {entry.media.length === 7 && (
                    <div className="grid grid-cols-4 gap-2 w-full">
                      <MediaItem
                        media={entry.media[0]}
                        className="col-span-2 row-span-3 h-[300px]"
                      />
                      <div className="grid grid-cols-1 col-span-2 gap-2">
                        <MediaItem
                          media={entry.media[1]}
                          className="h-[145px]"
                        />
                        <MediaItem
                          media={entry.media[2]}
                          className="h-[145px]"
                        />
                      </div>
                      <div className="grid grid-cols-4 col-span-4 gap-2 mt-2">
                        {entry.media.slice(3).map((m, i) => (
                          <MediaItem key={i} media={m} className="h-[100px]" />
                        ))}
                      </div>
                    </div>
                  )}

                  {entry.media.length > 7 && (
                    <div className="grid grid-cols-4 gap-2 w-full">
                      {entry.media.map((m, i) => (
                        <MediaItem key={i} media={m} className="h-[150px]" />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* external links */}
              {entry.externalLinks?.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium">Links</h4>
                  <ul className="list-disc pl-5">
                    {entry.externalLinks.map((l, i) => (
                      <li key={i}>
                        <a
                          className="underline"
                          href={l}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {l}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* tags */}
              {entry.tags?.length > 0 && (
                <div className="mt-4 flex gap-2 flex-wrap">
                  {entry.tags.map((t, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 border rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}

              {/* View JSON */}
              {codeModal.open && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
                  <div className="bg-zinc-950 rounded-2xl w-full max-w-3xl h-[70vh] overflow-auto p-6">
                    <h3 className="text-lg font-semibold mb-4">Code Preview</h3>
                    <pre className="p-4 rounded overflow-auto whitespace-pre-wrap">
                      {codeModal.code}
                    </pre>
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={() => setCodeModal({ open: false, code: "" })}
                        className="px-4 py-2 border rounded-2xl"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Open Delete Model */}
              {deleteModal.open && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                  <div className="bg-zinc-950 rounded-2xl p-6 max-w-sm w-full">
                    <h3 className="text-lg font-semibold mb-4">
                      Confirm Delete
                    </h3>
                    <p className="mb-4">
                      Are you sure you want to delete this entry?
                    </p>

                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() =>
                          setDeleteModal({ open: false, id: null })
                        }
                        className="px-4 py-2 border rounded-2xl hover:cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-500 hover:bg-red-800 hover:cursor-pointer text-white rounded-2xl"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </article>
          ))}
        </section>
      </div>
    </main>
  );
};

export default Delta;

function extractYouTubeId(url) {
  if (!url) return "";
  // common patterns
  const reg = /(?:v=|\/)([0-9A-Za-z_-]{11})(?:\?|&|$)/;
  const m = url.match(reg);
  if (m && m[1]) return m[1];
  // fallback: try to parse last path segment
  try {
    const u = new URL(url);
    const parts = u.pathname.split("/");
    return parts[parts.length - 1];
  } catch (e) {
    return "";
  }
}
