export interface ISongFormat {
  name: string
  id: number
  artist: string
  artists: string[]
  artistId: number[]
  cover: string
  albumName: string
  albumId: number
  theme: [number, number, number]
  songType: 'dj' | 'song'
  key: number
  pop: number
  duration: string
  url?: string
  lrc?: string
}

export interface IPlaylistFormat {
  id: number
  name: string
  cover: string
  creator: string
  createTime: string
  updateTime: string
  trackIds: number[]
  tracks: ISongFormat[]
  description: string
  tags?: string[]
}

export interface IXgPlayerConfig {
  url: string
  id: string
  width?: number
  height?: number
  fluid?: boolean
  fitVideoSize?: 'fixWidth' | 'fixHeight' | 'auto'
  autoplay?: boolean
  loop?: boolean
  videoInit?: boolean
  poster?: string
  pip?: boolean
  cssFullscreen?: boolean
  screenShot?: boolean
  lang?: 'zh-cn' | 'en' | 'jp'
}

export interface IPageJumpConfig {
  id?: number
  path: string
  cate?: number
}

export interface IProfile {
  userId: number
  nickname: string
  avatarUrl: string
}

export interface ResponseLoginStatus<T = any> {
  profile: T
}

export interface ResponseBanner<T = any> {
  banners: T
}

export interface IBanner {
  targetId: number
  imageUrl: string
  titleColor: string
  typeTitle: string
  targetType: number
  url: string | null
}

export interface ResponsePersonalized<T = any> {
  result: T
}

export interface IPersonalizedPlaylist {
  id: number
  name: string
  picUrl: string
}

export interface ResponsePersonalizedNewSong {
  result: []
}

export interface IPersonalizedMv {
  id: number
  name: string
  picUrl: string
}

export interface IRanking {
  id: number
  name: string
  coverImgUrl: string
}

export interface ResponseRankingList<T = any> {
  code: number
  list: T
}

export interface IPlaylistDetail {
  id: number
  name: string
  creator: any
  updateTime: number
  trackIds: any[]
  tracks: any[]
  coverImgUrl: string
  description: string
  tags: string[]
}

export interface ResponsePlaylist {
  code: number
  playlist: IPlaylistDetail
}

interface ISongDetail {
  [x: number]: any
}

export interface ResponseSongDetail {
  songs: ISongDetail[]
}

export interface ResponseCheckMusic {
  success: boolean
}

export interface ISongUrl {
  id: number
  url: string
}

export interface ResponseSongUrl<T = any> {
  data: T
}

export interface ILrc {
  version: number
  lyric: string
}

export interface ResponseLrc {
  lrc?: ILrc
}

export interface SearchParams {
  keywords: string
  offset?: number
  type: number
  limit?: number
}

export interface ResponseSearch<T = any> {
  result: T
}

export interface ISearchVideo {
  coverUrl: string
  title: string
  vid: string
}

export interface ResponseSearchVideoResult {
  videoCount: number
  videos: ISearchVideo[]
}

export interface ISearchSong {
  id: number
}

export interface ResponseSearchSongResult {
  songCount: number
  songs: ISearchSong[]
}

export interface ISearchPlaylist {
  id: number
  name: string
  coverImgUrl: string
}

export interface ResponseSearchPlaylistResult {
  hasMore: boolean
  playlistCount: number
  playlists: ISearchPlaylist[]
}

export interface ISearchMv {
  id: number
  name: string
  cover: string
}

export interface ResponseSearchMvResult {
  mvCount: number
  mvs: ISearchMv[]
}

export interface ISearchAlbum {
  id: number
  name: string
  picUrl: string
}

export interface ResponseSearchAlbumResult {
  albumCount: number
  albums: ISearchAlbum[]
}

export interface ISearchArtist {
  id: number
  name: string
  img1v1Url: string
}

export interface ResponseSearchArtistResult {
  albumCount: number
  artists: ISearchArtist[]
}

export interface ISearchDjProgram {
  id: number
  name: string
  picUrl: string
}

export interface ResponseSearchDjProgramResult {
  djRadiosCount: number
  djRadios: ISearchDjProgram[]
}

export interface TopPlaylistParams {
  limit: number
  category: string
  offset: number
}

export interface ITopPlaylist {
  id: number
  name: string
  coverImgUrl: string
}

export interface ResponseTopPlaylist {
  total: number
  code: number
  cat: string
  playlists: ITopPlaylist[]
}

export interface IPlaylistCategoryListSub {
  name: string
  category: number
}

export interface IPlaylistCategory {
  [x: string]: string
}

export interface ResponsePlaylistCategoryList {
  sub: IPlaylistCategoryListSub[]
  categories: IPlaylistCategory
}

export interface TopAlbumParams {
  limit: number
  offset: number
}

export interface IAlbum {
  name: string
  id: number
  picUrl: string
}

export interface ResponseNewestAlbum {
  albums: IAlbum[]
}

export interface ArtistByCategoryParams {
  cat?: number
  limit?: number
  offset?: number
  type?: number
  area?: number
}

export interface IArtistByCategory {
  id: number
  name: number
  img1v1Url: string
}

export interface ResponseArtistByCategory {
  artists: IArtistByCategory[]
}

export interface IAlbumFormat {
  id: number
  name: string
  company: string
  cover: string
  description: string
  publishTime: string
  artists: string[]
  tracks: ISongFormat[]
}

export interface IResponseAlbumSongs {
  id: number
}

export interface IResponseAlbumArtist {
  name: string
  id: number
}

export interface IResponseAlbum {
  id: number
  name: string
  company: string
  artists: IResponseAlbumArtist[]
  picUrl: string
  description: string
  publishTime: number
}

export interface ResponseAlbum {
  songs: IResponseAlbumSongs[]
  album: IResponseAlbum
}

export interface IArtist {
  id: number
  name: string
  img1v1Url: string
  musicSize: number
  albumSize: number
  mvSize: number
  briefDesc: string
}

export interface ResponseArtistHotSongs {
  id: number
}

export interface ResponseArtist {
  artist: IArtist
  hotSongs: ResponseArtistHotSongs[]
}

export interface IArtistIntroduction {
  ti: string
  txt: string
}

export interface ResponseArtistDesc {
  introduction: IArtistIntroduction[]
  briefDesc: string
}

export interface ArtistAlbumParams {
  id: number
  limit: number
  offset: number
}

export interface ResponseArtistAlbum {
  hotAlbums: IAlbum[]
}

export interface IArtistMv {
  id: number
  name: number
  imgurl16v9: string
}

export interface ResponseArtistMv {
  mvs: IArtistMv[]
}

export interface IDjCategory {
  id: number
  name: string
  pic56x56Url: string
}

export interface ResponseDjCate {
  categories: IDjCategory[]
}

export interface IDjRecommendByType {
  id: number
  name: string
  picUrl: string
}

export interface ResponseDjRecommendByType {
  djRadios: IDjRecommendByType[]
}

export interface ResponseProgramRecommend {
  programs: [] | IDjProgram[]
}

export interface IDjRadios {
  id: number
  name: string
  picUrl: string
}

export interface ResponseDjRecommend {
  name: string
  djRadios: IDjRadios[]
}

export interface ITodayDj {
  id: number
  name: string
  picUrl: string
}

export interface ResponseTodayDj {
  data: ITodayDj[]
}

export interface ISimilarSong {
  id: number
}

export interface ResponseSimilarSong {
  songs: ISimilarSong[]
}

export interface ISimilarPlaylist {
  id: number
  name: string
  coverImgUrl: string
  playCount: number
}

export interface ResponseSimilarPlaylist {
  playlists: ISimilarPlaylist[]
}

export interface IUser {
  nickname: string
  avatarUrl: string
}

export interface IComment {
  user: IUser
  content: string
  beReplied: IComment
}

export interface ResponseComment {
  hotComments: IComment[]
  comments: IComment[]
}

export interface IDjProfile {
  avatarUrl: string
  nickname: string
  signature: string
}

export interface IDjDetail {
  id: number
  dj: IDjProfile
  name: string
  picUrl: string
  desc: string
  programCount: number
  createTime: number
  category: string
  lastProgramCreateTime: number
}

export interface ResponseDjDetail {
  djRadio: IDjDetail
}

export interface IDjInfoFormat {
  id: number
  djAvatarUrl: string
  djNickname: string
  djSignature: string
  name: string
  picUrl: string
  desc: string
  programCount: number
  createTime: string
  category: string
  lastUpdateTime: string
}

export interface IProgramFormat {
  id: number
  name: string
  listenerCount: number
  description: string
  key: number
}

export interface IDjProgramMainSong {
  id: number
  name: string
}

export interface IDjProgram {
  mainSong: IDjProgramMainSong
  listenerCount: number
  description: string
}

export interface ResponseDjProgram {
  programs: IDjProgram[]
}

export interface IPagination {
  total?: number
  pageSize?: number
  current?: number
}

export interface IDailyRecommendSong {
  id: number
}

export interface ResponseDailyRecommendSong {
  recommend: IDailyRecommendSong[]
}

export interface IResponseUserPlaylistCreator {
  userId: number
}

export interface IResponseUserPlaylist {
  userId: number
  id: number
}

export interface ResponseUserPlaylist {
  playlist: IResponseUserPlaylist[]
}

export interface showPlaylistParams {
  playlist: IResponseUserPlaylist
  type: 'self' | 'other'
}

export interface ResponseMvDetailData {
  id: number
  name: string
  artistId: number
  artistName: string
  cover: string
  playCount: number
  subCount: number
  shareCount: number
  commentCount: number
  publishTime: string
}

export interface ResponseMvDetail {
  data: ResponseMvDetailData
}

export interface ResponseMvUrlData {
  id: number
  url: string
}

export interface ResponseMvUrl {
  data: ResponseMvUrlData
}

export interface ResponseSearchSuggestion {
  result: ISearchSuggestionResult
  code: number
}

export interface ISearchSuggestionResult {
  albums?: ISearchSuggestionAlbum[]
  songs?: ISearchSuggestionSong[]
  artists?: ISearchSuggestionArtist[]
  playlists?: ISearchSuggestionPlaylist[]
  order?: string[]
}

export interface ISearchSuggestionAlbum {
  id: number
  name: string
  artist: ISearchSuggestionSongArtist
  publishTime: number
  size: number
  copyrightId: number
  status: number
  picId: number
  mark: number
}

export interface ISearchSuggestionSongArtist {
  id: number
  name: string
  picUrl: null | string
  alias: string[]
  albumSize: number
  picId: number
  img1v1Url: string
  img1v1: number
  alia?: string[]
  trans: null
}

export interface ISearchSuggestionSong {
  id: number
  name: string
  artists: ISearchSuggestionSongArtist[]
  album: ISearchSuggestionSongAlbum
  duration: number
  copyrightId: number
  status: number
  alias: string[]
  rtype: number
  ftype: number
  mvid: number
  fee: number
  rUrl: null
  mark: number
}

export interface ISearchSuggestionSongAlbum {
  id: number
  name: string
  artist: ISearchSuggestionSongArtist
  publishTime: number
  size: number
  copyrightId: number
  status: number
  picId: number
  alia?: string[]
  mark: number
}

export interface ISearchSuggestionArtist {
  id: number
  name: string
  picUrl: string
  alias: string[]
  albumSize: number
  picId: number
  img1v1Url: string
  img1v1: number
  alia?: string[]
  trans: null | string
  accountId?: number
  transNames?: string[]
}

export interface ISearchSuggestionPlaylist {
  id: number
  name: string
  coverImgUrl: string
  creator: null
  subscribed: boolean
  trackCount: number
  userId: number
  playCount: number
  bookCount: number
  specialType: number
  officialTags: null
  description: string
  highQuality: boolean
}
