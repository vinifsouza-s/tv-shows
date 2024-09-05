import { EpisodeProps } from "./Episode";

interface NetworkProps {
  id: number;
  name: string;
  country: {
    name: string;
    code: string;
    timezone: string;
  };
  officialSite: string;
}

interface RatingProps {
  average?: number;
}

interface ScheduleProps {
  time?: string;
  days?: string[];
}

interface ImageProps {
  medium?: string;
  original?: string;
}

interface ExternalsProps {
  tvrage?: number;
  thetvdb?: number;
  imdb?: string;
}

export interface SeriesProps {
  id: number;
  name: string;
  summary: string;
  premiered: string;
  genres: string[];
  image: ImageProps;
  ended: boolean;
  network?: NetworkProps;
  rating?: RatingProps;
  schedule?: ScheduleProps;
  webChannel?: string | null;
  dvdCountry?: string | null;
  externals?: ExternalsProps;
  _embedded: {
    episodes: EpisodeProps[];
  };
}

export interface SearchResultProps {
  score: number;
  show: SeriesProps;
}
