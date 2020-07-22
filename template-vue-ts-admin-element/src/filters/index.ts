import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
dayjs.locale("zh-cn");

export function contentFilter(value: string, length: number) {
  return preciseStringLength(value, "space") > length * 2
    ? preciseSubstr(value, length * 2) + "..."
    : value;
}

export function preciseStringLength(str: string, ignores: string) {
  // 通过unicode计算字符串的精确长度
  // if (typeof str !== 'string') {
  //   throw Error('Parameters must be a string');
  // }
  if (ignores === "space") {
    return str.trim().replace(/[^\x00-\xff]/g, "rr").length;
  } else {
    return str.replace(/[^\x00-\xff]/g, "rr").replace(/\s*/g, "").length;
  }
}
export function preciseSubstr(s: string, n: number) {
  // 精确截断 通过unicode来截断
  return s
    .trim()
    .slice(0, n)
    .replace(/([^x00-xff])/g, "$1a")
    .slice(0, n)
    .replace(/([^x00-xff])a/g, "$1");
}
