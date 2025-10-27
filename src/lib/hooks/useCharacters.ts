import { useQuery } from "@tanstack/react-query";
import { disneyApi } from "@/lib/api/disney";
import { FilterOptions } from "@/types/disney";

export const useCharacters = (filters: FilterOptions = {}) => {
  return useQuery({
    queryKey: ["characters", filters],
    queryFn: () => disneyApi.getCharacters(filters),
    staleTime: 5 * 60 * 1000, // 5분
  });
};

export const useCharacter = (id: number) => {
  return useQuery({
    queryKey: ["character", id],
    queryFn: () => disneyApi.getCharacter(id),
    staleTime: 10 * 60 * 1000, // 10분
  });
};

export const useSearchCharacters = (query: string) => {
  return useQuery({
    queryKey: ["search", query],
    queryFn: () => disneyApi.searchCharacters(query),
    enabled: query.length > 0,
    staleTime: 2 * 60 * 1000, // 2분
  });
};
