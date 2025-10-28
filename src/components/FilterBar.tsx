"use client";

import { useFilterStore } from "@/lib/store/filterStore";
import { Film, Tv, Gamepad2, X } from "lucide-react";

const popularFilms = [
  "The Little Mermaid",
  "Aladdin",
  "The Lion King",
  "Beauty and the Beast",
  "Frozen",
  "Moana",
];

const popularTvShows = [
  "DuckTales",
  "Mickey Mouse Clubhouse",
  "The Lion Guard",
  "Sofia the First",
];

const popularGames = ["Kingdom Hearts", "Disney Infinity", "Epic Mickey"];

export default function FilterBar() {
  const {
    selectedFilm,
    selectedTvShow,
    selectedGame,
    setSelectedFilm,
    setSelectedTvShow,
    setSelectedGame,
    resetFilters,
  } = useFilterStore();

  const hasActiveFilters = selectedFilm || selectedTvShow || selectedGame;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white">
          필터
        </h3>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            <X className="w-4 h-4" />
            초기화
          </button>
        )}
      </div>

      {/* 영화 필터 */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          <Film className="w-4 h-4" />
          <span>영화</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {popularFilms.map((film) => (
            <button
              key={film}
              onClick={() => setSelectedFilm(selectedFilm === film ? "" : film)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedFilm === film
                  ? "bg-blue-600 text-white shadow-lg scale-105"
                  : "bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800"
              }`}
            >
              {film}
            </button>
          ))}
        </div>
      </div>

      {/* TV쇼 필터 */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          <Tv className="w-4 h-4" />
          <span>TV쇼</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {popularTvShows.map((show) => (
            <button
              key={show}
              onClick={() =>
                setSelectedTvShow(selectedTvShow === show ? "" : show)
              }
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedTvShow === show
                  ? "bg-purple-600 text-white shadow-lg scale-105"
                  : "bg-purple-50 dark:bg-purple-900 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-800"
              }`}
            >
              {show}
            </button>
          ))}
        </div>
      </div>

      {/* 게임 필터 */}
      <div>
        <div className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          <Gamepad2 className="w-4 h-4" />
          <span>비디오 게임</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {popularGames.map((game) => (
            <button
              key={game}
              onClick={() => setSelectedGame(selectedGame === game ? "" : game)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedGame === game
                  ? "bg-pink-600 text-white shadow-lg scale-105"
                  : "bg-pink-50 dark:bg-pink-900 text-pink-700 dark:text-pink-300 hover:bg-pink-100 dark:hover:bg-pink-800"
              }`}
            >
              {game}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
