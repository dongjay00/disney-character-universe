import {
  CharacterListResponse,
  CharacterDetailResponse,
  FilterOptions,
} from "@/types/disney";

const BASE_URL = "https://api.disneyapi.dev";

export const disneyApi = {
  // 캐릭터 목록 조회
  getCharacters: async (
    filters: FilterOptions = {}
  ): Promise<CharacterListResponse> => {
    const params = new URLSearchParams();

    if (filters.page) params.append("page", filters.page.toString());
    if (filters.pageSize)
      params.append("pageSize", filters.pageSize.toString());
    if (filters.films) params.append("films", filters.films);
    if (filters.tvShows) params.append("tvShows", filters.tvShows);
    if (filters.videoGames) params.append("videoGames", filters.videoGames);

    const url = `${BASE_URL}/character${
      params.toString() ? `?${params.toString()}` : ""
    }`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch characters");
    }

    return response.json();
  },

  // 단일 캐릭터 조회
  getCharacter: async (id: number): Promise<CharacterDetailResponse> => {
    const response = await fetch(`${BASE_URL}/character/${id}`);

    if (!response.ok) {
      throw new Error("Character not found");
    }

    return response.json();
  },

  // 모든 캐릭터 검색용 (이름 기반 필터링)
  searchCharacters: async (query: string): Promise<CharacterListResponse> => {
    const response = await fetch(`${BASE_URL}/character?pageSize=200`);

    if (!response.ok) {
      throw new Error("Failed to search characters");
    }

    const data: CharacterListResponse = await response.json();

    // 클라이언트 사이드에서 이름 필터링
    const filtered = data.data.filter((char) =>
      char.name.toLowerCase().includes(query.toLowerCase())
    );

    return {
      ...data,
      data: filtered,
      count: filtered.length,
    };
  },
};
