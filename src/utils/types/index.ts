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
