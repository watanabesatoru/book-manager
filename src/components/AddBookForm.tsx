"use client";

import { useState, type FormEvent } from "react";
import { useBooks } from "@/context/BooksContext";

export default function AddBookForm() {
  const { addBook } = useBooks();
  const [title, setTitle] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    addBook(trimmed);
    setTitle("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a book title..."
        className="flex-1 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm text-zinc-900 outline-none transition-all placeholder:text-zinc-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-indigo-500 dark:focus:ring-indigo-900/40"
      />
      <button
        type="submit"
        disabled={!title.trim()}
        className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-indigo-700 hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-indigo-500 dark:hover:bg-indigo-600"
      >
        Add
      </button>
    </form>
  );
}
