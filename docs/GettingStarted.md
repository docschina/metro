---
id: getting-started
title: 快速入门
---

使用 [`npm`](https://www.npmjs.com/) 安装 Metro：

```
npm install --save-dev metro metro-core
```

或者 通过 [`yarn`](https://yarnpkg.com/)：

```
yarn add --dev metro metro-core
```

## 运行 `metro`

你可以通过执行 [CLI](./CLI.md) 或者通过编程的方式调用它。

### 以编程方式运行

首先，通过以下方式引入模块：

```js
const Metro = require('metro');
```

在返回的对象中，给出了几种主要方法：

### 方法 `runMetro(config)`

传给该方法一个配置，返回值为一个 `metro-serve` 。然后，你可以使用 `processRequest` 方法将其绑定到正确的 HTTP(S) 服务器：

```js
'use strict';

const http = require('http');
const Metro = require('metro');

// 我们先从文件系统加载配置
Metro.loadConfig().then(config => {
  const metroBundlerServer = Metro.runMetro(config);

  const httpServer = http.createServer(
    metroBundlerServer.processRequest.bind(metroBundlerServer),
  );

  httpServer.listen(8081);
});
```

为了与 Express 应用程序兼容，当 Metro 构建工具无法处理请求时，processRequest 会调用其第三个参数。这允许你将服务器与现有服务器集成，或者扩展新的服务器：

```js
const httpServer = http.createServer((req, res) => {
  metroBundlerServer.processRequest(req, res, () => {
    // 当 Metro 无法处理请求时
  });
});
```

如果你使用的是 [Express](http://expressjs.com/)，你可以将 `processRequest` 作为中间件传递：

```js
const express = require('express');
const app = express();

app.use(
  metroBundlerServer.processRequest.bind(metroBundlerServer),
);

app.listen(8081);
```

### 方法 `runServer(Config, Options)`

根据传入的配置和选项启动开发服务器。返回一个 server。
我们建议使用 `runMetro` 而不是 `runServer`，`runMetro` 会调用该函数。

#### 选项

* `host (string)`：在哪个 host 运行服务器
* `onReady (Function)`：在服务器准备好为请求提供服务时调用
* `secure (boolean)`：服务器是否运行在 https
* `secureKey (string)`：启用 `secure` 时，用于 `https` 的密钥
* `secureCert (string)`：启用 `secure` 时，用于 `https` 的证书
* `hmrEnabled (boolean)`：是否打开热模块替换。

### 方法 `runBuild(Config, Options)`

给定配置和一组限定于包本身的选项将传递给服务器，构建出一个包。返回值为 Promise，解析为具有两个属性 `code` 和 `map` 的对象。在构建时，这非常有用。

#### 选项

<!-- TODO(ives): Decide whether we need to show this to the user  * `output (boolean)` -->

* `dev (boolean)`：创建构建的开发版本 (`process.env.NODE_ENV = 'development'`)
* `entry (string)`：指定要构建的入口文件
* `onBegin (Function)`：构建开始时调用
* `onComplete (Function)`：构建完成时调用
* `onProgress (Function)`：构建过程中，遇到有关于模块计数/进度的消息时调用
* `minify (boolean)`：Metro 是否应该压缩构建包
* `out (string)`：输出包的路径
* `platform ('web' | 'android' | 'ios')`：如果提供了所支持平台的列表，则选择构建哪个平台的包
* `sourceMap (boolean)`：Metro 是否生成 sourcemap
* `sourceMapUrl (string)`：可以找到 sourcemap 的 URL。它默认会生成与 bundle 相同的 URL，但是将由扩展名 `bundle` 更改为 `.map`。当 `inlineSourceMap` 为 `true` 时，该属性无效

## 可用选项

### 配置

查看有关 [Metro 配置](./Configuration.md)的详细配置选项。

## URL 与 bundle 请求

服务器能够为这些 bundle 提供 assets，bundle 和 sourcemap 。

### 资源

为了请求资源，你可以自由地使用 `require` 方法，就像当它是一个 JS 文件一样。服务器将处理这个特殊的 `require` 函数，并使它们返回该资源的路径。当请求资源时（资源的扩展名，必须在 `assetsExts` 数组中），它通常会按原样提供。

但是，服务器还可以根据平台和请求的大小（当资源为图片时）提供特定的资源文件。指定平台的方式是通过添加后缀（例如 `.ios`）和通过后缀解析（例如 `@2x`）。当使用 `require` 时，这些都会进行默认处理的。

### Bundle

任何 JS 文件都可以作为构建请求的根入口。该文件将在 `projectRoot` 中被查找。将递归引入根入口所包含的所有文件。要请求一个 bundle 的 URL，只需将扩展名从 `.js` 更改为 `.bundle`。构建包的选项作为查询参数传递（参数均为可选）。

* `dev`：是否在开发模式下构建 bundle。将 1：1 映射到 bundle 的 `dev` 设置。通过将 `true` 或者 `false` 作为字符串传递给 URL。
* `platform`：请求构建的平台。可以为 `ios` 或 `android`。将 1：1 映射到 bundle 的 `platform` 设置中。
* `minify`：代码是否进行压缩。将 1：1映射到 bundle 的 `minify` 设置。通过 `true` 或 `false` 作为字符串传递给 URL。
* `excludeSource`：源代码是否应该包含在 sourcemap 中。通过将 `true` 或 `false` 作为字符串传递给 URL。

例如，请求 `http://localhost:8081/foo/bar/baz.bundle?dev=true&platform=ios` 将在开发模式下为 iOS 的 `foo/bar/baz.js` 文件创建一个 bundle。

### Source maps

通过使用与 bundle 相同的 URL 为每个 bundle 构建 sourcemap（因此，与作为根入口的 JS 文件相同）。这仅在 `inlineSourceMap` 设置为 `false` 时有效。你需要加传递给 bundle 的所有选项添加到 sourcemap 的 URL 中；否则，他们就会出现不一致的情况。

## JavaScript 转译器

JavaScript 转译器（`babelTransformerPath`）是操作 JS 代码的地方；用于调用 Babel。转译器可以导出以下两个方法：

### 方法 `transform(module)`

此方法会强制转换代码。接受到的参数对象包含被转换的模块信息（例如它的路径，代码...），返回的对象必须包含 `ast` 的 key，它是转换后代码的 AST 表示形式。默认生成的转译器只需将代码解析为 AST 即可完成最少量的工作：

```js
const babylon = require('@babel/parser');

module.exports.transform = (file: {filename: string, src: string}) => {
  const ast = babylon.parse(code, {sourceType: 'module'});

  return {ast};
};
```

如果你想使用 Babel，可以通过将代码传递给它来完成

```js
const {transformSync} = require('@babel/core');

module.exports.transform = file => {
  return transformSync(file.src, {
    // Babel options...
  });
};
```

### 方法 `getCacheKey()`

可选方法，返回值为转译器的缓存 key 。当使用不同的转译器时，这允许将转变后的文件正确的绑定到转换它的转译器中。该方法的结果必须为 `string` 类型。
