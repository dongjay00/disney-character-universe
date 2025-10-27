"use client";

import { Search, X } from "lucide-react";
import { useFilterStore } from "@/lib/store/filterStore";

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useFilterStore();

  return (
    <div className="relative max-w-xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="캐릭터 이름 검색..."
          className="w-full pl-12 pr-12 py-4 rounded-full border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors text-lg"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
