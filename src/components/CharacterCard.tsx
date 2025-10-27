"use client";

import { DisneyCharacter } from "@/types/disney";
import Image from "next/image";
import Link from "next/link";
import { Film, Tv, Gamepad2 } from "lucide-react";

interface CharacterCardProps {
  character: DisneyCharacter;
}

export default function CharacterCard({ character }: CharacterCardProps) {
  const hasImage =
    character.imageUrl && !character.imageUrl.includes("image_not_found");

  return (
    <Link href={`/characters/${character._id}`}>
      <div className="disney-card group cursor-pointer h-full">
        {/* 이미지 섹션 */}
        <div className="relative aspect-[3/4] bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden">
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
          <h3 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-purple-600 transition-colors">
            {character.name}
          </h3>

          {/* 출연작 뱃지 */}
          <div className="flex flex-wrap gap-2">
            {character.films.length > 0 && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                <Film className="w-3 h-3" />
                {character.films.length}
              </span>
            )}
            {character.tvShows.length > 0 && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                <Tv className="w-3 h-3" />
                {character.tvShows.length}
              </span>
            )}
            {character.videoGames.length > 0 && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-medium">
                <Gamepad2 className="w-3 h-3" />
                {character.videoGames.length}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
