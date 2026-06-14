"use client";

import AddBookForm from "@/components/AddBookForm";
import BookList from "@/components/BookList";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-xl px-4 py-12">
      <h1 className="mb-8 text-2xl font-semibold tracking-tight">
        Book Manager
      </h1>
      <div className="flex flex-col gap-6">
        <AddBookForm />
        <BookList />
      </div>
    </main>
  );
}
