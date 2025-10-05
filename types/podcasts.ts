export type episodeItem = {
  id: number;
  title: string;
  duration: string;
  url: string;
};
export type Episode = {
  id: number;
  title: string;
  description: string;
  datePublished: number;
  enclosureUrl: string;
  image: string | null;
  feedId: number;
  link: string | null;
  duration: string;
  artwork: string | null;
  artist: string | null;
};

export type EpisodesByFeedIdResponse = {
  status: string;
  description?: string;
  items?: Array<{
    id: number;
    title: string;
    description: string;
    datePublished: number;
    enclosureUrl: string;
    image?: string;
    feedId: number;
    link?: string;
    duration: string;
    artwork: string | null;
    artist: string | null;
  }>;
};

export type podcastItem = {
  id: number;

  url: string;

  title: string;

  description: string;

  author: string;

  image: string;

  artwork: string;

  newestItemPublishTime: number;

  itunesId: number | null;

  trendScore: number;

  language: string;

  // episodes?: episodeItem[];
};