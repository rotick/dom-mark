# dom-mark
[![NPM version][npm-image]][npm-url] | 
[English documentation](README.md)

[npm-image]: https://img.shields.io/npm/v/@funinps/dom-mark.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/@funinps/dom-mark

将文本或者html作为水印添加到DOM节点中

- 自动计算水印的尺寸和位置
- 仅4kb的mini库
- 支持IE 9以上及所有移动端浏览器
- 可自由定制水印的内容和样式
- MutationObserver监听dom变化并重新渲染水印

## 示例
[ESM](demo/esm.html) | [UMD](demo/umd.html) | [移动端](demo/mobile.html)

![demo](demo/demo.png)

## 安装
```bash
npm i @funinps/dom-mark -S
# 或者
yarn add @funinps/dom-mark
```
如果是直接引入使用，则下载 `dist/dom-mark.js` 到你的项目中:
```html
<script src="/path/to/dom-mark.js"></script>
```

## 用法
```javascript
import DomMark from '@funinps/dom-mark'

const domMark = new DomMark('body', {
  content: '水印', // html,text
  fontSize: 'inherit',
  fontFamily: 'inherit',
  color: 'inherit',
  opacity: .3,
  padding: 20,
  zIndex: 6000,
  minMargin: [40, 20],
  rotate: -15,
  observe: true
})

domMark.render()
```
### 更新水印:
```javascript
domMark.update({
  content: '<img src="/watermark.png" width="60" />'
})
```
**重要提示：如果你需要使用`setInterval` 或 `setTimeout`来调用更新，别忘了`clearInterval` 或 `clearTimeout`，否则可能会导致浏览器崩溃，尤其是本地开发热更新的时候**

### 销毁:
```javascript
domMark.destroy()
```

## API
```javascript
const dm = new DomMark(selector, options)
dm.render()
dm.update(options)
dm.destroy()
```

`selector` 可以是 HTMLElement 对象，或者 document.querySelector 的参数,默认是`body`

### options选项：
| 选项 | 类型 | 默认值 | 简介 |
|:------|:-------|:--------------------------|:----|
| content | String | - | HTML字符串或者文本 |
| fontSize | String | inherit | 字体大小，如：16px,2rem  |
| fontFamily | String | inherit | 字体 |
| color | String | inherit | 字体颜色 |
| opacity | Number | .3 | 透明度, 0~1 |
| padding | Number | 20 | 水印父元素的padding, 单位: px |
| zIndex | Number | 6000 | z-index，水印是定位展示的 |
| minMargin | Array | [40, 20] | [垂直方向, 水平方向], 水印之间的margin 单位: px |
| rotate | Number | -15 | 水印旋转角度 |
| observe | Boolean | true | 监听dom改变重新渲染，防止用户删除水印，此属性仅支持IE 11及以上浏览器  |

## 更新日志
#### v1.1.0 2020/05/17
本地开发热更新时重新渲染水印，MutationObserver仅当变化元素是水印相关元素时才触发重新渲染

## 问题及建议

请开一个 [issue](https://github.com/funinps/dom-mark/issues).

## License

[MIT](LICENSE)