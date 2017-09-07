# react-project
搭建一个webpack-react-es6的环境

首选我们需下载安装Node.js,下载地址：https://nodejs.org/en/ （注意：为了能支持es2015请下载4.0以上版本）

安装了node之后我们还需要npm也就是包管理器，当然新的node已经集成了npm的。所以此步骤可以跳过了

有了npm后，win+r然后输入cmd打开，然后输入命令：
```bash
npm install webpack -g
```
执行命令后我的webpack就全局安装好了，这里提醒一下，在项目文件中我们还需要将webpack写入package.json(局部安装)

项目创建：

在D盘创建我们的项目文件“reactPro”，目录结构如下：



在cmd中定位项目地址，执行命令：

cd D:\reactPro
D:
定位完成后，我们利用npm生成package.json文件，执行命令：
```bash
npm init
```
上面命令执行完成之后我们就生成了一个node项目，接下来就可以安装我们的node模块了

首选安装webpack，执行命令：
```bash
npm install webpack --save-dev
```
然后安装webpack需要的加载器，执行命令：
```bash
npm install babel-loader babel-preset-es2015 babel-preset-react --save-dev
```
加载器这里应该是很重要的一步了，如果没有这几个加载器我们的jsx语法，和es2015语法就会报错（ps：网上很多教程都没有重点提及这几个加载器）
好了有了这几个重要的加载器来编译我们的代码之后，我们还要安装react模块，这样才能开发我们react应用。安装react输入如下命令：
```bash
npm install react react-dom --save-dev
```
文件配置&运行：

前面我们已经创建好了我们的项目文件也安装完了必要的模块，环境已经搭建好了，现在就是万事具备只欠东风啦。
接下来，我们开始配置webpack开发的webpack.config.js文件配置，通过配置这个文件我们告诉webpack如何编译我们的代码，话不多说直接上代码：

```js
var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry: ['webpack/hot/dev-server', path.resolve(__dirname, './app/main.js')],
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};
```
大家可能发现了‘webpack/hot/dev-server‘这句话，没错这就是我们的webpack-dev-server，她允许我们可以把本地项目跑在像nginx那样的web服务器上，更重要的是我们可以在package.json文件内定义scripts，同时修改webpack的配置文件来达到类似BrowserSync（即文件修改能被监听，并自动刷新浏览器）的效果！
    
安装webpack-dev-server执行：
```bash
npm install webpack-dev-server --save-dev
```
在package.json文件中为scripts添加：
```js
"scripts": {
  "build": "webpack",
  "dev": "webpack-dev-server --devtool eval --progress --colors --content-base build"
}
```

最后我们的package.json代码是这样的：
```js
{
  "name": "reactpro1",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "bundle": "babel-node tools/run bundle",
    "build": "webpack",
    "dev": "webpack-dev-server --devtool eval --progress --colors --content-base build"
  },
  "author": "jx",
  "license": "ISC",
  "devDependencies": {
    "babel-core": "^6.8.0",
    "babel-loader": "^6.2.4",
    "babel-preset-es2015": "^6.6.0",
    "babel-preset-react": "^6.5.0",
    "react": "^15.0.2",
    "react-dom": "^15.1.0",
    "webpack": "^1.13.0",
    "webpack-dev-server": "^1.14.1"
  },
  "dependencies": {
    "webpack": "^1.13.0",
    "webpack-dev-server": "^1.14.1"
  },
  "description": ""
}
```

这里有一点提醒大家，package.json中name不能跟我们的模块和项目文件目录同名
index.html变成这样:

```html
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>React Project</title>
</head>
<body>
<script src="http://localhost:8080/webpack-dev-server.js"></script>
<div id="content"></div>
<script src="./bundle.js"></script>
</body>
</html>
```

最后我们这样执行（ps:这一步可以先跳过，写完我们的项目代码后再来执行）：

```bash
npm run dev
```

react&es2015代码编写：

所有东西都齐全了，现在我们就可以开始我们的愉悦的代码编写了
根据webpack.config.js的配置结合我们的文件目录结构，首先是main.js:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/productBox";

ReactDOM.render(<App />, document.getElementById('app'));
```

这里的let就是es2015的东西了，关于更多的如class，module之类的语法可以去这个网站学习，地址：http://es6.ruanyifeng.com/#README
在main.js里我们引入了'./components/productBox.js'这个模块，productBox.js代码如下：

```js
import React, { PureComponent } from 'react';

export default class ProductBox extends PureComponent{
   render () {
       return (
           <div className="product-box-container">
               webpack搭建成功!
           </div>
       )
   }
};
```
到这里，简单的功能代码就完成了，当运行项目后根据webpack.config.js的配置回来build目录下生成bundlie.js文件，我们只需要在build目录下的index.html文件中引入bundle.js就完成我们的整个项目测试代码了.index.html如下：

```html
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>React Project</title>
</head>
<body>
<script src="http://localhost:8080/webpack-dev-server.js"></script>
<div id="content"></div>
<script src="./bundle.js"></script>
</body>
</html>
```
代码开发完成后就要运行我们的项目了，在cmd中执行：
npm run dev
等待编译完成，打开浏览器输入http://localhost:8080/index.html
至此我们的测试项目大功告成！
