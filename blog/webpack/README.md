![整体结构](https://caoqibin.files.wordpress.com/2017/05/e5b18fe5b995e5bfabe785a7-2017-05-15-e4b88be58d887-18-38.png)

这个文章只是记录一下我怎么在webpack中引入react的，虽然看起来很简单，但是自己摸索起来，还是挺不容易的，具有纪念意义

如果之前没有安装过wbepack的话，还需要
`npm install webpack -g`
然后新建一个文件夹，进入文件夹
然后要做的是安装相关包
`npm install --save babel babel-loader babel-preset-react html-webpack-plugin react react-dom`

创建一个dist目录，用来存放我们用webpack生成的文件;

创建一个src文件夹；整体目录如下
![项目目录](https://caoqibin.files.wordpress.com/2017/05/e5b18fe5b995e5bfabe785a7-2017-05-15-e4b88be58d887-35-33.png)

## webpack.config.js

![屏幕快照 2017-05-15 下午7.39.33.png](https://caoqibin.files.wordpress.com/2017/05/e5b18fe5b995e5bfabe785a7-2017-05-15-e4b88be58d887-39-33.png)
定义了入口文件，输出文件，利用html-webpack-plugin插件输出压缩后的html文件。这些就不详细叙述了，今天主要讲的启示就是module里面的，

`loaders: [{
test: /\.js$/,
loader: 'babel-loader',
include: path.join(__dirname + '/src'),
query: {
presets: ['react','es2015']
}
}`

对以.js文件结尾的使用babel进行转码，在preset中一定要记得加上react，不然没办法运行jsx

## 入口文件是script文件夹下的main.js

![屏幕快照 2017-05-15 下午7.46.31.png](https://caoqibin.files.wordpress.com/2017/05/e5b18fe5b995e5bfabe785a7-2017-05-15-e4b88be58d887-46-31.png)

_那个App()还有hello(),是我用来测试写的_

引入react和react-dom,我个人的理解是react的Component来生成虚拟dom上的组件，利用ReactDOM.render()讲虚拟dom加载到dom上