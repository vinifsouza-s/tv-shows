export interface EpisodeProps {
  number: number;
  id: number;
  name: string;
  summary: string;
  season: number;
  runtime: number;
  image: {
    medium: string;
  };
}
