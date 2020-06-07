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

export type ResponseSearch<T = any> = {
  result: T;
};

export type ISearchVideo = {
  coverUrl: string;
  title: string;
  vid: string;
};

export type ResponseSearchVideoResult = {
  videoCount: number;
  videos: ISearchVideo[];
};

export type ISearchSong = {
  id: number;
};

export type ResponseSearchSongResult = {
  songCount: number;
  songs: ISearchSong[];
};

export type ISearchPlaylist = {
  id: number;
  name: string;
  coverImgUrl: string;
};

export type ResponseSearchPlaylistResult = {
  playlistCount: number;
  playlists: ISearchPlaylist[];
};

export type ISearchMv = {
  id: number;
  name: string;
  cover: string;
};

export type ResponseSearchMvResult = {
  mvCount: number;
  mvs: ISearchMv[];
};

export type ISearchAlbum = {
  id: number;
  name: string;
  picUrl: string;
};

export type ResponseSearchAlbumResult = {
  albumCount: number;
  albums: ISearchAlbum[];
};

export type ISearchArtist = {
  id: number;
  name: string;
  img1v1Url: string;
};

export type ResponseSearchArtistResult = {
  albumCount: number;
  artists: ISearchArtist[];
};

export type ISearchDjProgram = {
  id: number;
  name: string;
  picUrl: string;
};

export type ResponseSearchDjProgramResult = {
  djRadiosCount: number;
  djRadios: ISearchDjProgram[];
};

export type TopPlaylistParams = {
  limit: number;
  category: string;
  offset: number;
};

export type ITopPlaylist = {
  id: number;
  name: string;
  coverImgUrl: string;
};

export type ResponseTopPlaylist = {
  total: number;
  code: number;
  cat: string;
  playlists: ITopPlaylist[];
};

export type IPlaylistCategoryListSub = {
  name: string;
  category: number;
};

export type IPlaylistCategory = {
  [x: string]: string;
};

export type ResponsePlaylistCategoryList = {
  sub: IPlaylistCategoryListSub[];
  categories: IPlaylistCategory;
};

export type TopAlbumParams = {
  limit: number;
  offset: number;
};

export type INewestAlbum = {
  name: string;
  id: number;
  picUrl: string;
};

export type ResponseNewestAlbum = {
  albums: INewestAlbum[];
};
