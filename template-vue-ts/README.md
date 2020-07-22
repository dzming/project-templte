# vue-typescript-admin-template

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn run serve
yarn run release
yarn run build
```

### VSCODE 代码片段

载入 ：
复制 vscode.json 的内容 到 首选项 => 用户代码片段 新建 tsvue.code-snippets 代码片段文件 黏贴进去。
使用 ：
.vue 文件中打开命令面板（ 查看 => 命令面板 ）, 直接输入 vue 有个智能提示 TypeScript Vue Template 全局代码片段。

### Tips:

- 图片自动压缩功能因远程依赖包不稳定暂时不可用

```config/index.json
"openImgMini": false; // 如需开启请install 相应依赖包
yarn add imagemin imagemin-jpegtran img-loader imagemin-pngquant --dev
```
