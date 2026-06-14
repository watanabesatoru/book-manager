"use client";

import { useBooks } from "@/context/BooksContext";
import BookItem from "./BookItem";

export default function BookList() {
  const { books } = useBooks();

  if (books.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-8 text-center">
        <div className="text-3xl">📖</div>
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">No books yet</p>
        <p className="text-xs text-zinc-400 dark:text-zinc-600">Add your first book above to get started</p>
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
