/**
 * 公用方法类
 */

export default class CommonMethod {
  /**
   * 检测是否是由 {} 或者 new Object() 创建的对象
   *
   * @param value
   */
  static isObject(value: any) {
    return Object.prototype.toString.call(value) === '[object Object]';
  }

  /**
   * 检测是否是数组
   *
   * @param value
   */
  static isArray(value: any) {
    // return Object.prototype.toString.call(value) === '[object Array]';
    return Array.isArray(value);
  }

  /**
   * 检测是否是纯数字
   * NaN 的类型是 number，值是 NaN
   *
   * @param value
   */
  static isNumber(value: any) {
    return typeof value === 'number' && !Number.isNaN(value);
  }

  /**
   * 检测是否是空值、空数组、空对象
   *
   * @param value
   */
  static isNull(value: any) {
    if (value === null || value === undefined || value === '') {
      return true;
    } else if (this.isArray(value) && value.length === 0) {
      return true;
    } else if (this.isObject(value) && Object.keys(value).length === 0) {
      return true;
    }
    return false;
  }

  static formatTime(time: number, cFormat: string) {
    if (arguments.length === 0) {
      return null;
    }
    if (`${time}`.length === 10) {
      time = Number(time) * 1000;
    }

    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
    let date: Date;
    if (typeof time === 'object') {
      date = time;
    } else {
      date = new Date(time);
    }

    interface formatObj {
      y: number;
      m: number;
      d: number;
      h: number;
      i: number;
      s: number;
      a: number;
      [propName: string]: any;
    }

    const formatInstance: formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    };
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
      let value = formatInstance[key];
      if (key === 'a') {
        return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
      }
      if (result.length > 0 && value < 10) {
        value = `0${value}`;
      }
      return value || 0;
    });
    return time_str;
  }
}
