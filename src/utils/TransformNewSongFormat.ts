import { ISongFormat } from './types';
import CommonMethod from '@/utils/CommonMethod';
// 处理home recommendNewSong格式
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
    cover: `${item.song.album.blurPicUrl}`,
    albumName: item.song.album.name,
    albumId: item.song.album.id,
    theme: [255, 255, 255],
    songType: 'song',
    key: item.id,
    pop: 0,
    duration: CommonMethod.getDuration(item.dt)
  };
}

// 处理home recommendDj 格式
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
    cover: `${item.picUrl}`,
    theme: [255, 255, 255],
    songType: 'dj',
    key: item.id,
    lrc: '',
    pop: 0,
    duration: CommonMethod.getDuration(item.dt)
  };
}
