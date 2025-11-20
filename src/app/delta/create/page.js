"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ArrowBigLeftDash } from "lucide-react";

const Create = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    title: "",
    content: "",
    categories: "",
    tags: "",
    mediaUrl: "",
    mediaType: "image",
    externalLinks: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
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
              title: form.title || "",
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

      const savedEntry = await res.json();
      const savedEntryId = savedEntry._id;

      // Reset form
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

      router.push("/delta"); // redirect

      setTimeout(() => {
        const newEntryElement = document.getElementById(
          `entry-${savedEntryId}`
        );
        if (newEntryElement) {
          newEntryElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 500);
    } catch (err) {
      console.error(err);
      alert("Failed to save entry: " + err.message);
    }
  };

  const resetForm = () =>
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

  return (
    <div className="bg-pink-200 h-screen">
      <section className="mb-8 rounded-2xl max-w-4xl mx-auto p-6">
        <div className="flex flex-row gap-2 items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-pink-800">
            Today Stuff...
          </h2>
          <Link
            href={"/delta"}
            className="text-xs flex gap-2 items-center transition-all hover:text-pink-800"
          >
            <ArrowBigLeftDash />
            <span>Go Back</span>
          </Link>
        </div>
        <form onSubmit={submit} className="space-y-3">
          <div className="flex gap-2">
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="flex-1 p-2 border rounded"
            />
            <input
              type="text"
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
              type="text"
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
              className="px-4 py-2 bg-pink-600 hover:bg-pink-800 transition-all text-white rounded-2xl"
            >
              Save entry
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 border rounded-2xl"
            >
              Reset
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Create;
