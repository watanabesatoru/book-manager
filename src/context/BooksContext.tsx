"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Book } from "@/types";

interface BooksContextValue {
  books: Book[];
  addBook: (title: string) => void;
  toggleComplete: (id: string) => void;
  deleteBook: (id: string) => void;
  updateStartedAt: (id: string, date: string) => void;
  updateAuthor: (id: string, author: string) => void;
  updateComment: (id: string, comment: string) => void;
}

const BooksContext = createContext<BooksContextValue | null>(null);

export function BooksProvider({ children }: { children: ReactNode }) {
  const [books, setBooks] = useState<Book[]>([]);

  function addBook(title: string) {
    setBooks((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title,
        completed: false,
        createdAt: new Date().toISOString(),
      },
    ]);
  }

  function toggleComplete(id: string) {
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, completed: !b.completed } : b))
    );
  }

  function deleteBook(id: string) {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  }

  function updateStartedAt(id: string, date: string) {
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, startedAt: date } : b))
    );
  }

  function updateAuthor(id: string, author: string) {
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, author } : b))
    );
  }

  function updateComment(id: string, comment: string) {
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, comment } : b))
    );
  }

  return (
    <BooksContext.Provider
      value={{ books, addBook, toggleComplete, deleteBook, updateStartedAt, updateAuthor, updateComment }}
    >
      {children}
    </BooksContext.Provider>
  );
}

export function useBooks() {
  const ctx = useContext(BooksContext);
  if (!ctx) throw new Error("useBooks must be used inside BooksProvider");
  return ctx;
}
