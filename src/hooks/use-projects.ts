import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";

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

export const PROJECTS_QUERY_KEY = ["projects"];

export function useProjects() {
  return useQuery<Project[]>({
    queryKey: PROJECTS_QUERY_KEY,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select(
          "id, title, category, description, tech, image_url, live_url, sort_order, is_featured, created_at",
        )
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      return (
        data?.map((row) => ({
          id: row.id as string,
          title: row.title as string,
          category: row.category as string,
          description: row.description as string,
          tech: (row.tech as string[]) ?? [],
          image: (row.image_url as string) ?? "",
          link: (row.live_url as string | null) ?? null,
          sortOrder: (row.sort_order as number) ?? 0,
          isFeatured: (row.is_featured as boolean) ?? true,
          createdAt: row.created_at as string,
        })) ?? []
      );
    },
  });
}

