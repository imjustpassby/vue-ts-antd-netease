import {
  ResponseDjCate,
  ResponseDjRecommend,
  ResponseDjRecommendByType,
  ResponseProgramRecommend,
  ResponseTodayDj
} from '@/utils/types';
import mem from 'mem';
import request from '@/utils/Request';

/* 电台推荐 */
export const getDjRecommend = mem(
  function() {
    return request<ResponseDjRecommend>({
      url: '/api/dj/recommend'
    });
  },
  {
    maxAge: 1000 * 60 * 60
  }
);
/* 推荐节目 */
export const getProgramRecommend = mem(
  function() {
    return request<ResponseProgramRecommend>({
      url: '/api/program/recommend'
    });
  },
  {
    maxAge: 1000 * 60 * 60
  }
);
/* 电台分类 */
export const getDjCateList = mem(
  function() {
    return request<ResponseDjCate>({
      url: '/api/dj/catelist'
    });
  },
  {
    maxAge: 1000 * 60 * 60
  }
);
/* 电台分类推荐 */
export const getDjRecommendByType = mem(
  function(id: number) {
    return request<ResponseDjRecommendByType>({
      url: '/api/dj/recommend/type',
      params: {
        type: id
      }
    });
  },
  {
    maxAge: 1000 * 60 * 60
  }
);
/* 今日电台推荐 */
export const getTodayDj = mem(
  function() {
    return request<ResponseTodayDj>({
      url: '/api/dj/today/perfered'
    });
  },
  {
    maxAge: 1000 * 60 * 60
  }
);
/* 电台详情 */
export const getDjDetail = mem(
  function(id: number) {
    return request({
      url: '/api/dj/detail',
      params: {
        rid: id
      }
    });
  },
  {
    maxAge: 1000 * 60 * 60
  }
);
/* 电台节目 */
export const getDjProgram = mem(
  function(data: { id: any; limit: any }) {
    return request({
      url: '/api/dj/program',
      params: {
        rid: data.id,
        limit: data.limit
      }
    });
  },
  {
    maxAge: 1000 * 60 * 60
  }
);
