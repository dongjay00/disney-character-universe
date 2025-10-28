"use client";

import { use } from "react";
import Header from "@/components/Header";
import { useCharacter } from "@/lib/hooks/useCharacters";
import { useFavoritesStore } from "@/lib/store/favoritesStore";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Film,
  Tv,
  Gamepad2,
  MapPin,
  Users,
  Swords,
  ExternalLink,
  Calendar,
  Star,
  Share2,
} from "lucide-react";
import { motion } from "framer-motion";

export default function CharacterDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data, isLoading, error } = useCharacter(Number(id));
  const { isFavorite, toggleFavorite } = useFavoritesStore();

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="shimmer h-12 w-48 rounded mb-8" />
            <div className="grid md:grid-cols-2 gap-8">
              <div className="shimmer aspect-[3/4] rounded-2xl" />
              <div className="space-y-4">
                <div className="shimmer h-16 rounded" />
                <div className="shimmer h-32 rounded" />
                <div className="shimmer h-32 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-20">
            <div className="text-6xl mb-4">😢</div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              캐릭터를 찾을 수 없습니다
            </h2>
            <Link href="/characters" className="disney-btn-primary">
              <ArrowLeft className="w-5 h-5 inline mr-2" />
              목록으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const character = data.data;
  const hasImage =
    character.imageUrl && !character.imageUrl.includes("image_not_found");
  const isFav = isFavorite(character._id);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: character.name,
          text: `디즈니 캐릭터 ${character.name}을(를) 확인해보세요!`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("링크가 클립보드에 복사되었습니다!");
    }
  };

  return (
    <div className="min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link
            href="/characters"
            className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            돌아가기
          </Link>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* 이미지 섹션 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="disney-card overflow-hidden relative"
            >
              {/* 액션 버튼 */}
              <div className="absolute top-4 right-4 z-10 flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleFavorite(character._id)}
                  className={`p-3 rounded-full backdrop-blur-sm transition-colors ${
                    isFav
                      ? "bg-yellow-500 text-white"
                      : "bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  <Star
                    className="w-5 h-5"
                    fill={isFav ? "currentColor" : "none"}
                  />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleShare}
                  className="p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="relative aspect-[3/4] bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
                {hasImage ? (
                  <Image
                    src={character.imageUrl}
                    alt={character.name}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-9xl">✨</span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* 정보 섹션 */}
            <div className="space-y-6">
              {/* 이름 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold magic-text mb-2">
                  {character.name}
                </h1>
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">
                    등록일:{" "}
                    {character.createdAt
                      ? new Date(character.createdAt).toLocaleDateString(
                          "ko-KR"
                        )
                      : "-"}
                  </span>
                </div>
              </motion.div>

              {/* 영화 */}
              {character.films.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="disney-card p-6"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Film className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                      출연 영화
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {character.films.map((film, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm"
                      >
                        {film}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* TV 쇼 */}
              {character.tvShows.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="disney-card p-6"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Tv className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                      출연 TV쇼
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {character.tvShows.map((show, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-purple-50 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-sm"
                      >
                        {show}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* 비디오 게임 */}
              {character.videoGames.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="disney-card p-6"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Gamepad2 className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                      출연 게임
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {character.videoGames.map((game, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-pink-50 dark:bg-pink-900 text-pink-700 dark:text-pink-300 rounded-full text-sm"
                      >
                        {game}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* 파크 어트랙션 */}
              {character.parkAttractions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="disney-card p-6"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                      테마파크 어트랙션
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {character.parkAttractions.map((attraction, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm"
                      >
                        {attraction}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* 동료 */}
              {character.allies.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="disney-card p-6"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                      동료
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {character.allies.map((ally, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-cyan-50 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-300 rounded-full text-sm"
                      >
                        {ally}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* 적 */}
              {character.enemies.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="disney-card p-6"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Swords className="w-5 h-5 text-red-600 dark:text-red-400" />
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                      적
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {character.enemies.map((enemy, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-full text-sm"
                      >
                        {enemy}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* 출처 링크 */}
              {character.sourceUrl && (
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  href={character.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="disney-card p-6 flex items-center justify-between hover:shadow-xl transition-shadow group"
                >
                  <div>
                    <h3 className="font-bold mb-1 text-gray-900 dark:text-white">
                      더 알아보기
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Disney Fandom Wiki에서 더 많은 정보를 확인하세요
                    </p>
                  </div>
                  <ExternalLink className="w-6 h-6 text-purple-600 dark:text-purple-400 group-hover:translate-x-1 transition-transform" />
                </motion.a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
