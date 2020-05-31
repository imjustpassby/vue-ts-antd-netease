export interface IProfile {
  userId: number;
  nickname: string;
  avatarUrl: string;
}

export interface ResponseLoginStatus<T = any> {
  code: number;
  profile: T;
}
