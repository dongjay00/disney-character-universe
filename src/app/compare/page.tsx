"use client";

import Header from "@/components/Header";
import { useCompareStore } from "@/lib/store/compareStore";
import { useCharacter } from "@/lib/hooks/useCharacters";
import { Scale, X, Film, Tv, Gamepad2, Users, Swords } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

function CompareCharacterCard({
  id,
  onRemove,
}: {
  id: number;
  onRemove: () => void;
}) {
  const { data, isLoading } = useCharacter(id);

  if (isLoading) {
    return (
      <div className="disney-card p-6">
        <div className="shimmer h-64 rounded mb-4" />
        <div className="shimmer h-6 rounded mb-2" />
      </div>
    );
  }

  if (!data) return null;

  const character = data.data;
  const hasImage =
    character.imageUrl && !character.imageUrl.includes("image_not_found");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="disney-card overflow-hidden relative"
    >
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 z-10 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>

      {/* 이미지 */}
      <div className="relative aspect-[3/4] bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
        {hasImage ? (
          <Image
            src={character.imageUrl}
            alt={character.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-6xl">
            ✨
          </div>
        )}
      </div>

      {/* 정보 */}
      <div className="p-6 space-y-4">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          {character.name}
        </h3>

        {/* 영화 */}
        <div>
          <div className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            <Film className="w-4 h-4 text-blue-500" />
            <span>영화 ({character.films.length})</span>
          </div>
          {character.films.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {character.films.slice(0, 3).map((film, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs"
                >
                  {film}
                </span>
              ))}
              {character.films.length > 3 && (
                <span className="px-2 py-1 text-xs text-gray-500 dark:text-gray-400">
                  +{character.films.length - 3}
                </span>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">없음</p>
          )}
        </div>

        {/* TV쇼 */}
        <div>
          <div className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            <Tv className="w-4 h-4 text-purple-500" />
            <span>TV쇼 ({character.tvShows.length})</span>
          </div>
          {character.tvShows.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {character.tvShows.slice(0, 3).map((show, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-purple-50 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded text-xs"
                >
                  {show}
                </span>
              ))}
              {character.tvShows.length > 3 && (
                <span className="px-2 py-1 text-xs text-gray-500 dark:text-gray-400">
                  +{character.tvShows.length - 3}
                </span>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">없음</p>
          )}
        </div>

        {/* 게임 */}
        <div>
          <div className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            <Gamepad2 className="w-4 h-4 text-pink-500" />
            <span>게임 ({character.videoGames.length})</span>
          </div>
          {character.videoGames.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {character.videoGames.slice(0, 3).map((game, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-pink-50 dark:bg-pink-900 text-pink-700 dark:text-pink-300 rounded text-xs"
                >
                  {game}
                </span>
              ))}
              {character.videoGames.length > 3 && (
                <span className="px-2 py-1 text-xs text-gray-500 dark:text-gray-400">
                  +{character.videoGames.length - 3}
                </span>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">없음</p>
          )}
        </div>

        {/* 동료 */}
        <div>
          <div className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            <Users className="w-4 h-4 text-green-500" />
            <span>동료 ({character.allies.length})</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {character.allies.length > 0
              ? character.allies.slice(0, 3).join(", ")
              : "없음"}
            {character.allies.length > 3 && ` +${character.allies.length - 3}`}
          </p>
        </div>

        {/* 적 */}
        <div>
          <div className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            <Swords className="w-4 h-4 text-red-500" />
            <span>적 ({character.enemies.length})</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {character.enemies.length > 0
              ? character.enemies.slice(0, 3).join(", ")
              : "없음"}
            {character.enemies.length > 3 &&
              ` +${character.enemies.length - 3}`}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function ComparePage() {
  const { compareList, removeFromCompare, clearCompare } = useCompareStore();

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
          <div className="flex items-center justify-center gap-3 mb-4">
            <Scale className="w-10 h-10 text-blue-500" />
            <h1 className="text-4xl md:text-5xl font-bold magic-text">
              캐릭터 비교
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">
            {compareList.length > 0
              ? `${compareList.length}명의 캐릭터를 비교하고 있어요 (최대 3명)`
              : "비교할 캐릭터를 추가해보세요"}
          </p>
          {compareList.length > 0 && (
            <button
              onClick={clearCompare}
              className="text-red-500 hover:text-red-600 font-medium transition-colors"
            >
              모두 제거
            </button>
          )}
        </motion.div>

        {/* 비교 그리드 */}
        {compareList.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <Scale className="w-32 h-32 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4">
              비교할 캐릭터가 없어요
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              캐릭터 카드의 ⚖️ 버튼을 눌러 최대 3명까지 비교해보세요!
            </p>
            <a href="/characters" className="disney-btn-primary inline-block">
              캐릭터 둘러보기
            </a>
          </motion.div>
        ) : (
          <div
            className={`grid gap-6 ${
              compareList.length === 1
                ? "md:grid-cols-1 max-w-md mx-auto"
                : compareList.length === 2
                ? "md:grid-cols-2"
                : "md:grid-cols-3"
            }`}
          >
            {compareList.map((id) => (
              <CompareCharacterCard
                key={id}
                id={id}
                onRemove={() => removeFromCompare(id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
