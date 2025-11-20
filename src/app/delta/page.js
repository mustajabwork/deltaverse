"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Pen } from "lucide-react";
import "@/styles/createButton.css";

// --- Utility function ---
function extractYouTubeId(url) {
  if (!url) return "";
  const reg = /(?:v=|\/)([0-9A-Za-z_-]{11})(?:\?|&|$)/;
  const m = url.match(reg);
  if (m && m[1]) return m[1];
  try {
    const u = new URL(url);
    const parts = u.pathname.split("/");
    return parts[parts.length - 1];
  } catch (e) {
    return "";
  }
}

// --- Media Item Component ---
const MediaItem = ({ media, className = "" }) => {
  if (!media) return null;
  switch (media.type) {
    case "image":
      return (
        <img
          src={media.url}
          alt={media.title || "image"}
          className={`w-full h-full object-cover rounded ${className}`}
        />
      );
    case "youtube":
      return (
        <div className={`aspect-video ${className}`}>
          <iframe
            src={`https://www.youtube.com/embed/${extractYouTubeId(media.url)}`}
            title={media.title || "youtube"}
            allowFullScreen
            className="w-full h-full rounded"
          />
        </div>
      );
    case "video":
      return (
        <video
          controls
          className={`w-full h-full rounded object-cover ${className}`}
        >
          <source src={media.url} />
          Your browser does not support the video tag.
        </video>
      );
    case "document":
      return (
        <a
          href={media.url}
          target="_blank"
          rel="noreferrer"
          className={`underline block p-2 ${className}`}
        >
          Open document
        </a>
      );
    default:
      return null;
  }
};

// --- Media Grid ---
const EntryMediaGrid = ({ media }) => {
  if (!media || media.length === 0) return null;

  if (media.length === 1)
    return <MediaItem media={media[0]} className="w-full max-h-[500px]" />;
  if (media.length === 2)
    return (
      <div className="grid grid-cols-2 gap-2">
        {media.map((m, i) => (
          <MediaItem key={i} media={m} className="h-[300px]" />
        ))}
      </div>
    );
  if (media.length === 3)
    return (
      <div className="grid grid-cols-2 gap-2">
        <div className="grid grid-rows-2 gap-2">
          <MediaItem media={media[0]} className="h-[145px]" />
          <MediaItem media={media[1]} className="h-[145px]" />
        </div>
        <MediaItem media={media[2]} className="row-span-2 h-[300px]" />
      </div>
    );
  if (media.length === 4)
    return (
      <div className="grid grid-cols-3 gap-2">
        <MediaItem media={media[2]} className="row-span-2 h-[300px]" />
        <div className="grid grid-rows-2 gap-2">
          <MediaItem media={media[0]} className="h-[145px]" />
          <MediaItem media={media[1]} className="h-[145px]" />
        </div>
        <MediaItem media={media[3]} className="row-span-2 h-[300px]" />
      </div>
    );

  return (
    <div className="grid grid-cols-4 gap-2 w-full">
      {media.map((m, i) => (
        <MediaItem key={i} media={m} className="h-[150px]" />
      ))}
    </div>
  );
};

// --- Modals ---
const JSONModal = ({ code, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
    <div className="bg-zinc-950 rounded-2xl w-full max-w-3xl h-[70vh] overflow-auto p-6">
      <h3 className="text-lg font-semibold mb-4">Code Preview</h3>
      <pre className="p-4 rounded overflow-auto whitespace-pre-wrap">
        {code}
      </pre>
      <div className="flex justify-end mt-4">
        <button onClick={onClose} className="px-4 py-2 border rounded-2xl">
          Close
        </button>
      </div>
    </div>
  </div>
);

const DeleteModal = ({ onCancel, onDelete }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50 text-white z-50">
    <div className="bg-zinc-950 rounded-2xl p-6 max-w-sm w-full">
      <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
      <p className="mb-4">Are you sure you want to delete this entry?</p>
      <div className="flex justify-end gap-2">
        <button onClick={onCancel} className="px-4 py-2 border rounded-2xl">
          Cancel
        </button>
        <button
          onClick={onDelete}
          className="px-4 py-2 bg-red-500 hover:bg-red-800 text-white rounded-2xl"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

// --- Entry Card ---
const EntryCard = ({ entry, onViewJSON, onDelete }) => (
  <article id={`entry-${entry._id}`} className="py-6 rounded-2xl">
    <div className="flex justify-between items-start">
      <div>
        <time className="text-sm text-zinc-500 font-inter">
          {new Date(entry.date).toLocaleDateString()} —
          {new Date(entry.createdAt).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
          })}
        </time>

        <h3 className="text-2xl font-semibold">{entry.title || "—"}</h3>
      </div>
      <div className="text-right">
        <div className="text-sm text-zinc-600">
          {entry.categories?.join(", ")}
        </div>
        <div className="mt-2 space-x-2">
          <button
            onClick={() => onViewJSON(entry)}
            className="text-xs px-2 py-1 border rounded"
          >
            View JSON
          </button>
          <button
            onClick={() => onDelete(entry._id)}
            className="text-xs px-2 py-1 border rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

    <div className="prose max-w-none mt-4">
      {entry.content.split("\n").map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>

    {entry.media?.length > 0 && <EntryMediaGrid media={entry.media} />}

    {entry.externalLinks?.length > 0 && (
      <div className="mt-4">
        <h4 className="font-medium">Links</h4>
        <ul className="list-disc pl-5">
          {entry.externalLinks.map((l, i) => (
            <li key={i}>
              <a
                href={l}
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                {l}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )}

    {entry.tags?.length > 0 && (
      <div className="mt-4 flex gap-2 flex-wrap">
        {entry.tags.map((t, i) => (
          <span key={i} className="text-xs px-2 py-1 border rounded-full">
            {t}
          </span>
        ))}
      </div>
    )}
  </article>
);

// --- Header ---
const Header = () => (
  <header className="mb-8">
    <div className="flex gap-2 items-center">
      <h1 className="text-4xl font-extrabold">My Diary</h1>
      <Link href="/delta/create" className="Btn">
        <span className="text-xs">Create</span>
        <Pen className="svg" />
      </Link>
    </div>
    <p className="mt-2 text-sm text-zinc-500">
      This is the place where I store my absolutely raw reality in form of text,
      images, videos and links.
    </p>
  </header>
);

// --- Main Component ---
const Delta = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null });
  const [codeModal, setCodeModal] = useState({ open: false, code: "" });
  const containerRef = useRef(null);

  const fetchEntries = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/entries");
      const data = await res.json();
      setEntries(data.sort((a, b) => new Date(a.date) - new Date(b.date)));
    } catch (err) {
      console.error("🔴Error fetching entries:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteModal.id) return;
    try {
      const res = await fetch("/api/entries/" + deleteModal.id, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(await res.text());
      fetchEntries();
    } catch (err) {
      console.error(err);
      alert("Failed to delete entry");
    } finally {
      setDeleteModal({ open: false, id: null });
    }
  };

  const confirmDelete = (id) => setDeleteModal({ open: true, id });

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <main className="min-h-screen p-6 bg-pink-200" ref={containerRef}>
      <div className="max-w-4xl mx-auto">
        <Header />

        <section className="space-y-6">
          {loading && <p className="text-zinc-500">⚫Loading...</p>}
          {!loading && entries.length === 0 && (
            <p className="text-zinc-500">
              No entries yet — write your first one above.
            </p>
          )}

          {entries.map((entry) => (
            <EntryCard
              key={entry._id}
              entry={entry}
              onViewJSON={(e) =>
                setCodeModal({ open: true, code: JSON.stringify(e, null, 2) })
              }
              onDelete={confirmDelete}
            />
          ))}
        </section>

        {codeModal.open && (
          <JSONModal
            code={codeModal.code}
            onClose={() => setCodeModal({ open: false, code: "" })}
          />
        )}
        {deleteModal.open && (
          <DeleteModal
            onCancel={() => setDeleteModal({ open: false, id: null })}
            onDelete={handleDelete}
          />
        )}
      </div>
    </main>
  );
};

export default Delta;
