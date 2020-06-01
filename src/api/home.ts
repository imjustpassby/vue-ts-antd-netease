import {
  ResponseBanner,
  ResponsePersonalizedNewSong,
  ResponsePersonalizedPlaylist
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
    return request<ResponsePersonalizedPlaylist<T>>({
      url: '/api/personalized',
      withCredentials: true
    });
  }

  static async getPersonalizedNewSong() {
    return request<ResponsePersonalizedNewSong>({
      url: '/api/personalized/newsong',
      withCredentials: true
    });
  }
}
