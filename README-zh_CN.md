
<p align="center">
<h1 align="center">babel-plugin-enhance-log</h1>
</p>

<div align="center">

[![NPM version][npm-image]][npm-url] ![NPM downloads][download-image]

![Test][test-badge] ![codecov][codecov-badge]


[npm-image]: https://img.shields.io/npm/v/babel-plugin-enhance-log.svg?style=flat-square
[npm-url]: http://npmjs.org/package/babel-plugin-enhance-log


[download-image]: https://img.shields.io/npm/dm/babel-plugin-enhance-log.svg?style=flat-square



[test-badge]: https://github.com/baozouai/babel-plugin-enhance-log/actions/workflows/ci.yml/badge.svg

[codecov-badge]: https://codecov.io/github/baozouai/plugin-babel-plugin-enhance-log/branch/master/graph/badge.svg


</div>


中文 | [英文](./README.md)

## 关于

一个用来为console.log添加代码行数，log参数名的插件

## 参数

```ts
interface BabelPluginEnhanceLogOptions {
  /**
   * tip of start argument default 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
   * @example
   * console.log('line of 1 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀', ...)
   */
  preTip?: string
}
```

eg:

没加插件前：
```ts
const a = 1, b = 2 // line of 1
console.log(a, b, 'c') // line of 2
```

加插件后：
```ts
const a = 1, b = 2
console.log('line of 2 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀: ', 'a = ', a, 'b = ', b, 'c')
```


## 📦  安装

```sh
pnpm add babel-plugin-enhance-log -D
# or
yarn add babel-plugin-enhance-log -D
# or
npm i babel-plugin-enhance-log -D
```

 ## 🔨 使用

```js


// babel.config.js

module.exports = {

  plugins: [
    ['enhance-log', {  
      preTip: '🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀' // default 
    }]
  ],
}
```
## 📄 License

babel-plugin-enhance-log is [MIT licensed](./LICENSE).