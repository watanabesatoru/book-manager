"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import type { Book } from "@/types";

interface BooksContextValue {
  books: Book[];
  addBook: (title: string) => void;
  toggleComplete: (id: string) => void;
  deleteBook: (id: string) => void;
  updateStartedAt: (id: string, date: string) => void;
  updateAuthor: (id: string, author: string) => void;
  updateComment: (id: string, comment: string) => void;
  updateRating: (id: string, rating: number) => void; // ←追加
  updateCoverId: (id: string, coverId: number) => Promise<void>;

  updateCoverUrl: (id: string, coverUrl: string) => Promise<void>;
}

interface BookRow {
  id: number;
  title: string;
  author: string | null;
  comment: string | null;

  completed: boolean;

  rating: number;

  started_at: string | null;
  created_at: string;
  cover_id: number | null;
  cover_url: string | null;
}

function fromRow(row: BookRow): Book {
  return {
    id: String(row.id),
    title: row.title,
    author: row.author ?? undefined,
    comment: row.comment ?? undefined,
    completed: row.completed ?? false,
    rating: row.rating,
    startedAt: row.started_at ?? undefined,
    createdAt: row.created_at,
    // coverId: row.cover_id ?? undefined,
    coverUrl: row.cover_url ?? undefined,
  };
}

const BooksContext = createContext<BooksContextValue | null>(null);

export function BooksProvider({ children }: { children: ReactNode }) {
  const [books, setBooks] = useState<Book[]>([]);

useEffect(() => {
  const loadBooks = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setBooks([]);
      return;
    }

    const { data, error } = await supabase
      .from("books")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true });

    if (!error && data) {
      setBooks((data as BookRow[]).map(fromRow));
    }
  };

  loadBooks();

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(() => {
    loadBooks();
  });

  return () => {
    subscription.unsubscribe();
  };
}, []);

 async function addBook(title: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  supabase
    .from("books")
    .insert({
      title,
      completed: false,
      user_id: user.id,
    })
    .select()
    .single()
    .then(({ data, error }) => {
      if (error) {
        console.error("Failed to add book", error);
        return;
      }
      setBooks((prev) => [...prev, fromRow(data as BookRow)]);
    });
}

  function toggleComplete(id: string) {
    const next = !books.find((b) => b.id === id)?.completed;
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, completed: next } : b))
    );
    supabase
      .from("books")
      .update({ completed: next })
      .eq("id", id)
      .then(({ error }) => {
        if (error) console.error("Failed to toggle book", error);
      });
  }

  function deleteBook(id: string) {
    setBooks((prev) => prev.filter((b) => b.id !== id));
    supabase
      .from("books")
      .delete()
      .eq("id", id)
      .then(({ error }) => {
        if (error) console.error("Failed to delete book", error);
      });
  }

  function updateStartedAt(id: string, date: string) {
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, startedAt: date } : b))
    );
    supabase
      .from("books")
      .update({ started_at: date || null })
      .eq("id", id)
      .then(({ error }) => {
        if (error) console.error("Failed to update started_at", error);
      });
  }

  function updateAuthor(id: string, author: string) {
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, author } : b))
    );
    supabase
      .from("books")
      .update({ author: author || null })
      .eq("id", id)
      .then(({ error }) => {
        if (error) console.error("Failed to update author", error);
      });
  }

  function updateComment(id: string, comment: string) {
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, comment } : b))
    );
    supabase
      .from("books")
      .update({ comment: comment || null })
      .eq("id", id)
      .then(({ error }) => {
        if (error) console.error("Failed to update comment", error);
      });
  }

  function updateRating(id: string, rating: number) {
  setBooks((prev) =>
    prev.map((b) =>
      b.id === id ? { ...b, rating } : b
    )
  );

  supabase
    .from("books")
    .update({ rating })
    .eq("id", id)
    .then(({ error }) => {
      if (error) console.error("Failed to update rating", error);
    });
}

   async function updateCoverId(id: string, coverId: number){
  setBooks((prev) =>
    prev.map((book) =>
      book.id === id ? { ...book, coverId } : book
    )
  );

  await supabase
    .from("books")
    .update({ cover_id: coverId })
    .eq("id", id);
}

async function updateCoverUrl(id: string, coverUrl: string) {
  setBooks((prev) =>
    prev.map((book) =>
      book.id === id ? { ...book, coverUrl } : book
    )
  );

  await supabase
    .from("books")
    .update({ cover_url: coverUrl })
    .eq("id", id);
}



  return (
    <BooksContext.Provider
      value={{
  books,
  addBook,
  toggleComplete,
  deleteBook,
  updateStartedAt,
  updateAuthor,
  updateComment,
  updateRating,
  updateCoverId,
  updateCoverUrl,
      }}
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
