### 1.Getting started: layout

:tada: :100:

<!-- table of Contents -->

[[toc]]

::: tip
Corresponding SLAPP library scheme: m2
:::

> Corresponding SLAPP library scheme: m2

```js
// ios
window.webkit.messageHandlers.JSToNative_iOS.postMessage({
  method: "updateNickName", // Method name
  nickName: "xxx", // nickname
  callback: "xxx", // Success callback method name
  failCallback: "xxx", // Failure callback method name
});

// andriod
window.JSToNative.postMessage(
  JSON.stringify({
    method: "updateNickName", // Method name
    nickName: "xxx", // nickname
    callback: "xxx", // Success callback method name
    failCallback: "xxx", // Failure callback method name
  }),
);
```

<!-- Now, let's try it :point_right: -->
