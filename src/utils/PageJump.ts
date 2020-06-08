interface IPageJumpConfig {
  that: any;
  id?: number;
  path: string;
  type?: string;
  cate?: number;
}
export default class PageJump {
  static pageJump(config: IPageJumpConfig) {
    const { that, id, path, type, cate } = config;
    that.$router.push({
      path: `${path}`,
      query: {
        id,
        type,
        cate
      }
    });
  }
}
