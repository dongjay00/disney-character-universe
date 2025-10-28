export interface DisneyCharacter {
  _id: number;
  name: string;
  imageUrl: string;
  url: string;
  films: string[];
  shortFilms: string[];
  tvShows: string[];
  videoGames: string[];
  parkAttractions: string[];
  allies: string[];
  enemies: string[];
  sourceUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface CharacterListResponse {
  data: DisneyCharacter[];
  info: {
    count: number;
    totalPages: number;
    nextPage: string | null;
    previousPage: string | null;
  };
}

export interface CharacterDetailResponse {
  data: DisneyCharacter;
}

export interface FilterOptions {
  films?: string;
  tvShows?: string;
  videoGames?: string;
  page?: number;
  pageSize?: number;
}
