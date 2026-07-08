"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import AddBookForm from "@/components/AddBookForm";
import BookList from "@/components/BookList";
import { useBooks } from "@/context/BooksContext";
import { cn } from "@/lib/utils";

type Filter = "all" | "active" | "completed";

const FILTERS: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
];

export default function Home() {
  const router = useRouter();
  const { books } = useBooks();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const handleLogout = async () => {
  await supabase.auth.signOut();
  router.push("/login");
};

  const filtered = useMemo(() => {
  const q = search.toLowerCase();

  return books
    .filter((b) => {
      if (filter === "active") return !b.completed;
      if (filter === "completed") return b.completed;
      return true;
    })
    .filter((b) => b.title.toLowerCase().includes(q));
}, [books, search, filter]);

useEffect(() => {
  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
    }
  };

  checkUser();
}, [router]);

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
          <div className="mt-4">
  <button
    onClick={handleLogout}
    className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
  >
    Logout
  </button>
</div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="p-6">
            <AddBookForm />
          </div>

          <div className="border-t border-zinc-100 px-6 pb-6 pt-4 dark:border-zinc-800">
            {/* Search */}
            <div className="relative mb-3">
              <svg
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search books..."
                className="w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2 pl-9 pr-4 text-sm text-zinc-900 outline-none transition-all placeholder:text-zinc-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-indigo-500 dark:focus:ring-indigo-900/40"
              />
            </div>

            {/* Filter tabs */}
            <div className="mb-4 flex gap-1">
              {FILTERS.map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => setFilter(value)}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                    filter === value
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>

            <BookList books={filtered} totalCount={books.length} />
          </div>
        </div>
      </div>
    </main>
  );
}
