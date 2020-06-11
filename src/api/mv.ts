import {
  ResponseComment,
  ResponseMvDetail,
  ResponseMvUrl
} from '@/utils/types';
import request from '@/utils/Request';
/* 获取mv地址 */
export function getMvUrl(id: number) {
  return request<ResponseMvUrl>({
    url: '/api/mv/url',
    params: {
      id
    }
  });
}

/* 获取MV详情 */
export function getMvDetail(id: number) {
  return request<ResponseMvDetail>({
    url: '/api/mv/detail',
    params: {
      mvid: id
    }
  });
}

/* 获取mv评论 */
export function getCommentMv(id: number) {
  return request<ResponseComment>({
    url: '/api/comment/mv',
    params: {
      id,
      limit: 20,
      offset: 0
    }
  });
}

/* 获取视频地址 */
export function getVideoUrl(id: number) {
  return request({
    url: '/api/video/url',
    params: {
      id
    }
  });
}

/* 获取视频详情 */
export function getVideoDetail(id: number) {
  return request({
    url: '/api/video/detail',
    params: {
      id
    }
  });
}

/* 获取视频评论 */
export function getCommentVideo(id: number) {
  return request({
    url: '/api/comment/video',
    params: {
      id,
      limit: 20,
      offset: 0
    }
  });
}
