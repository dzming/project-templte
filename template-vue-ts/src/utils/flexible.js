/* eslint-disable */
(function(designWidth, maxWidth, maxFontSize) {
  var doc = document;
  var win = window;
  var docEl = doc.documentElement;
  var remStyle = document.createElement("style");
  var tid;

  function refreshRem() {
    var width = docEl.getBoundingClientRect().width;
    maxWidth = maxWidth || 750;

    if (width > maxWidth) {
      maxFontSize = maxFontSize || 100;
      remStyle.innerHTML = "html{font-size:" + maxFontSize + "px;}";
      width = maxWidth;
      docEl.style.fontSize = `${maxFontSize}px`;
      return;
    }
    var rem = (width * 100) / designWidth;
    remStyle.innerHTML = "html{font-size:" + rem + "px;}";
    docEl.style.fontSize = `${rem}px`;
  }

  if (docEl.firstElementChild) {
    docEl.firstElementChild.appendChild(remStyle);
  } else {
    var wrap = doc.createElement("div");
    wrap.appendChild(remStyle);
    doc.write(wrap.innerHTML);
    wrap = null;
  }
  // 要等 wiewport 设置好后才能执行 refreshRem，不然 refreshRem 会执行2次；
  refreshRem();

  win.addEventListener(
    "resize",
    function() {
      clearTimeout(tid); // 防止执行两次
      tid = setTimeout(refreshRem, 300);
    },
    false,
  );

  win.addEventListener(
    "pageshow",
    function(e) {
      if (e.persisted) {
        // 浏览器后退的时候重新计算
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
      }
    },
    false,
  );

  if (doc.readyState === "complete") {
    doc.body.style.fontSize = "16px";
  } else {
    doc.addEventListener(
      "DOMContentLoaded",
      function(e) {
        doc.body.style.fontSize = "16px";
      },
      false,
    );
  }
})(750, 750);
