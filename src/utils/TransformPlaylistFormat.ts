import { getSongDetail } from '@/api/song.ts'
import { IPlaylistFormat, ISearchSong, ISongFormat } from './types'
import CommonMethod from '@/utils/CommonMethod'
export async function transformResponsePlaylist(
  list: any
): Promise<IPlaylistFormat> {
  let {
    id,
    name,
    creator,
    createTime,
    updateTime,
    trackIds,
    tracks,
    coverImgUrl = 'https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
    description,
    tags = []
  } = list
  trackIds = trackIds.map((item: { id: number }) => {
    return item.id
  })
  tracks = await transformTracks(trackIds)
  createTime = CommonMethod.formatTime(createTime, '{y}-{m}-{d}')
  updateTime = CommonMethod.formatTime(updateTime, '{y}-{m}-{d}')
  return {
    id,
    name,
    creator,
    createTime,
    updateTime,
    trackIds,
    tracks,
    cover: `${coverImgUrl}`,
    description,
    tags
  }
}

export async function transformTracks(ids: number[]): Promise<ISongFormat[]> {
  const res = await getSongDetail(ids.join(','))
  return res.data.songs.map((item: any) => {
    return TransformTracksSongFormat(item)
  })
}

export function TransformTracksSongFormat(item: any): ISongFormat {
  const artists = []
  const artistId = item.ar.map((a: { id: any }) => {
    return a.id
  })
  for (const ar of item.ar) {
    artists.push(ar.name)
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
    theme: [
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255)
    ],
    songType: 'song',
    key: item.id,
    lrc: '',
    pop: item.pop,
    duration: CommonMethod.getDuration(item.dt)
  }
}

export async function transformSearchSongTracks(tracks: ISearchSong[]) {
  const ids = tracks.map((item: ISearchSong) => {
    return item.id
  })
  return await transformTracks(ids)
}
