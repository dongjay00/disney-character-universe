"use client";

import { DisneyCharacter } from "@/types/disney";
import Image from "next/image";
import Link from "next/link";
import { Film, Tv, Gamepad2, Star, Scale, Share2 } from "lucide-react";
import { useFavoritesStore } from "@/lib/store/favoritesStore";
import { useCompareStore } from "@/lib/store/compareStore";
import { motion } from "framer-motion";

interface CharacterCardProps {
  character: DisneyCharacter;
  index?: number;
}

export default function CharacterCard({
  character,
  index = 0,
}: CharacterCardProps) {
  const hasImage =
    character.imageUrl && !character.imageUrl.includes("image_not_found");
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const { isInCompare, toggleCompare } = useCompareStore();

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (navigator.share) {
      try {
        await navigator.share({
          title: character.name,
          text: `디즈니 캐릭터 ${character.name}을(를) 확인해보세요!`,
          url: `/characters/${character._id}`,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      // Fallback: 클립보드에 복사
      const url = `${window.location.origin}/characters/${character._id}`;
      await navigator.clipboard.writeText(url);
      alert("링크가 클립보드에 복사되었습니다!");
    }
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(character._id);
  };

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleCompare(character._id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
    >
      <Link href={`/characters/${character._id}`}>
        <div className="disney-card group cursor-pointer h-full relative">
          {/* 액션 버튼들 */}
          <div className="absolute top-2 right-2 z-10 flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleFavorite}
              className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                isFavorite(character._id)
                  ? "bg-yellow-500 text-white"
                  : "bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300"
              }`}
            >
              <Star
                className="w-4 h-4"
                fill={isFavorite(character._id) ? "currentColor" : "none"}
              />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleCompare}
              className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                isInCompare(character._id)
                  ? "bg-blue-500 text-white"
                  : "bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300"
              }`}
            >
              <Scale className="w-4 h-4" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleShare}
              className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </motion.button>
          </div>

          {/* 이미지 섹션 */}
          <div className="relative aspect-[3/4] bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 overflow-hidden">
            {hasImage ? (
              <Image
                src={character.imageUrl}
                alt={character.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-6xl">
                ✨
              </div>
            )}

            {/* 오버레이 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* 정보 섹션 */}
          <div className="p-4">
            <h3 className="font-bold text-lg mb-2 line-clamp-1 text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
              {character.name}
            </h3>

            {/* 출연작 뱃지 */}
            <div className="flex flex-wrap gap-2">
              {character.films.length > 0 && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                  <Film className="w-3 h-3" />
                  {character.films.length}
                </span>
              )}
              {character.tvShows.length > 0 && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium">
                  <Tv className="w-3 h-3" />
                  {character.tvShows.length}
                </span>
              )}
              {character.videoGames.length > 0 && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300 rounded-full text-xs font-medium">
                  <Gamepad2 className="w-3 h-3" />
                  {character.videoGames.length}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
