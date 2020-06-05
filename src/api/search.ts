import { SearchParams } from '@/utils/types';
import request from '@/utils/Request';

/*  type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 
    100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 
    1009: 电台, 1014: 视频, 1018:综合
*/
export function searchByKeywordAndType<T>({
  keywords,
  limit = 100,
  offset = 0,
  type
}: SearchParams) {
  return request<T>({
    url: '/api/search',
    params: {
      keywords: keywords,
      limit: limit,
      offset: offset,
      type: type
    }
  });
}
