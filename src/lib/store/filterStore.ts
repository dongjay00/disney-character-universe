import { create } from "zustand";

export type SearchType = "films" | "tvShows" | "videoGames";

interface FilterState {
  searchType: SearchType;
  searchQuery: string;
  currentPage: number;
  setSearchType: (type: SearchType) => void;
  setSearchQuery: (query: string) => void;
  setCurrentPage: (page: number) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  searchType: "films",
  searchQuery: "",
  currentPage: 1,
  setSearchType: (type) =>
    set({ searchType: type, currentPage: 1, searchQuery: "" }),
  setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),
  setCurrentPage: (page) => set({ currentPage: page }),
  resetFilters: () =>
    set({
      searchType: "films",
      searchQuery: "",
      currentPage: 1,
    }),
}));
