import { ResponseComment } from '@/utils/types';
import request from '@/utils/Request';

type commentParams = {
  type: number;
  id: number;
  content: string;
};

/* 歌曲评论 */
export function getCommentMusic(id: number) {
  return request<ResponseComment>({
    url: '/api/comment/music',
    params: {
      id,
      limit: 30
    }
  });
}

/* 写评论 
t: 
  1: 发送
  2: 回复
type: 
  0: 歌曲
  1: mv
  2: 歌单
  3: 专辑
  4: 电台
  5: 视频
  6: 动态
*/
export function sendComment({ type, id, content = '赞' }: commentParams) {
  return request({
    url: '/api/comment',
    params: {
      t: 1,
      type: type,
      id: id,
      content: content
    }
  });
}
