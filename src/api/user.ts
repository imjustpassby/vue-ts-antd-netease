import { ResponseLoginStatus } from '@/utils/types';
import request from '@/utils/request.ts';
interface ILoginParams {
  phone: string;
  password: string;
}

export default class User {
  static async loginCellphone(loginParams: ILoginParams) {
    const res = await request({
      url: '/api/login/cellphone',
      params: {
        _t: Number(Date.now()),
        phone: loginParams.phone,
        password: loginParams.password
      }
    });
    return res;
  }

  static async loginStatus<T>() {
    const res = await request<ResponseLoginStatus<T>>({
      url: '/api/login/status',
      params: {
        _t: Number(Date.now())
      }
    });
    return res;
  }

  static async logout() {
    const res = await request({
      url: '/api/logout',
      params: {
        _t: Number(Date.now())
      }
    });
    return res;
  }
}