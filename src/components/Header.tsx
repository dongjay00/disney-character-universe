"use client";

import Link from "next/link";
import { Sparkles, Home, Users } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Sparkles className="w-8 h-8 text-purple-600 animate-sparkle" />
              <div className="absolute inset-0 bg-purple-400 blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
            </div>
            <h1 className="text-2xl font-bold magic-text">Disney Universe</h1>
          </Link>

          <nav className="flex gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors font-medium"
            >
              <Home className="w-5 h-5" />
              <span>홈</span>
            </Link>
            <Link
              href="/characters"
              className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors font-medium"
            >
              <Users className="w-5 h-5" />
              <span>캐릭터</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
