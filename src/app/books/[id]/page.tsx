"use client";

import Link from "next/link";
import { use, useState } from "react";
import { useBooks } from "@/context/BooksContext";

export default function BookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
  books,
  updateStartedAt,
  updateAuthor,
  updateComment,
  updateRating,
  updateCoverId,
  updateCoverUrl,
} = useBooks();

const book = books.find((b) => b.id === id);

async function fetchBookInfo() {
  if (!book) {
    console.error("Book not found");
    return;
  }
  console.log("fetchBookInfo started");
  console.log("API KEY =", process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY);

  const url =
    `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(book.title)}&key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY}`;

  console.log("URL =", url);

  setLoading(true);
  setError("");

  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(book.title)}&key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY}`
    );

    const data = await response.json();

    console.log(data.items[0]);

    if (data.items.length > 0) {

     const matchedBook = data.items.find(
    (item: { volumeInfo: { title?: string } }) =>
      item.volumeInfo.title?.trim().toLowerCase() ===
      book.title.trim().toLowerCase()
  );

  const firstBook = matchedBook ?? data.items[0];

  if (firstBook.volumeInfo.authors) {
    updateAuthor(book.id, firstBook.volumeInfo.authors[0]);
  }

  const thumbnail =
    firstBook.volumeInfo.imageLinks?.thumbnail;

  if (thumbnail) {
    await updateCoverUrl(book.id, thumbnail);
  }
}
  } catch (err) {
    setError("本の情報を取得できませんでした。");
  } finally {
    setLoading(false);
  }
}



  

  if (!book) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 px-4 py-16 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
        <div className="mx-auto w-full max-w-xl">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
          >
            ← Back
          </Link>
          <p className="text-sm text-zinc-500">Book not found.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 px-4 py-16 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      <div className="mx-auto w-full max-w-xl">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
        >
          ← Back
        </Link>

        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="border-b border-zinc-100 bg-zinc-50 px-8 py-6 dark:border-zinc-800 dark:bg-zinc-800/50">
            <div className="mb-2 flex items-center justify-between">
              <div className="text-xs font-medium uppercase tracking-wider text-indigo-500 dark:text-indigo-400">
                Book Details
              </div>
              <span
                className={
                  book.completed
                    ? "inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400"
                    : "inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/40 dark:text-amber-400"
                }
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${book.completed ? "bg-emerald-500" : "bg-amber-500"}`}
                />
                {book.completed ? "Completed" : "Active"}
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              {book.title}
            </h1>

            {book.coverUrl && (
  <>
    <img
      src={book.coverUrl}
      alt={book.title}
      className="mt-4 h-64 rounded-lg shadow"
    />

    <button
      onClick={() => updateCoverUrl(book.id, "")}
      className="mt-3 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
    >
      表紙を削除
    </button>
  </>
)}

            <p className="mt-2 text-lg text-amber-500">
               {book.rating === 0 ? "未評価" : "★".repeat(book.rating)}
            </p>
          </div>

          <div className="flex flex-col divide-y divide-zinc-100 dark:divide-zinc-800">

            <div className="flex flex-col gap-2 px-8 py-6 border-b border-zinc-100 dark:border-zinc-800">
  
  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
    Open Library
  </label>

  <button
    onClick={fetchBookInfo}
    disabled={loading}
    className="w-fit rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-50"
  >
    {loading ? "検索中..." : "Open Libraryから取得"}
  </button>

  {error && (
    <p className="text-sm text-red-500">
      {error}
    </p>
  )}
</div>
            <div className="flex flex-col gap-2 px-8 py-6">
              <label
                htmlFor="author"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Author
              </label>
              <input
                id="author"
                type="text"
                value={book.author ?? ""}
                onChange={(e) => updateAuthor(book.id, e.target.value)}
                placeholder="Author name..."
                className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none transition-all placeholder:text-zinc-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-indigo-500 dark:focus:ring-indigo-900/40"
              />
            </div>

            <div className="flex flex-col gap-2 px-8 py-6">
              <label
                htmlFor="startedAt"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Date started reading
              </label>
              <input
                id="startedAt"
                type="date"
                value={book.startedAt ?? ""}
                onChange={(e) => updateStartedAt(book.id, e.target.value)}
                className="w-48 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none transition-all focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:border-indigo-500 dark:focus:ring-indigo-900/40"
              />
            </div>
            <div className="flex flex-col gap-2 px-8 py-6">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="comment"
                  className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                
                <div className="flex flex-col gap-2 px-8 py-6">
  <label
    htmlFor="rating"
    className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
  >
    Rating
  </label>

  <select
    id="rating"
    value={book.rating}
    onChange={(e) => updateRating(book.id, Number(e.target.value))}
    className="w-48 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none transition-all focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
  >
    <option value={0}>未評価</option>
    <option value={1}>★</option>
    <option value={2}>★★</option>
    <option value={3}>★★★</option>
    <option value={4}>★★★★</option>
    <option value={5}>★★★★★</option>
  </select>

  <p className="text-amber-500 text-lg">
  {book.rating === 0 ? "未評価" : "★".repeat(book.rating)}
</p>
</div>
                  My Comment
                </label>
                <span
                  className={`text-xs tabular-nums ${
                    (book.comment ?? "").trim().split(/\s+/).filter(Boolean).length > 400
                      ? "text-red-500"
                      : "text-zinc-400 dark:text-zinc-500"
                  }`}
                >
                  {(book.comment ?? "").trim().split(/\s+/).filter(Boolean).length} / 400 words
                </span>
              </div>
              <textarea
                id="comment"
                value={book.comment ?? ""}
                onChange={(e) => updateComment(book.id, e.target.value)}
                placeholder="Write your thoughts about this book..."
                rows={5}
                className="w-full resize-none rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm leading-relaxed outline-none transition-all placeholder:text-zinc-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-indigo-500 dark:focus:ring-indigo-900/40"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
