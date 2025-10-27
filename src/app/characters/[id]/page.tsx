"use client";

import { use } from "react";
import Header from "@/components/Header";
import { useCharacter } from "@/lib/hooks/useCharacters";
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
} from "lucide-react";

export default function CharacterDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data, isLoading, error } = useCharacter(Number(id));

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
            <h2 className="text-2xl font-bold mb-4">
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

  return (
    <div className="min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <Link
          href="/characters"
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          돌아가기
        </Link>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* 이미지 섹션 */}
            <div className="disney-card overflow-hidden">
              <div className="relative aspect-[3/4] bg-gradient-to-br from-blue-100 to-purple-100">
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
            </div>

            {/* 정보 섹션 */}
            <div className="space-y-6">
              {/* 이름 */}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold magic-text mb-2">
                  {character.name}
                </h1>
                <div className="flex items-center gap-2 text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">
                    등록일:{" "}
                    {new Date(character.createdAt).toLocaleDateString("ko-KR")}
                  </span>
                </div>
              </div>

              {/* 영화 */}
              {character.films.length > 0 && (
                <div className="disney-card p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Film className="w-5 h-5 text-blue-600" />
                    <h3 className="font-bold text-lg">출연 영화</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {character.films.map((film, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                      >
                        {film}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* TV 쇼 */}
              {character.tvShows.length > 0 && (
                <div className="disney-card p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Tv className="w-5 h-5 text-purple-600" />
                    <h3 className="font-bold text-lg">출연 TV쇼</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {character.tvShows.map((show, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm"
                      >
                        {show}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 비디오 게임 */}
              {character.videoGames.length > 0 && (
                <div className="disney-card p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Gamepad2 className="w-5 h-5 text-pink-600" />
                    <h3 className="font-bold text-lg">출연 게임</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {character.videoGames.map((game, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-pink-50 text-pink-700 rounded-full text-sm"
                      >
                        {game}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 파크 어트랙션 */}
              {character.parkAttractions.length > 0 && (
                <div className="disney-card p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-5 h-5 text-green-600" />
                    <h3 className="font-bold text-lg">테마파크 어트랙션</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {character.parkAttractions.map((attraction, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm"
                      >
                        {attraction}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 동료 */}
              {character.allies.length > 0 && (
                <div className="disney-card p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="w-5 h-5 text-cyan-600" />
                    <h3 className="font-bold text-lg">동료</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {character.allies.map((ally, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-cyan-50 text-cyan-700 rounded-full text-sm"
                      >
                        {ally}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 적 */}
              {character.enemies.length > 0 && (
                <div className="disney-card p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Swords className="w-5 h-5 text-red-600" />
                    <h3 className="font-bold text-lg">적</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {character.enemies.map((enemy, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm"
                      >
                        {enemy}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 출처 링크 */}
              <a
                href={character.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="disney-card p-6 flex items-center justify-between hover:shadow-xl transition-shadow group"
              >
                <div>
                  <h3 className="font-bold mb-1">더 알아보기</h3>
                  <p className="text-sm text-gray-600">
                    Disney Fandom Wiki에서 더 많은 정보를 확인하세요
                  </p>
                </div>
                <ExternalLink className="w-6 h-6 text-purple-600 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
