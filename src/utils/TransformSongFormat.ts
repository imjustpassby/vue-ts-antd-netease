import { ISongFormat } from './types';

export function transformPlayList(list: []): ISongFormat[] {
  return list.map((item: any) => {
    return transformSong(item);
  });
}
export function transformSong(item: any): ISongFormat {
  const artists = [];
  const artistId = item.song.artists.map((a: { id: any }) => {
    return a.id;
  });
  for (const ar of item.song.artists) {
    artists.push(ar.name);
  }
  return {
    name: item.name,
    id: item.id,
    artist: artists.join('/'),
    artists: artists,
    artistId: artistId,
    cover: `${item.song.album.blurPicUrl}?param=200y200`,
    albumName: item.song.album.name,
    albumId: item.song.album.id,
    theme: [255, 255, 255],
    songType: 'song',
    key: item.id
  };
}
export function transformDjProgramList(list: []): ISongFormat[] {
  return list.map(item => {
    return transformDjProgram(item);
  });
}

export function transformDjProgram(item: any): ISongFormat {
  return {
    name: item.name,
    id: item.program.mainSong.id,
    artist: item.program.dj.nickname,
    artists: [item.program.dj.nickname],
    artistId: [item.program.radio.id],
    albumName: item.name,
    albumId: item.program.mainSong.id,
    cover: `${item.picUrl}?param=200y200`,
    theme: [255, 255, 255],
    songType: 'dj',
    key: item.id
  };
}
