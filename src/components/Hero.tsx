"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Star } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-24 px-4">
      {/* 배경 장식 */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 animate-float">
          <Star className="w-16 h-16" fill="currentColor" />
        </div>
        <div
          className="absolute top-40 right-20 animate-float"
          style={{ animationDelay: "1s" }}
        >
          <Sparkles className="w-12 h-12" />
        </div>
        <div
          className="absolute bottom-20 left-1/4 animate-float"
          style={{ animationDelay: "2s" }}
        >
          <Star className="w-10 h-10" fill="currentColor" />
        </div>
        <div
          className="absolute bottom-40 right-1/3 animate-float"
          style={{ animationDelay: "1.5s" }}
        >
          <Sparkles className="w-14 h-14" />
        </div>
      </div>

      <div className="relative container mx-auto text-center max-w-4xl">
        <div className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
          <span className="flex items-center gap-2 text-sm font-semibold">
            <Sparkles className="w-4 h-4" />
            마법같은 디즈니의 세계로
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-shadow">
          Disney Character
          <br />
          Universe ✨
        </h1>

        <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-2xl mx-auto">
          7,400개 이상의 디즈니 캐릭터를 만나보세요.
          <br />
          영화, TV쇼, 게임 속 친구들이 모두 여기에!
        </p>

        <Link
          href="/characters"
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
        >
          모든 캐릭터 보기
          <ArrowRight className="w-5 h-5" />
        </Link>

        {/* 통계 */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <div className="text-4xl font-bold mb-2">7,400+</div>
            <div className="text-sm text-white/80">캐릭터</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <div className="text-4xl font-bold mb-2">200+</div>
            <div className="text-sm text-white/80">영화</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <div className="text-4xl font-bold mb-2">100+</div>
            <div className="text-sm text-white/80">TV쇼</div>
          </div>
        </div>
      </div>
    </div>
  );
}
