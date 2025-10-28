"use client";

import { Search, X, Film, Tv, Gamepad2, LucideProps } from "lucide-react";
import { useFilterStore, SearchType } from "@/lib/store/filterStore";
import { ForwardRefExoticComponent, RefAttributes } from "react";

const searchTypeOptions: {
  value: SearchType;
  label: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}[] = [
  { value: "films", label: "영화", icon: Film },
  { value: "tvShows", label: "TV쇼", icon: Tv },
  { value: "videoGames", label: "게임", icon: Gamepad2 },
];

export default function SearchBar() {
  const { searchType, searchQuery, setSearchType, setSearchQuery } =
    useFilterStore();

  const currentOption = searchTypeOptions.find(
    (opt) => opt.value === searchType
  )!;
  const Icon = currentOption.icon;

  const placeholders = {
    name: "캐릭터 이름 검색... (예: Mickey)",
    films: "영화 제목 검색... (예: Aladdin)",
    tvShows: "TV쇼 제목 검색... (예: DuckTales)",
    videoGames: "게임 제목 검색... (예: Kingdom Hearts)",
  };

  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="flex gap-2">
        {/* 검색 타입 드롭다운 */}
        <div className="relative">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value as SearchType)}
            className="h-full px-4 py-4 rounded-l-full border-2 border-r-0 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none transition-colors appearance-none pr-10 font-medium cursor-pointer"
          >
            {searchTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <Icon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>

        {/* 검색 입력 */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={placeholders[searchType]}
            className="w-full pl-12 pr-12 py-4 rounded-r-full border-2 border-l-0 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none transition-colors text-lg"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* 검색 힌트 */}
      {searchQuery.length > 0 && searchQuery.length < 2 && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
          최소 2글자 이상 입력해주세요
        </p>
      )}
    </div>
  );
}
