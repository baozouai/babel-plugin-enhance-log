
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

English | [中文](./README-zh_CN.md)
## About

A babel Plugin to add log line, add log argument name


## Options

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

before add plugin：
```ts
const a = 1, b = 2 // line of 1
console.log(a, b, 'c') // line of 2
```

after add plugin：
```ts
const a = 1, b = 2
console.log('line of 2 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀: ', 'a = ', a, 'b = ', b, 'c')
```


## 📦  Install

```sh
pnpm add babel-plugin-enhance-log -D
# or
yarn add babel-plugin-enhance-log -D
# or
npm i babel-plugin-enhance-log -D
```

##  🔨 Usage

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