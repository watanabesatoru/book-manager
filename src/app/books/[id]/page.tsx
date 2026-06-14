"use client";

import Link from "next/link";
import { use } from "react";
import { useBooks } from "@/context/BooksContext";

export default function BookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { books, updateStartedAt, updateAuthor } = useBooks();
  const book = books.find((b) => b.id === id);

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
          </div>

          <div className="flex flex-col divide-y divide-zinc-100 dark:divide-zinc-800">
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
          </div>
        </div>
      </div>
    </main>
  );
}
