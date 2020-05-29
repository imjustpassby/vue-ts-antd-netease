interface IPageJumpConfig {
  that: any;
  id: number;
  path: string;
  type?: string;
}
export default class PageJump {
  static pageJump(config: IPageJumpConfig) {
    const { that, id, path, type } = config;
    that.$router.push({
      path: `${path}`,
      query: {
        id,
        type
      }
    });
  }
}
