export enum routePath {
  home = '/home',
  playlist = '/playlist',
  artistRecommend = '/artist/recommend',
  artistCategory = '/artist/category',
  newestAlbum = '/newestAlbum',
  rankingList = '/rankingList',
  playlistDetail = '/playlistDetail',
  artistDetail = '/artistDetail',
  albumDetail = '/albumDetail',
  songDetail = '/songDetail',
  djDetail = '/djDetail',
  search = '/search',
  dj = '/dj',
  copyright = '/copyright',
  my = '/my',
  mv = '/mv'
}

export const discoveryPage: string[] = [
  routePath.home,
  routePath.rankingList,
  routePath.playlist,
  routePath.artistRecommend,
  routePath.artistCategory,
  routePath.dj,
  routePath.newestAlbum
]

export const personalPage: string[] = [routePath.my]

export const searchPage: string[] = [routePath.search]
