export interface Book {
  id: string;
  title:string;
  author?: string;
  comment?: string;
  completed: boolean;
  startedAt?: string;
  createdAt: string;
  // coverId?: number;
  coverUrl?: string;
}