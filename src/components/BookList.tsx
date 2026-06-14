"use client";

import { useBooks } from "@/context/BooksContext";
import BookItem from "./BookItem";

export default function BookList() {
  const { books } = useBooks();

  if (books.length === 0) {
    return (
      <p className="text-center text-sm text-zinc-400 dark:text-zinc-600">
        No books yet. Add one above.
      </p>
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
