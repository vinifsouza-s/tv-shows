import { EpisodeProps } from "./Episode";

export interface SeriesProps {
  id: number;
  name: string;
  summary: string;
  premiered: string;
  genres: string[];
  image: {
    medium?: string;
    original?: string;
  };
  ended: boolean;
  _embedded: {
    episodes: EpisodeProps[];
  };
}
