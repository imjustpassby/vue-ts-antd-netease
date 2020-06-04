import {
  ResponseBanner,
  ResponsePersonalized,
  ResponsePersonalizedNewSong
} from '@/utils/types';
import mem from 'mem';
import request from '@/utils/Request';

export const getBanners = mem(
  function<T>() {
    return request<ResponseBanner<T>>({
      url: '/api/banner'
    });
  },
  {
    maxAge: 1000 * 60 * 15
  }
);

export const getPersonalizedPlaylist = mem(
  function<T>() {
    return request<ResponsePersonalized<T>>({
      url: '/api/personalized'
    });
  },
  {
    maxAge: 1000 * 60 * 15
  }
);

export const getPersonalizedNewSong = mem(
  function<T>() {
    return request<ResponsePersonalizedNewSong>({
      url: '/api/personalized/newsong'
    });
  },
  {
    maxAge: 1000 * 60 * 15
  }
);

export const getPersonalizedMv = mem(
  function<T>() {
    return request<ResponsePersonalized<T>>({
      url: '/api/personalized/mv'
    });
  },
  {
    maxAge: 1000 * 60 * 15
  }
);

export const getPersonalizedDjProgram = mem(
  function<T>() {
    return request<ResponsePersonalized>({
      url: '/api/personalized/djprogram'
    });
  },
  {
    maxAge: 1000 * 60 * 15
  }
);
