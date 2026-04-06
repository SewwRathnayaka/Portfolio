import { useQuery } from "@tanstack/react-query";
import { PROJECTS_DATA } from "@/data/projects";
import type { Project } from "@/types/project";

export type { Project };

export const PROJECTS_QUERY_KEY = ["projects"] as const;

export function useProjects() {
  return useQuery<Project[]>({
    queryKey: PROJECTS_QUERY_KEY,
    queryFn: async () => PROJECTS_DATA,
    staleTime: Infinity,
  });
}
