"use client";

import BookItem from "./BookItem";
import type { Book } from "@/types";

interface Props {
  books: Book[];
  totalCount: number;
}

export default function BookList({ books, totalCount }: Props) {
  if (totalCount === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-8 text-center">
        <div className="text-3xl">📖</div>
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">No books yet</p>
        <p className="text-xs text-zinc-400 dark:text-zinc-600">
          Add your first book above to get started
        </p>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-8 text-center">
        <div className="text-3xl">🔍</div>
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">No matches</p>
        <p className="text-xs text-zinc-400 dark:text-zinc-600">
          Try a different search or filter
        </p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {books.map((book) => (
        <BookItem key={book.id} book={book} />
      ))}
    </ul>
  );
}
