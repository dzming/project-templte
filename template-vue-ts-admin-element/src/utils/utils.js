export function preciseStringLength(str) {
  // 通过unicode计算字符串的精确长度
  if (typeof str !== "string") {
    throw Error("Parameters must be a string");
  }
  return str.replace(/([^x00-xff])/g, "rr").length;
}

export function preciseSubstr(s, n) {
  // 精确截断 通过unicode来截断
  return s
    .slice(0, n)
    .replace(/([^x00-xff])/g, "$1a")
    .slice(0, n)
    .replace(/([^x00-xff])a/g, "$1");
}

export function formatSeconds(second_time) {
  // 时间格式化为秒数

  let time = parseInt(second_time) + "秒";
  if (parseInt(second_time) > 60) {
    const second = parseInt(second_time) % 60;
    let min = parseInt(second_time / 60);
    time = min + "分" + second + "秒";

    if (min > 60) {
      min = parseInt(second_time / 60) % 60;
      let hour = parseInt(parseInt(second_time / 60) / 60);
      time = hour + "小时" + min + "分" + second + "秒";

      if (hour > 24) {
        hour = parseInt(parseInt(second_time / 60) / 60) % 24;
        const day = parseInt(parseInt(parseInt(second_time / 60) / 60) / 24);
        time = day + "天" + hour + "小时" + min + "分" + second + "秒";
      }
    }
  }

  return time;
}

// 将科学计数法转换为小数
export function toNonExponential(val) {
  const num = Number.parseFloat(val);
  const m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
  return num.toFixed(Math.max(0, (m[1] || "").length - m[2]));
}
export function filter(val) {
  if (Number.isInteger(val * 1)) {
    return "id";
  }
  if (val.startsWith("bcb")) {
    return "address";
  } else {
    return "name";
  }
}

/**
 * js缓动函数
 * @export
 * @param {Number} currentY
 * @param {Number} targetY
 */
export function scrollAnimation(currentY, targetY) {
  // 计算需要移动的距离
  const needScrollTop = targetY - currentY;
  let _currentY = currentY;
  setTimeout(() => {
    // 一次调用滑动帧数
    const dist = Math.ceil(needScrollTop / 10);
    _currentY += dist;
    window.scrollTo(0, currentY);
    if (needScrollTop > 10 || needScrollTop < -10) {
      scrollAnimation(_currentY, targetY);
    } else {
      window.scrollTo(0, targetY);
    }
  }, 1);
}

/**
 * 跳转到指定锚点
 * @export
 * @param {String} domStr ： DOM('.class' , '#id' ,'div')
 * @returns void;
 */
export function linkto(domStr) {
  if (!domStr) { return; }
  if (!("scrollTo" in window)) {
    location.href = domStr;
    return;
  }
  const dom = document.querySelector(domStr);
  if (
    typeof window.getComputedStyle(document.body).scrollBehavior == "undefined"
  ) {
    // 处理scrollIntoView不支持object浏览器向下兼容处理
    const targetY = dom.offsetTop;
    const currentY =
      document.documentElement.scrollTop || document.body.scrollTop;
    scrollAnimation(currentY, targetY);
    return;
  }
  if (!dom) { return; }
  dom.scrollIntoView({
    // 兼容到IE6
    behavior: "smooth",
    block: "start"
  });
}

export function filterCong(val) {
  return val / 10e8;
}

/**
 * @name 获取url中的转为Obj
 * @param {String} str
 * @returns get_query('?name=jiawei&age=18') => { ?name: "jiawei", age: "18" }
 */
export function get_query(str) {
  // url转obj
  if (!str) {
    str = location.search.substring(1);
  }
  const query_scan = str
    ? JSON.parse(
        '{"' + str.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
        function(key, value) {
          return key === "" ? value : decodeURIComponent(value);
        }
      )
    : {};
  return query_scan;
}

/**
 * @name Obj 转url
 * @param {Object} param
 * @param {String} key
 * @param {Boolean} encode
 * @returns if(param Type is Object) return "&code=111&name=jiawei"
 * @returns urlEncode('jiawei','name') => "&name=jiawei"
 * @returns urlEncode( {name:'jiawei'} ) => "&name=jiawei"
 */
export function urlEncode(param, key, encode) {
  // obj转url
  if (param == null) { return ""; }
  let paramStr = "";
  const t = typeof param;
  if (t == "string" || t == "number" || t == "boolean") {
    paramStr +=
      "&" +
      key +
      "=" +
      (encode == null || encode ? encodeURIComponent(param) : param);
  } else {
    for (const i in param) {
      const k =
        key == null
          ? i
          : key + (param instanceof Array ? "[" + i + "]" : "." + i);
      paramStr += urlEncode(param[i], k, encode);
    }
  }
  return paramStr;
}

/**
 * @name 判断元素是否进入可视区域
 * @returns Boolean
 */
export function isInViewPortOfTwo(el) {
  const viewPortHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;
  const top = el.getBoundingClientRect() && el.getBoundingClientRect().top;
  return top <= viewPortHeight + 100;
}

/**
 * @name 获取浏览器设备信息
 * @returns Object
 */
export function getBrowser() {
  const UA = navigator.userAgent.toLocaleLowerCase() || "";
  const isAndroid = UA.match(/Android/i) ? true : false;
  const isQQ =
    /(iPad|iPhone|iPod).*? (IPad)?QQ\/([\d\.]+)/.test(UA) ||
    /\bV1_AND_SQI?_([\d\.]+)(.*? QQ\/([\d\.]+))?/.test(UA);
  const isIOS = UA.match(/iPhone|iPad|iPod/i) ? true : false;
  const isIpone = UA.indexOf("iphone") > -1 ? true : false;
  const isSafari = /iPhone|iPad|iPod\/([\w.]+).*(safari).*/i.test(UA);
  // 微信
  const isWx = UA.match(/micromessenger/i) ? true : false;
  // 微博
  const isWb = UA.match(/weibo/i) ? true : false;
  const isAndroidChrome =
    (UA.match(/Chrome\/([\d.]+)/) || UA.match(/CriOS\/([\d.]+)/)) &&
    isAndroid &&
    !isQQ;
  // qq空间
  const isQZ = UA.indexOf("Qzone/") !== -1;
  return {
    isAndroid,
    isQQ,
    isIOS,
    isSafari,
    isWx,
    isWb,
    isAndroidChrome,
    isQZ,
    isIpone
  };
}

// fn是我们需要包装的事件回调, delay是时间间隔的阈值
export function throttle(fn, delay) {
  // last为上一次触发回调的时间, timer是定时器
  let last = 0,
    timer = null;
  // 将throttle处理结果当作函数返回
  return function() {
    // 保留调用时的this上下文
    let context = this;
    // 保留调用时传入的参数
    let args = arguments;
    // 记录本次触发回调的时间
    let now = +new Date();

    // 判断上次触发的时间和本次触发的时间差是否小于时间间隔的阈值
    if (now - last < delay) {
      // 如果时间间隔小于我们设定的时间间隔阈值，则为本次触发操作设立一个新的定时器
      clearTimeout(timer);
      timer = setTimeout(function() {
        last = now;
        fn.apply(context, args);
      }, delay);
    } else {
      // 如果时间间隔超出了我们设定的时间间隔阈值，那就不等了，无论如何要反馈给用户一次响应
      last = now;
      fn.apply(context, args);
    }
  };
}

// 设置cookie
export function setCookie(cName, value, expiredays) {
  if (expiredays > 0 && expiredays !== "100") {
    let exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie =
      cName +
      "=" +
      escape(value) +
      // (expiredays == null ? '' : ';expires=' + exdate.toGMTString());
      (expiredays == null ? "" : ";expires=" + exdate.toUTCString());
  }
  if (expiredays === "100") {
    let exdate = new Date("2118-01-01 00:00:00");
    document.cookie =
      cName +
      "=" +
      escape(value) +
      // (expiredays == null ? '' : ';expires=' + exdate.toGMTString());
      (expiredays == null ? "" : ";expires=" + exdate.toUTCString());
  }
}
// 获取cookie
export function getCookie(cName) {
  if (document.cookie.length > 0) {
    let cStart = document.cookie.indexOf(cName + "=");
    if (cStart !== -1) {
      cStart = cStart + cName.length + 1;
      let cEnd = document.cookie.indexOf(";", cStart);
      if (cEnd === -1) cEnd = document.cookie.length;
      return unescape(document.cookie.substring(cStart, cEnd));
    }
  }
  return "";
}
// 删除cookie
export function delCookie(name) {
  let exp = new Date();
  exp.setTime(exp.getTime() - 1);
  let cval = getCookie(name);
  if (cval != null)
    // document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString();
    document.cookie = name + "=" + cval + ";expires=" + exp.toUTCString();
}
//清除cookie
export function clearCookie(name) {
  setCookie(name, "", -1);
}
//获取页面顶部被卷起来的高度
export function getScrollTop() {
  return Math.max(
    //chrome
    document.body.scrollTop,
    //firefox/IE
    document.documentElement.scrollTop
  );
}
//获取页面文档的总高度
export function getDocumentHeight() {
  //现代浏览器（IE9+和其他浏览器）和IE8的document.body.scrollHeight和document.documentElement.scrollHeight都可以
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight
  );
}
//页面浏览器视口的高度
export function getWindowHeight() {
  return document.compatMode === "CSS1Compat"
    ? document.documentElement.clientHeight
    : document.body.clientHeight;
}
// 时间 格式化成 2018-12-12 12:12:00
export function timestampToTime(timestamp, dayMinSecFlag) {
  const date = new Date(timestamp);
  const Y = date.getFullYear() + "-";
  const M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  const D =
    date.getDate() < 10 ? "0" + date.getDate() + " " : date.getDate() + " ";
  const h =
    date.getHours() < 10 ? "0" + date.getHours() + ":" : date.getHours() + ":";
  const m =
    date.getMinutes() < 10
      ? "0" + date.getMinutes() + ":"
      : date.getMinutes() + ":";
  const s =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  if (!dayMinSecFlag) {
    return Y + M + D;
  }
  return Y + M + D + h + m + s;
}