import { create } from "zustand";

interface FilterState {
  selectedFilm: string;
  selectedTvShow: string;
  selectedGame: string;
  searchQuery: string;
  currentPage: number;
  setSelectedFilm: (film: string) => void;
  setSelectedTvShow: (show: string) => void;
  setSelectedGame: (game: string) => void;
  setSearchQuery: (query: string) => void;
  setCurrentPage: (page: number) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  selectedFilm: "",
  selectedTvShow: "",
  selectedGame: "",
  searchQuery: "",
  currentPage: 1,
  setSelectedFilm: (film) => set({ selectedFilm: film, currentPage: 1 }),
  setSelectedTvShow: (show) => set({ selectedTvShow: show, currentPage: 1 }),
  setSelectedGame: (game) => set({ selectedGame: game, currentPage: 1 }),
  setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),
  setCurrentPage: (page) => set({ currentPage: page }),
  resetFilters: () =>
    set({
      selectedFilm: "",
      selectedTvShow: "",
      selectedGame: "",
      searchQuery: "",
      currentPage: 1,
    }),
}));
