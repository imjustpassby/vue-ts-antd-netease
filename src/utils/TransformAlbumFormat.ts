import { getSongDetail } from '@/api/song.ts';
import {
  IAlbumFormat,
  IResponseAlbum,
  IResponseAlbumSongs,
  ISongFormat
} from '@/utils/types/index.ts';
import { transformTracks } from './TransformPlaylistFormat';
import CommonMethod from '@/utils/CommonMethod';
export async function transformAlbumFormat(
  songs: IResponseAlbumSongs[],
  album: IResponseAlbum
): Promise<IAlbumFormat> {
  const {
    id,
    name,
    company,
    artists,
    picUrl,
    description,
    publishTime
  } = album;
  const ars: string[] = [];
  for (const ar of artists) {
    ars.push(ar.name);
  }
  const publishTimeToString = CommonMethod.formatTime(
    publishTime,
    '{y}-{m}-{d}'
  );
  const trackIds = songs.map(song => {
    return song.id;
  });
  const res = await getSongDetail(trackIds.join(','));
  const tracks: ISongFormat[] = transformTracks(res.data.songs);
  return {
    id,
    name,
    company,
    cover: picUrl,
    description,
    artists: ars,
    publishTime: publishTimeToString,
    tracks
  };
}
