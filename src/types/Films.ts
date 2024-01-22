export interface Films {
  docs: Array<{
    id: string;
    name: string;
    enName: string;
    description: string;
    poster: {
      previewUrl: string;
      url: string;
    };
    year: number;
  }>;
  page: number;
  pages: number;
}

export interface FilmDetail {
  id: string;
  name: string;
  enName: string;
  description: string;
  poster: {
    previewUrl: string;
    url: string;
  };
  countries: Array<{
    name: string;
  }>;
  year: number;
  genres: Array<{
    name: string;
  }>;
  persons: Array<{
    profession: string;
    name: string;
  }>;
  movieLength: number;
  ageRating: number;
}
