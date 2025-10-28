"use client";

import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import FilterBar from "@/components/FilterBar";
import CharacterGrid from "@/components/CharacterGrid";
import { useCharacters, useSearchCharacters } from "@/lib/hooks/useCharacters";
import { useFilterStore } from "@/lib/store/filterStore";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CharactersPage() {
  const {
    selectedFilm,
    selectedTvShow,
    selectedGame,
    searchQuery,
    currentPage,
    setCurrentPage,
  } = useFilterStore();

  // 검색 쿼리가 있으면 검색, 없으면 필터링된 목록
  const searchResult = useSearchCharacters(searchQuery);
  const filterResult = useCharacters({
    page: currentPage,
    pageSize: 20,
    films: selectedFilm || undefined,
    tvShows: selectedTvShow || undefined,
    videoGames: selectedGame || undefined,
  });

  const isSearchMode = searchQuery.length > 0;
  const { data, isLoading } = isSearchMode ? searchResult : filterResult;

  const totalPages = data?.totalPages || 1;
  const characters = data?.data || [];

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* 페이지 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold magic-text mb-4">
            모든 캐릭터 ✨
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            {isLoading ? "로딩 중..." : `총 ${data?.count || 0}명의 캐릭터`}
          </p>
        </div>

        {/* 검색바 */}
        <div className="mb-8">
          <SearchBar />
        </div>

        {/* 필터바 (검색 모드가 아닐 때만 표시) */}
        {!isSearchMode && <FilterBar />}

        {/* 캐릭터 그리드 */}
        <CharacterGrid characters={characters} isLoading={isLoading} />

        {/* 페이지네이션 (검색 모드가 아니고, 캐릭터가 있을 때만) */}
        {!isSearchMode && characters.length > 0 && (
          <div className="mt-12 flex items-center justify-center gap-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white text-purple-600 hover:bg-purple-50 shadow-md hover:shadow-lg"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              이전
            </button>

            <div className="flex items-center gap-2">
              {/* 페이지 번호 표시 */}
              {currentPage > 2 && (
                <>
                  <button
                    onClick={() => setCurrentPage(1)}
                    className="w-10 h-10 rounded-full bg-white hover:bg-purple-50 transition-colors"
                  >
                    1
                  </button>
                  {currentPage > 3 && (
                    <span className="text-gray-400">...</span>
                  )}
                </>
              )}

              {currentPage > 1 && (
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="w-10 h-10 rounded-full bg-white hover:bg-purple-50 transition-colors"
                >
                  {currentPage - 1}
                </button>
              )}

              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center justify-center font-bold">
                {currentPage}
              </div>

              {currentPage < totalPages && (
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="w-10 h-10 rounded-full bg-white hover:bg-purple-50 transition-colors"
                >
                  {currentPage + 1}
                </button>
              )}

              {currentPage < totalPages - 1 && (
                <>
                  {currentPage < totalPages - 2 && (
                    <span className="text-gray-400">...</span>
                  )}
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className="w-10 h-10 rounded-full bg-white hover:bg-purple-50 transition-colors"
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white text-purple-600 hover:bg-purple-50 shadow-md hover:shadow-lg"
              }`}
            >
              다음
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
