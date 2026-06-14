export interface Book {
  id: string;
  title: string;
  author?: string;
  completed: boolean;
  startedAt?: string;
  createdAt: string;
}