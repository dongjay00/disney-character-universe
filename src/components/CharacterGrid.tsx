"use client";

import { DisneyCharacter } from "@/types/disney";
import CharacterCard from "./CharacterCard";

interface CharacterGridProps {
  characters: DisneyCharacter[];
  isLoading?: boolean;
}

export default function CharacterGrid({
  characters,
  isLoading,
}: CharacterGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="disney-card">
            <div className="aspect-[3/4] shimmer" />
            <div className="p-4">
              <div className="h-6 shimmer rounded mb-2" />
              <div className="h-4 shimmer rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (characters.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-2xl font-bold text-gray-700 mb-2">
          캐릭터를 찾을 수 없어요
        </h3>
        <p className="text-gray-500">다른 검색어나 필터를 시도해보세요</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {characters.map((character) => (
        <CharacterCard key={character._id} character={character} />
      ))}
    </div>
  );
}
