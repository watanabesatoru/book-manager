"use client";

import Link from "next/link";
import { useBooks } from "@/context/BooksContext";
import { cn } from "@/lib/utils";
import type { Book } from "@/types";

export default function BookItem({ book }: { book: Book }) {
  const { toggleComplete, deleteBook } = useBooks();

  return (
    <li className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
      <input
        type="checkbox"
        checked={book.completed}
        onChange={() => toggleComplete(book.id)}
        className="h-4 w-4 cursor-pointer accent-zinc-900 dark:accent-zinc-100"
      />
      <span
        className={cn(
          "flex-1 text-sm",
          book.completed && "text-zinc-400 line-through dark:text-zinc-600"
        )}
      >
        {book.title}
      </span>
      <Link
        href={`/books/${book.id}`}
        className="text-xs text-zinc-500 underline-offset-2 hover:underline dark:text-zinc-400"
      >
        Details
      </Link>
      <button
        onClick={() => deleteBook(book.id)}
        aria-label="Delete book"
        className="ml-1 text-zinc-400 transition-colors hover:text-red-500 dark:text-zinc-600 dark:hover:text-red-400"
      >
        ✕
      </button>
    </li>
  );
}
