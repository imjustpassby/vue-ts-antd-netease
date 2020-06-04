import { ResponseSongDetail } from '@/utils/types/index.ts';
import mem from 'mem';
import request from '@/utils/Request';

export const getSongDetail = mem(
  function(ids: string) {
    return request<ResponseSongDetail>({
      url: '/api/song/detail',
      params: {
        ids: ids
      }
    });
  },
  {
    maxAge: 1000 * 60 * 60
  }
);
