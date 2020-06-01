import { ISongFormat } from './types';

export function transformPlayList(list: []): ISongFormat[] {
  return list.map((item: any) => {
    return transformSong(item);
  });
}
export function transformSong(item: any): ISongFormat {
  const artist = [];
  const artistId = item.song.artists.map((a: { id: any }) => {
    return a.id;
  });
  for (const ar of item.song.artists) {
    artist.push(ar.name);
  }
  return {
    name: item.name,
    id: item.id,
    artist: artist.join('/'),
    artists: artist,
    artistId: artistId,
    cover: item.song.album.blurPicUrl,
    albumName: item.song.album.name,
    albumId: item.song.album.id,
    theme: [255, 255, 255],
    songType: 'song'
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
    cover: item.picUrl,
    theme: [255, 255, 255],
    songType: 'dj'
  };
}
