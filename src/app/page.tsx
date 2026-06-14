"use client";

import AddBookForm from "@/components/AddBookForm";
import BookList from "@/components/BookList";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 px-4 py-16 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      <div className="mx-auto w-full max-w-xl">
        <div className="mb-8">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
            📚 Reading List
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Book Manager
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Keep track of what you&apos;re reading
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="p-6">
            <AddBookForm />
          </div>
          <div className="border-t border-zinc-100 px-6 py-4 dark:border-zinc-800">
            <BookList />
          </div>
        </div>
      </div>
    </main>
  );
}
