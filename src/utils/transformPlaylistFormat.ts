import { formatTime } from '@/utils/UtilFunction.ts';
import { getSongDetail } from '@/api/song.ts';
import { IPlaylistFormat } from '@/utils/types/index.ts';
import { ISongFormat } from './types';
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
    coverImgUrl,
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
    cover: `${coverImgUrl}?param=200y200`,
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
    cover: `${item.al.picUrl}?param=200y200`,
    albumName: item.al.name,
    albumId: item.al.id,
    theme: [255, 255, 255],
    songType: 'song',
    key: item.id
  };
}
