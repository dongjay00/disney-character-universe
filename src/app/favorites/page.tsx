"use client";

import Header from "@/components/Header";
import CharacterCard from "@/components/CharacterCard";
import { useFavoritesStore } from "@/lib/store/favoritesStore";
import { useCharacter } from "@/lib/hooks/useCharacters";
import { Star, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

// 개별 캐릭터 컴포넌트로 분리
function FavoriteCharacterCard({ id, index }: { id: number; index: number }) {
  const { data, isLoading } = useCharacter(id);

  if (isLoading) {
    return (
      <div className="disney-card">
        <div className="aspect-[3/4] shimmer" />
        <div className="p-4">
          <div className="h-6 shimmer rounded mb-2" />
          <div className="h-4 shimmer rounded w-2/3" />
        </div>
      </div>
    );
  }

  if (!data?.data) return null;

  return <CharacterCard character={data.data} index={index} />;
}

export default function FavoritesPage() {
  const favorites = useFavoritesStore((state) => state.favorites);

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
            <Star className="w-10 h-10 text-yellow-500" fill="currentColor" />
            <h1 className="text-4xl md:text-5xl font-bold magic-text">
              즐겨찾기
            </h1>
            <Star className="w-10 h-10 text-yellow-500" fill="currentColor" />
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            {favorites.length > 0
              ? `${favorites.length}명의 캐릭터를 즐겨찾기에 추가했어요`
              : "아직 즐겨찾기한 캐릭터가 없어요"}
          </p>
        </motion.div>

        {/* 캐릭터 그리드 */}
        {favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="inline-block mb-6 relative">
              <Star className="w-32 h-32 text-gray-300 dark:text-gray-600" />
              <Sparkles className="w-8 h-8 text-purple-400 absolute top-0 right-0 animate-sparkle" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4">
              즐겨찾기가 비어있어요
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              마음에 드는 캐릭터를 찾아서 ⭐ 버튼을 눌러보세요!
            </p>
            <a href="/characters" className="disney-btn-primary inline-block">
              캐릭터 둘러보기
            </a>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {favorites.map((id, index) => (
              <FavoriteCharacterCard key={id} id={id} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
