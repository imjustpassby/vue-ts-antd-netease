import { ResponseLoginStatus } from '@/utils/types';
import axios from 'ts-axios-new';
import mem from 'mem';
interface ILoginParams {
  phone: string;
  password: string;
}

export default class User {
  static async loginCellphone(loginParams: ILoginParams) {
    const res = await axios({
      url: '/api/login/cellphone',
      withCredentials: true,
      params: {
        phone: loginParams.phone,
        password: loginParams.password
      }
    });
    return res;
  }

  static async loginStatus<T>() {
    const res = await axios<ResponseLoginStatus<T>>({
      url: '/api/login/status',
      withCredentials: true
    });
    return res;
  }

  static async logout() {
    const res = await axios({
      url: '/api/logout',
      withCredentials: true
    });
    return res;
  }
}
