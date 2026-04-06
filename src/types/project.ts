export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  image: string;
  link: string | null;
  sortOrder: number;
  isFeatured: boolean;
  createdAt: string;
}
