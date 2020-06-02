export function formatTime(time: number, cFormat: string) {
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
