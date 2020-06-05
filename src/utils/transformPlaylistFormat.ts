import { formatTime } from '@/utils/UtilFunction.ts';
import { getSongDetail } from '@/api/song.ts';
import { IPlaylistFormat } from '@/utils/types/index.ts';
import { ISearchSong, ISongFormat } from './types';
export async function transformResponsePlaylist(
  list: any
): Promise<IPlaylistFormat> {
  let {
    id,
    name,
    creator,
    updateTime,
    trackIds,
    tracks,
    coverImgUrl = 'https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
    description,
    tags = []
  } = list;
  trackIds = trackIds.map((item: { id: number }) => {
    return item.id;
  });
  const res = await getSongDetail(trackIds.join(','));
  tracks = transformTracks(res.data.songs);
  updateTime = formatTime(updateTime, '{y}-{m}-{d}');
  return {
    id,
    name,
    creator,
    updateTime,
    trackIds,
    tracks,
    cover: `${coverImgUrl}`,
    description,
    tags
  };
}

export function transformTracks(list: []): ISongFormat[] {
  return list.map((item: any) => {
    return TransformTracksSongFormat(item);
  });
}

export function TransformTracksSongFormat(item: any): ISongFormat {
  const artists = [];
  const artistId = item.ar.map((a: { id: any }) => {
    return a.id;
  });
  for (const ar of item.ar) {
    artists.push(ar.name);
  }
  return {
    name: item.name,
    id: item.id,
    artist: artists.join('/'),
    artists: artists,
    artistId: artistId,
    cover: `${item.al.picUrl}`,
    albumName: item.al.name,
    albumId: item.al.id,
    theme: [255, 255, 255],
    songType: 'song',
    key: item.id,
    lrc: ''
  };
}

export async function transformSearchSongTracks(tracks: ISearchSong[]) {
  const ids = tracks.map((item: ISearchSong) => {
    return item.id;
  });
  const res = await getSongDetail(ids.join(','));
  return transformTracks(res.data.songs);
}
