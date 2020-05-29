import axios from '../axios/index';
interface ResponseData<T = any> {
  banners: T;
}
export default class Home {
  static async getBanners<T>() {
    const res = await axios<ResponseData<T>>({
      url: '/api/banner',
      withCredentials: true
    });
    return res;
  }
}
