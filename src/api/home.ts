import {
  ResponseBanner,
  ResponsePersonalized,
  ResponsePersonalizedNewSong
} from '@/utils/types';
import request from '@/utils/request.ts';

export default class Home {
  static async getBanners<T>() {
    return request<ResponseBanner<T>>({
      url: '/api/banner',
      withCredentials: true
    });
  }

  static async getPersonalizedPlaylist<T>() {
    return request<ResponsePersonalized<T>>({
      url: '/api/personalized'
    });
  }

  static async getPersonalizedNewSong() {
    return request<ResponsePersonalizedNewSong>({
      url: '/api/personalized/newsong'
    });
  }

  static async getPersonalizedMv<T>() {
    return request<ResponsePersonalized<T>>({
      url: '/api/personalized/mv'
    });
  }
}
