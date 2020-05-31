import axios from 'ts-axios-new';
interface ResponseBanner<T = any> {
  banners: T;
}
export default class Home {
  static async getBanners<T>() {
    const res = await axios<ResponseBanner<T>>({
      url: '/api/banner',
      withCredentials: true
    });
    return res;
  }
}
