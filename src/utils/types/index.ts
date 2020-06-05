export type ISongFormat = {
  name: string;
  id: number;
  artist: string;
  artists: string[];
  artistId: number[];
  cover: string;
  albumName: string;
  albumId: number;
  theme: [number, number, number];
  songType: 'dj' | 'song';
  key: number;
  url?: string;
  lrc?: string;
};

export type IPlaylistFormat = {
  id: number;
  name: string;
  cover: string;
  creator: string;
  updateTime: string;
  trackIds: number[];
  tracks: ISongFormat[];
  description: string;
  tags?: string[];
};

export type IProfile = {
  userId: number;
  nickname: string;
  avatarUrl: string;
};

export type ResponseLoginStatus<T = any> = {
  profile: T;
};

export type ResponseBanner<T = any> = {
  banners: T;
};

export type IBanner = {
  targetId: number;
  imageUrl: string;
  titleColor: string;
  typeTitle: string;
  targetType: number;
  url: string | null;
};

export type ResponsePersonalized<T = any> = {
  result: T;
};

export type IPersonalizedPlaylist = {
  id: number;
  name: string;
  picUrl: string;
};

export type ResponsePersonalizedNewSong = {
  result: [];
};

export type IPersonalizedMv = {
  id: number;
  name: string;
  picUrl: string;
};

export type IRanking = {
  id: number;
  name: string;
  coverImgUrl: string;
};

export type ResponseRankingList<T = any> = {
  code: number;
  list: T;
};

export type ResponsePlaylist = {
  code: number;
  playlist: [];
};

export type ResponseSongDetail = {
  songs: [];
};

export type ResponseCheckMusic = {
  success: boolean;
};

export type ISongUrl = {
  id: number;
  url: string;
};

export type ResponseSongUrl<T = any> = {
  data: T;
};

export type ILrc = {
  version: number;
  lyric: string;
};

export type ResponseLrc = {
  lrc?: ILrc;
};

export type SearchParams = {
  keywords: string;
  offset?: number;
  type: number;
  limit?: number;
};

export type IVideo = {
  coverUrl: string;
  title: string;
  vid: string;
};

export type ResponseSearchVideoResult = {
  videoCount: number;
  videos: IVideo[];
};

export type ResponseSearchVideo = {
  result: ResponseSearchVideoResult;
};

export type ISearchSong = {
  id: number;
};

export type ResponseSearchSongResult = {
  songCount: number;
  songs: ISearchSong[];
};

export type ResponseSearchSong = {
  result: ResponseSearchSongResult;
};
