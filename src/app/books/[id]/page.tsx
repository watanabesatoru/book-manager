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
  const { books, updateStartedAt } = useBooks();
  const book = books.find((b) => b.id === id);

  if (!book) {
    return (
      <main className="mx-auto w-full max-w-xl px-4 py-12">
        <Link
          href="/"
          className="mb-6 inline-block text-sm text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
        >
          ← Back
        </Link>
        <p className="text-sm text-zinc-500">Book not found.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-xl px-4 py-12">
      <Link
        href="/"
        className="mb-6 inline-block text-sm text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
      >
        ← Back
      </Link>
      <h1 className="mb-8 text-2xl font-semibold tracking-tight">
        {book.title}
      </h1>
      <div className="flex flex-col gap-2">
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
          className="w-48 rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-400"
        />
      </div>
    </main>
  );
}
