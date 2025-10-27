"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CharacterCard from "@/components/CharacterCard";
import { useCharacters } from "@/lib/hooks/useCharacters";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HomePage() {
  // 첫 페이지의 일부 캐릭터만 프리뷰로 표시
  const { data, isLoading } = useCharacters({ page: 1, pageSize: 10 });

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />

      {/* 인기 캐릭터 섹션 */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-6 h-6 text-purple-600" />
              <h2 className="text-3xl font-bold magic-text">인기 캐릭터</h2>
            </div>
            <p className="text-gray-600">
              가장 사랑받는 디즈니 친구들을 만나보세요
            </p>
          </div>

          <Link
            href="/characters"
            className="hidden md:flex items-center gap-2 disney-btn-primary"
          >
            전체 보기
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="disney-card">
                <div className="aspect-[3/4] shimmer" />
                <div className="p-4">
                  <div className="h-6 shimmer rounded mb-2" />
                  <div className="h-4 shimmer rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {data?.data.slice(0, 10).map((character) => (
              <CharacterCard key={character._id} character={character} />
            ))}
          </div>
        )}

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/characters"
            className="inline-flex items-center gap-2 disney-btn-primary"
          >
            전체 보기
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* 특징 섹션 */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 magic-text">
            디즈니 유니버스의 특별함
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎬</span>
              </div>
              <h3 className="font-bold text-xl mb-2">영화 정보</h3>
              <p className="text-gray-600">
                모든 디즈니 영화 출연 정보를 한눈에
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📺</span>
              </div>
              <h3 className="font-bold text-xl mb-2">TV쇼 & 게임</h3>
              <p className="text-gray-600">
                TV 시리즈와 게임 출연작까지 완벽 정리
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✨</span>
              </div>
              <h3 className="font-bold text-xl mb-2">관계 정보</h3>
              <p className="text-gray-600">
                동료와 적 관계를 통해 캐릭터 이해하기
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            Powered by Disney API • Made with ✨ and Next.js
          </p>
        </div>
      </footer>
    </div>
  );
}
