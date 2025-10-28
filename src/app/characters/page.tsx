"use client";

import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import CharacterGrid from "@/components/CharacterGrid";
import { useCharacters } from "@/lib/hooks/useCharacters";
import { useFilterStore } from "@/lib/store/filterStore";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { FilterOptions } from "@/types/disney";

export default function CharactersPage() {
  const { searchType, searchQuery, currentPage, setCurrentPage, resetFilters } =
    useFilterStore();

  // API 쿼리 파라미터 구성
  const queryParams: FilterOptions = {
    page: currentPage,
    pageSize: 20,
  };

  // 검색 타입에 따라 파라미터 추가
  if (searchQuery.length >= 2) {
    if (searchType === "films") {
      queryParams.films = searchQuery;
    } else if (searchType === "tvShows") {
      queryParams.tvShows = searchQuery;
    } else if (searchType === "videoGames") {
      queryParams.videoGames = searchQuery;
    }
  }

  const { data, isLoading, error } = useCharacters(queryParams);

  const totalPages = data?.info.totalPages || 1;
  const characters = data?.data || [];
  const count = data?.info.count || 0;

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

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 검색 상태 메시지
  const getStatusMessage = () => {
    if (isLoading) return "로딩 중...";
    if (error) return "데이터를 불러오는데 실패했습니다";
    if (searchQuery.length >= 2) {
      const typeLabels = {
        films: "영화",
        tvShows: "TV쇼",
        videoGames: "게임",
      };
      return `"${searchQuery}" ${typeLabels[searchType]} 검색 결과: ${count}개`;
    }
    return `전체 캐릭터: ${count * totalPages}개`;
  };

  return (
    <div className="min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* 페이지 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            <h1 className="text-4xl md:text-5xl font-bold magic-text">
              캐릭터 탐색
            </h1>
            <Sparkles className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            {getStatusMessage()}
          </p>
        </motion.div>

        {/* 검색바 */}
        <div className="mb-8">
          <SearchBar />
          {(searchQuery || searchType !== "films") && (
            <div className="text-center mt-4">
              <button
                onClick={resetFilters}
                className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium"
              >
                초기화
              </button>
            </div>
          )}
        </div>

        {/* 에러 상태 */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">😢</div>
            <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
              데이터를 불러올 수 없습니다
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              잠시 후 다시 시도해주세요
            </p>
          </motion.div>
        )}

        {/* 캐릭터 그리드 */}
        {!error && (
          <>
            <CharacterGrid characters={characters} isLoading={isLoading} />

            {/* 페이지네이션 */}
            {!isLoading && characters.length > 0 && totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12 flex flex-col items-center gap-4"
              >
                {/* 페이지 버튼들 */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                      currentPage === 1
                        ? "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                        : "bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-gray-700 shadow-md hover:shadow-lg"
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                    이전
                  </button>

                  <div className="flex items-center gap-2">
                    {/* 첫 페이지 */}
                    {currentPage > 2 && (
                      <>
                        <button
                          onClick={() => handlePageClick(1)}
                          className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-white"
                        >
                          1
                        </button>
                        {currentPage > 3 && (
                          <span className="text-gray-400 dark:text-gray-500">
                            ...
                          </span>
                        )}
                      </>
                    )}

                    {/* 이전 페이지 */}
                    {currentPage > 1 && (
                      <button
                        onClick={() => handlePageClick(currentPage - 1)}
                        className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-white"
                      >
                        {currentPage - 1}
                      </button>
                    )}

                    {/* 현재 페이지 */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center justify-center font-bold shadow-lg">
                      {currentPage}
                    </div>

                    {/* 다음 페이지 */}
                    {currentPage < totalPages && (
                      <button
                        onClick={() => handlePageClick(currentPage + 1)}
                        className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-white"
                      >
                        {currentPage + 1}
                      </button>
                    )}

                    {/* 마지막 페이지 */}
                    {currentPage < totalPages - 1 && (
                      <>
                        {currentPage < totalPages - 2 && (
                          <span className="text-gray-400 dark:text-gray-500">
                            ...
                          </span>
                        )}
                        <button
                          onClick={() => handlePageClick(totalPages)}
                          className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-white"
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
                        ? "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                        : "bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-gray-700 shadow-md hover:shadow-lg"
                    }`}
                  >
                    다음
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* 페이지 정보 */}
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  페이지 {currentPage} / {totalPages}
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
