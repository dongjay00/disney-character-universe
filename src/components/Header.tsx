"use client";

import Link from "next/link";
import { Sparkles, Home, Users, Moon, Sun, Star, Scale } from "lucide-react";
import { useThemeStore } from "@/lib/store/themeStore";
import { useFavoritesStore } from "@/lib/store/favoritesStore";
import { useCompareStore } from "@/lib/store/compareStore";
import { useEffect } from "react";

export default function Header() {
  const { isDarkMode, toggleDarkMode } = useThemeStore();
  const favorites = useFavoritesStore((state) => state.favorites);
  const compareList = useCompareStore((state) => state.compareList);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md transition-colors">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Sparkles className="w-8 h-8 text-purple-600 dark:text-purple-400 animate-sparkle" />
              <div className="absolute inset-0 bg-purple-400 blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
            </div>
            <h1 className="text-2xl font-bold magic-text">Disney Universe</h1>
          </Link>

          <nav className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium"
            >
              <Home className="w-5 h-5" />
              <span className="hidden md:inline">홈</span>
            </Link>

            <Link
              href="/characters"
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium"
            >
              <Users className="w-5 h-5" />
              <span className="hidden md:inline">캐릭터</span>
            </Link>

            <Link
              href="/favorites"
              className="relative flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium"
            >
              <Star className="w-5 h-5" />
              <span className="hidden md:inline">즐겨찾기</span>
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>

            <Link
              href="/compare"
              className="relative flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium"
            >
              <Scale className="w-5 h-5" />
              <span className="hidden md:inline">비교</span>
              {compareList.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                  {compareList.length}
                </span>
              )}
            </Link>

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
