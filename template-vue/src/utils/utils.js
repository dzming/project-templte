/* eslint-disable */
// 节流
export function throttle(fn, eapTime) {
  let _lastTime = null;

  return function () {
    let _nowTime = +new Date();
    if (_nowTime - _lastTime > eapTime || !_lastTime) {
      fn();
      _lastTime = _nowTime;
    }
  };
}

// 防抖
export function debounce(fn, wait) {
  var timer = null;
  return function () {
    var context = this;
    var args = arguments;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, wait);
  };
}

// 通过unicode计算字符串的精确长度
export function preciseStringLength(str) {
  if (typeof str !== 'string') {
    throw Error('Parameters must be a string');
  }
  return str.replace(/([^x00-xff])/g, 'rr').length;
}

// 精确截断 通过unicode来截断
export function preciseSubstr(s, n) {
  return s
    .slice(0, n)
    .replace(/([^x00-xff])/g, '$1a')
    .slice(0, n)
    .replace(/([^x00-xff])a/g, '$1');
}

//时间格式化为秒数
export function formatSeconds(second_time) {
  var time = parseInt(second_time) + '秒';
  if (parseInt(second_time) > 60) {
    var second = parseInt(second_time) % 60;
    var min = parseInt(second_time / 60);
    time = min + '分' + second + '秒';

    if (min > 60) {
      min = parseInt(second_time / 60) % 60;
      var hour = parseInt(parseInt(second_time / 60) / 60);
      time = hour + '小时' + min + '分' + second + '秒';

      if (hour > 24) {
        hour = parseInt(parseInt(second_time / 60) / 60) % 24;
        var day = parseInt(parseInt(parseInt(second_time / 60) / 60) / 24);
        time = day + '天' + hour + '小时' + min + '分' + second + '秒';
      }
    }
  }

  return time;
}

//将科学计数法转换为小数
export function toNonExponential(val) {
  let num = Number.parseFloat(val);
  var m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
  return num.toFixed(Math.max(0, (m[1] || '').length - m[2]));
}
export function filter(val) {
  if (Number.isInteger(val * 1)) {
    return 'id';
  }
  if (val.startsWith('bcb')) {
    return 'address';
  } else {
    return 'name';
  }
}

// 缓动动画函数
export function scrollAnimation(currentY, targetY) {
  // 计算需要移动的距离
  let needScrollTop = targetY - currentY;
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

// 跳转到指定锚点
export function linkto(domStr) {
  if (!domStr) return;
  if (!('scrollTo' in window)) {
    location.href = domStr;
    return;
  }
  let dom = document.querySelector(domStr);
  if (
    typeof window.getComputedStyle(document.body).scrollBehavior == 'undefined'
  ) {
    // 处理scrollIntoView不支持object浏览器向下兼容处理
    let targetY = dom.offsetTop;
    const currentY =
      document.documentElement.scrollTop || document.body.scrollTop;
    scrollAnimation(currentY, targetY);
    return;
  }
  dom.scrollIntoView({
    // 兼容到IE6
    behavior: 'smooth',
    block: 'start',
  });
}

export function filterCong(val) {
  return val / 10e8;
}

// 获取url中query的转为object
export function get_query(str) {
  // url转obj
  if (!str) {
    str = location.search.substring(1);
  }
  let query_scan = str
    ? JSON.parse(
        '{"' + str.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
        function (key, value) {
          return key === '' ? value : decodeURIComponent(value);
        },
      )
    : {};
  return query_scan;
}

// object 转化为url string
export function urlEncode(param, key, encode) {
  // obj转url
  if (param == null) return '';
  var paramStr = '';
  var t = typeof param;
  if (t == 'string' || t == 'number' || t == 'boolean') {
    paramStr +=
      '&' +
      key +
      '=' +
      (encode == null || encode ? encodeURIComponent(param) : param);
  } else {
    for (var i in param) {
      var k =
        key == null
          ? i
          : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
      paramStr += urlEncode(param[i], k, encode);
    }
  }
  return paramStr;
}

// 获取浏览器设备信息
export function getBrowser() {
  const UA = navigator.userAgent.toLocaleLowerCase() || '';
  const isAndroid = UA.match(/Android/i) ? true : false;
  const isQQ =
    /(iPad|iPhone|iPod).*? (IPad)?QQ\/([\d\.]+)/.test(UA) ||
    /\bV1_AND_SQI?_([\d\.]+)(.*? QQ\/([\d\.]+))?/.test(UA);
  const isIOS = UA.match(/iPhone|iPad|iPod/i) ? true : false;
  const isIpone = UA.indexOf('iphone') > -1 ? true : false;
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
  const isQZ = UA.indexOf('Qzone/') !== -1;
  const isPc = !/Android|webOS|iPhone|iPod|iPad|BlackBerry/i.test(UA);
  return {
    isAndroid,
    isQQ,
    isIOS,
    isSafari,
    isWx,
    isWb,
    isAndroidChrome,
    isQZ,
    isIpone,
    isPc,
  };
}
