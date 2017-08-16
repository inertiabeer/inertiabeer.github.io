# jsonp实践

	之前一直只是了解jsonp，没有做过例子，对jsonp只是知道了一个大概，幸运的是看到imooc上的王老师的手记，对jsonp有了一个清楚的认识，这篇blog只是为了加深记忆。

* * *

## 首先要对跨域有个清晰的认识，这点就不细说了，网上到处是解释，只要记住，不同域名，不同端口，都是跨域

* * *

你的web程序是不允许跨域请求别的网站的数据的，但是有时候又的确有这种需求，需要在自己的两个web程序上进行数据的传送，那么也就有了jsonp（利于script标签可以跨域）

## 前期准备

* * *

其实只需要有两台web服务器就可以的，我用的是express应用生成器，用的ejs模板引擎，比较容易测试，生成了两个app，一个是jsonptest,端口改成3001，另一个是web，端口是4000，启动两个程序

首先在web的public下面写一个js文件，里面放上代码

`alert('跨域请求script成功')`

在jsonptest目录下的index.ejs中添加了一个script标签，src指向web中的那个js文件，这时候浏览器打开本地的3001端口，就发现成功了（当然这个是肯定成功了，不然都没办法请求cdn的库文件了）

接下来，jsonptest的index.ejs中，定义一个函数myFn(data),然后函数体里面，随便写，只要看到效果就行。在web的js文件中，写一句`myFn('这里面跨域请求的数据')`，然后你就会发现在jsonptest的网页中，数据传进来了，这就是jsonp的基本原理

* * *

## script的src可以是任何文件

 浏览器执行到script的src时，会对src所在的web应用程序发一个get请求，既然是get，那你想到了什么没有，完全可以用后台的web app对这个get请求进行处理，返回一个js语句获取js文件。
 这时候将jsonptest的script的src改为
 `http://localhost:4000/jsonp?callback=myFn`

 对web的app.js进行修改,对/jsonp的get请求进行修改，获取req.query.callback,然后选择自己要传送的数据data。

 `res.send(callback+'('+data+')')`

* * *

## 动态添加script标签

封装一个函数，利用dom api添加script节点即可，传入src参数，既可以跨域获取数据

## 前提是这两个web应用约定好接口

```

	    function myFn(data){
    		alert(data+'hello');
    	}
    	function addjsonp(src)
    	{
    		var script=document.createElement("script");
    		script.setAttribute('src',src);
    		document.body.appendChild(script);
    	}
    	addjsonp('http://localhost:4000/jsonp?callback=myFn')
```
