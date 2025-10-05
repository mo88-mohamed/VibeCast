import { sha1 } from 'js-sha1';
import { Episode, EpisodesByFeedIdResponse } from '../types/podcasts';

const PODCAST_INDEX_API_BASE = 'https://api.podcastindex.org/api/1.0';

export type PodcastIndexAuth = {
  key: string;
  time: number;
  hash: string;
};

export const getApiAuth = (): PodcastIndexAuth => {
  const key = 'CXTZFN2U9ZVQ3LNRCHMK';
  const secret = 'xM9Txb3C39pLVzJA3W7QQtcwSD28x5g74HLdygGk';
  const time = Math.floor(Date.now() / 1000);
  const hash = sha1(`${key}${secret}${time}`);

  return { key, time, hash };
};

export const getAuthHeaders = () => {
  const { key, time, hash } = getApiAuth();
  return {
    'X-Auth-Date': String(time),
    'X-Auth-Key': key,
    Authorization: hash,
    'User-Agent': 'vibeCast/1.0',
    Accept: 'application/json',
  } as const;
};

export type PodcastIndexFeed = {
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
};

export type PodcastByIdResponse = {
  status: string;
  description?: string;
  feed?: PodcastIndexFeed;
};

export async function fetchPodcastById(feedId: number): Promise<PodcastIndexFeed> {
  const headers = getAuthHeaders();
  const url = `${PODCAST_INDEX_API_BASE}/podcasts/byfeedid?id=${encodeURIComponent(feedId)}`;
  const response = await fetch(url, { headers, method: 'GET' });
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  const data: PodcastByIdResponse = await response.json();
  if (!data.feed) {
    throw new Error(data.description || 'Podcast not found');
  }
  return data.feed;
}



export async function fetchEpisodesByFeedId(feedId: number): Promise<Episode[]> {
  const headers = getAuthHeaders();
  const url = `${PODCAST_INDEX_API_BASE}/episodes/byfeedid?id=${encodeURIComponent(feedId)}`;
  const response = await fetch(url, { headers, method: 'GET' });
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  const data: EpisodesByFeedIdResponse = await response.json();
  const items = data.items || [];
  return items.map((i) => ({
    id: i.id,
    title: i.title,
    description: i.description,
    datePublished: i.datePublished,
    enclosureUrl: i.enclosureUrl,
    image: i.image ?? null,
    feedId: i.feedId,
    link: i.link ?? null,
    duration: i.duration,
    artwork: i.artwork ?? null,
    artist: i.artist ?? null,
  }));
}

export type SearchByTitleResponse = {
  status: string;
  // description?: string;
  feeds?: PodcastIndexFeed[];
};

export async function fetchSearchByTitle(title: string): Promise<PodcastIndexFeed[]> {
  const headers = getAuthHeaders();
  const url = `${PODCAST_INDEX_API_BASE}/search/byterm?q=${encodeURIComponent(title)}&max=30&aponly=true`;
  const response = await fetch(url, { headers, method: 'GET' });
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  const data: SearchByTitleResponse = await response.json();
  return data.feeds || [];
}