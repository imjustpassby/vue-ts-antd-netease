# vue-typescript 封装 axios 及用例

- 安装依赖 ts-axios-new
- utils 目录建立 request.ts

```typescript
import axios, { AxiosError, AxiosResponse } from 'axios';
import store from '@/store';
const request = axios.create({
  baseURL:'http://localhost:9001'
});

request.interceptors.request.use(config => {
  config.params = {
    _t: Number(new Date())
  };
  config.withCredentials = true;
  if (store.state.user.loginSuccess === 'true')
    // ...
  }
  return config;
});

request.interceptors.response.use(
  (res: AxiosResponse) => {
    if (store.state.user.loginSuccess === 'true') {
      // ...
    }
    return Promise.resolve(res);
  },
  (err: AxiosError) => {
    console.log(err);
    return Promise.reject(err);
  }
);

export default request.request;

```

- src 目录建立 api 文件夹

```typescript
// src/api/user.ts
import request from '@/utils/request.ts'
interface ILoginParams {
  phone: string
  password: string
}
type ResponseLoginStatus<T = any> = {
  profile: T
}
export default class User {
  static async loginCellphone(loginParams: ILoginParams) {
    const res = await request({
      url: '/api/login/cellphone',
      params: {
        phone: loginParams.phone,
        password: loginParams.password
      }
    })
    return res
  }
  // 可以根据接口返回数据，定义好response的类型，即res.data里的类型，访问res.data.profile不会报错并且有提示
  static async loginStatus<T>() {
    const res = await request<ResponseLoginStatus<T>>({
      url: '/api/login/status'
    })
    return res
  }
}
```
