"use client";

import Link from "next/link";
import { useBooks } from "@/context/BooksContext";
import { cn } from "@/lib/utils";
import type { Book } from "@/types";

export default function BookItem({ book }: { book: Book }) {
  const { toggleComplete, deleteBook } = useBooks();

  return (
    <li className="group flex items-center gap-3 rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-3.5 transition-all hover:border-zinc-200 hover:bg-white hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-800/50 dark:hover:border-zinc-700 dark:hover:bg-zinc-800">
      <input
        type="checkbox"
        checked={book.completed}
        onChange={() => toggleComplete(book.id)}
        className="h-4 w-4 cursor-pointer rounded accent-indigo-600 dark:accent-indigo-400"
      />
      <span
        className={cn(
          "flex-1 text-sm font-medium text-zinc-800 transition-colors dark:text-zinc-200",
          book.completed && "text-zinc-400 line-through dark:text-zinc-600"
        )}
      >
        {book.title}
      </span>
      <Link
        href={`/books/${book.id}`}
        className="rounded-md px-2 py-1 text-xs font-medium text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-500 dark:hover:bg-zinc-700 dark:hover:text-zinc-200"
      >
        Details →
      </Link>
      <button
        onClick={() => deleteBook(book.id)}
        aria-label="Delete book"
        className="rounded-md p-1 text-zinc-300 transition-all hover:bg-red-50 hover:text-red-500 dark:text-zinc-600 dark:hover:bg-red-900/20 dark:hover:text-red-400"
      >
        ✕
      </button>
    </li>
  );
}
