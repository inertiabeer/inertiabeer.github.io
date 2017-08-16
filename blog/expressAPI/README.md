`这是很早之前学习express的时候写的，基本上写了几十个express app`

## 首先是顶级函数

```
var express = require('express');
var app = express();
```
在express 4.x中只有一个内置的中间件
就是express.static
*express.static("根目录",[选项])*
根目录就是静态资源所在的根目录。

具体选项可以参考api文档。

```
app.use(express.static('pulbic'));
```
这时候就可以直接通过url访问了
例如http://localhost:3000/images/xxx.jpg

## 应用

```
var express=require('express');
var app=express();
app.get('/',function(req,res)
{
    res.send('hello,world');
}).listen(3000);//打开浏览器输入 localhost:3000即可
```
这个应用有以下四个方法

### http 请求。
例如`
app.get('/index',function(req,res)
{res.send("xxx")});`
这就是一个对get请求的回应。
`app.all('/index',function(req,res)
{console.log('this is a request for index')})` 
这就是对index的所有请求方法中加载中间件。

app.param()我个人的理解是这个中间件就是为了一个查询设立的，例如官网的例子

```
app.param('id', function (req, res, next, id) {
  console.log('CALLED ONLY ONCE');
  next();
})

app.get('/user/:id', function (req, res, next) {
  console.log('although this matches');
  next();
});

app.get('/user/:id', function (req, res) {
  console.log('and this matches too');
  res.end();
});
```
当请求查询id时，这个中间件就会调用，但是这个中间件只会调用一次
结果是

```
CALLED ONLY ONCE
although this matches
and this matches too
```
### app.route(path)
可以通过链式调用对某一路径进行路由，可以节省很多操作。
例如

```
app.route("/index")//返回一个路由对象
.get(function(req,res)//get请求
{  
   res.send("welcome to index");
})
.post(function(req,res)//post请求
{
  console.log("this is a post request");
  res.end();
  })


```
### 渲染方法
app.render是一个生成视图的工具，只负责生成视图。而res.sender()调用了app.render()方法生成视图以后，并发送给客户端。

```
app.render('index', {title: 'res vs app render'}, function(err, html) {
    console.log(html)
});

```
### 模板引擎

默认情况下，express会根据文件的扩展名来require模板引擎.如果你要渲染一个foo.jade,express就会在内部调用
app.engine('jade', require('jade').__express);
### local属性
app.locals对象是一个javascript对象，它的属性就是app的局部变量。

```
var express = require('express');
var app = express();
app.listen(3000);
app.get("/", function(req, res) {
	res.send("hello world");
});
app.set("view engine", 'jade');
console.log('listen in 3000 port');

app.locals.title = 'My App';

app.locals.email = 'me@myapp.com';
console.log(app.locals);
```

llisten in 3000 port
{ settings: 
   { 'x-powered-by': true,
     etag: 'weak',
     'etag fn': [Function: wetag],
     env: 'development',
     'query parser': 'extended',
     'query parser fn': [Function: parseExtendedQueryString],
     'subdomain offset': 2,
     'trust proxy': false,
     'trust proxy fn': [Function: trustNone],
     view: [Function: View],
     views: '/Users/mac01/Desktop/express/views',
     'jsonp callback name': 'callback',
     'view engine': 'jade' },//模板引擎
  title: 'My App',//设置的标题
  email: 'me@myapp.com' }//设置的email
###app.mountpath在父程序中装载子程序

例如

```
var express = require('express');
var app = express();
var admin = express();
admin.get('/', function(req, res) {
	console.log(admin.mountpath);
	res.send('admin homepage');
});
app.use('/admin', admin);
app.listen(3000);
```
在浏览器中输入http://localhost:3000/admin
子应用程序也是express的实例，可用于处理对路由的请求
app.mountpath类似于req对象的baseUrl属性，req.baseUrl返回匹配的URL路径，而不是匹配的模式。

如果子应用程序挂载在多个路径模式上，则app.mountpath将返回其所挂载的路径列表，如以下示例所示。

```
var express = require('express');
var app = express();
var admin = express();

admin.get('/', function(req, res) {
	console.log(admin.mountpath);//['/admin','/manager']
	res.send('Admin Homepage');
})

var secret = express();
secret.get('/', function(req, res) {
	console.log(secret.mountpath);//secret
	res.send('Admin Secret');
});

admin.use('/secret', secret);//挂载secret到admin的secret上
app.use(['/admin', '/manager'], admin);//挂载admin到app的/admin和/manager上
app.listen(3000);
```
### app.on('mount',callback(parent))
这种方法就是给mount添加了一个callback，当子应用程序，被挂载在父应用程序上时，就可以触发这个事件，从而调用callback。
var express = require('express');
var app = express();
var admin = express();
admin.on('mount', function(parent) {
	console.log('admin mounted');
	console.log(parent);//输出app这个对象
		if (parent === app)
		console.log("yes");//验证parent是否是app
});
admin.get('/', function(req, res) {
	res.send('admin homepage');
});
app.use('/admin', admin);//将admin挂载在app上时，发射mount事件。触发回调函数
app.listen(3000);

### app.all("/path",callback,callback,callback)
我个人的理解是all和其他的get，post等方法并没有太大的差异，只是all方法适用于所有的该路径的下的http请求。可以用来给所有的请求都加一个中间件。通常需要使用next(),将请求传递给下一个中间件。
注意如果不是最后一个处理的时候callback的参数里面应该带next
function(req,res,next)



```
var express = require('express');
var app = express();
app.all("/", function(req, res, next) {
	console.log("我是第一个中间件");
	next();

}, function(req, res, next) {
	console.log("我是第二个中间件");
	next();
});
app.get('/', function(req, res) {
	res.send("Hello world")
})
app.listen(3000);
```
当访问http://localhost:3000时，终端上会输出
我是第一个中间件
我是第二个中间件
使用postman发出post请求时，也会输出该消息。 
### app.path()
返回应用程序的规范路径，字符串形式。
例如下面这几个应用程序

```
var express = require('express');
var app = express(),
	blog = express(),
	blogAdmin = express();
app.use('./blog', blog);
blog.use('./admin', blogAdmin);
console.log("app.path:" +app.path());//app.path:
console.log("blog.path:" +blog.path());//blog.path:./blog
console.log("blogAdmin.path:" +blogAdmin.path());//blogAdmin.path:./blog./admin
```
### app.use()
app.use(路径,回调函数);
在路径中加载中间件功能，如果没有指定所选路径时，就默认为"/"路径
这个路由将会匹配所有满足/path和/path/xx的路径
例如例如：app.use（'/ apple'，...）将匹配“/ apple”，“/ apple / images”，“/ apple / images / news”等等。
所以当没有带路径参数时，就会对所有的请求都加载这一个中间件

```
var express = require("express");
var app = express();
var moment = require('moment');//npm install moment这是一个处理时间的模块，可以去官网查看一下，很简单好用
app.use(function(req, res, next) {
	console.log("time:" + moment().format('MMMM Do YYYY, h:mm:ss a'));//time:February 19th 2017, 7:51:12 pm
	next();
});
app.get('/index', function(req, res) {
	res.send("Hello world");//localhost:3000/index
});
app.listen(3000);
```
每一个请求，都会加载该中间件。还可以在路径中使用正则表达式和数组

```
app.use(['/abcd', '/xyza', /\/lmn|\/pqr/], function (req, res, next) {
  next();
})//将会匹配/abcd, /xyza, /lmn, /pqr
app.use(/\/abc|\/xyz/, function (req, res, next) {
  next();
}) //将会匹配/abc and /xyz

```
#### 路由器
我个人理解就是路由器其实就是将直接加载的路由封装成了一个单独的函数。然后通过app.use挂载在某一路径下,

```
var express = require('express');
var app = express();
var router = express.Router();
router.get('/', function(req, res, next) {
	console.log("I'm the router of /");
	next();
});//定义一个路由中间件

app.use('/index', router);//将这个路由加载到/index路径下
app.get('/index', function(req, res) {
	res.send('hello boy');
})//访问localhost:3000/index
app.listen(3000);
```
一个子应用也是一个中间件

```
var express = require('express');
var app = express();
var subApp = express();
subApp.get('/', function(req, res, next) {
	next();
	console.log('the subapp');
}, function(req, res) {
	res.send("I'm the subapp");
});

app.use('/index', subApp);//将子应用挂载到父应用的/index路径
app.listen(3000);//输入localhost:3000/index既可访问
```
添加多个中间件，可以用数组，或者app.use(path,function1,function2,router3,router4,array);
这些都是允许的



```
var express = require('express');
var app = express();

var r1 = express.Router();
r1.get('/', function(req, res, next) {
	console.log('我是第一个中间件');
	next();
})

var r2 = express.Router();
r2.get('/', function(req, res, next) {
	console.log('我是第二个中间件')
	next();
})

app.use("/hello", r1, r2).get("/hello", function(req, res) {
	res.send('HEY GUYS');
}).listen(3000);//终端上输出
我是第一个中间件
我是第二个中间件
```
今天就先写到这里，明天继续



# 第二天

## request
request对象表示HTTP请求，并具有请求查询字符串，参数，主体，HTTP头等属性。 一般我们将request请求称为req（而HTTP response简写为res），其实这些是由之后回调函数的参数决定。
下面这两种写法都是可以的

```
app.get('/user/:id', function(req, res){
  res.send('user ' + req.params.id);
});
```

```
app.get('/user/:id', function(request, response){
  response.send('user ' + request.params.id);
});

```
### req.app
这个属性其实是对express应用程序的一个引用。
你创建一个中间件模块，然后require(),这个中间件就可以通过req.app，来访问你的应用程序的属性。

```
//这里是主程序
var express = require('express');
var app = express();
app.get("/", require("./my.js"));
app.get("/", function(req, res) {
	res.send("<h1>welcome</h1>")
})
app.locals.title = "who's app";
app.listen(3000);
//这里是中间件my.js
module.exports = function(req, res, next) {
	console.log("the app title is " + req.app.locals.title);
	next();
}
老规矩浏览器中输入地址
在终端上输出the app title is who's app

```
### req.baseUrl
一个已经挂载了路由实例的url路径
我个人的理解是将路由挂载在某一路径之后，就可以通过这个方法来访问基础路径

```
var express = require('express');
var app = express();
var router = express.Router();//定义一个路由
router.get('/index', function(req, res) {
	console.log(req.baseUrl);
	res.send('我是greet的index');
});
app.use('/hello', router);//挂载路由到/hello路径上
app.listen(3000);
```
访问localhost:3000/hello/index 这时候控制台会输出/hello
**当你使用了正则表达式来匹配字符时，req.baseUrl并不会返回一个正则表达式，而是返回一个匹配的字符串**
### req.body
包含了请求正文中提交的数据的键值对。 默认情况下，它的值是undefined并且当使用正文解析中间件如body-parser和multer时才会被填充。

```
var app = require('express')();
var bodyParser = require('body-parser');
var multer = require('multer')();

app.use(bodyParser.json()); // for parsing application/json

app.use(bodyParser.urlencoded({
	extended: true
})); // for parsing multipart/form-data
app.use(multer.array());//for parsing multipart/form-data
app.post('/', function(req, res) {
	console.log(req.body);
	res.json(req.body);
})
app.listen(3000);
```
当我使用api文档上的代码时，发现不能运行，因为multer这个模块发生了变化，于是我就进行了修改，这次发送请求时，需要使用chrome上的postman插件，来模拟post请求，比较方便。也比较直观。
需要自己选择给body里面加上数据，然后就会看到json格式的数据
{
  "title": "test",
  "hello": "nihao"
}
### req.cookies
当使用cookie-parser中间件时，这个属性就是一个包含了请求发送的cookies的对象。如果没有cookie，默认为{};
cookie-parser中间件。
需要用安装在当前项目中
npm install cookie-parser

```
var express = require('express')
var cookieParser = require('cookie-parser')

var app = express()
app.use(cookieParser())

app.get('/', function (req, res) {
  // Cookies that have not been signed
  console.log('Cookies: ', req.cookies)

  // Cookies that have been signed
  console.log('Signed Cookies: ', req.signedCookies)
})

app.listen(3000);


```
应用运行时，需要用postman发送带cookie的get请求.因为postman插件默认是不能发送带cookie的请求的，所以需要安装另外一个chrome插件postman interceptor,然后启用interceptor
运行结果
Cookies:  { userpw: '123456', name: '12345123' }
Signed Cookies:  {}
### req.fresh
其实就是查看是否已经缓存过此请求
### req.hostname
之前我一直用的都是localhost:3000

```
var app = require('express')();
app.get('/index', function(req, res) {
	res.send('hello');
	console.log(req.hostname);
}).listen(3000);
```

req.hostname=>localhost
### req.ip
req.ip=>::1这是本地访问的结果
### req.ips
这个和信任代理有关系，暂时没办法实验，所以就先不管了
### req.originalUrl req.params
req.url不是一个原生的Express属性，它是从Node的http模块继承的。
这个属性很像req.url; 但是，它保留原始请求URL，允许你为了达到内部路由的目的自由的重写req.url 例如，app.use（）的“挂载”功能将重写req.url来剥离挂载点。
```
//localhost:3000/index/3
var app = require('express')();
app.get('/index/:id', function(req, res) {
	res.send('hello' + req.params.id);//hello 3
	console.log(req.originalUrl);//    结果是/index/3

}).listen(3000);
```
### req.path
req.path其实就是请求的url的一部分路径
很简单的演示一下

```//localhost:3000/index/users/myname
var app = require('express')();
app.get('/index/users/myname', function(req, res) {
		res.send('<h1>hello</h1>');
		console.log(req.path);//   /index/uses/myname
	})
	.listen(3000);
```
### req.query
一个包含了路由中的所有查询字符串参数的对象，如果没有查询字符串，req.query就是一个空对象{};

```
//localhost:3000/shoes?order=desc&shoe[color]=blue&shoe[type]=converse
var app = require('express')();
app.get('/shoe:order', function(req, res) {
	res.send('hello');
	console.log(req.query.order);//desc
	console.log(req.query.shoe.color);//blue
	console.log(req.query.shoe.type);//converse
}).listen(3000);
```
### req.route
一个字符串，输出当前匹配的路由

```
//localhost:3000/user/3
var app = require('express')();
app.get('/user/:id?', function(req, res) {
	console.log(req.route);
	res.send('hello');
}).listen(3000);
```
终端输出
Route {
  path: '/user/:id?',
  stack: 
   [ Layer {
       handle: [Function],
       name: '<anonymous>',
       params: undefined,
       path: undefined,
       keys: [],
       regexp: /^\/?$/i,
       method: 'get' } ],
  methods: { get: true } }

### req.stale
与req.fresh恰好相反。如果已经缓存过了，就返回一个true
### req.subdomains
请求的域名中的子域数组。
首先要说的是，域名的顺序是从右到左分主次的。
很多网络诈骗就是利用子域名中假冒官网诈骗的。

## Methods
### accept
根据请求的Accept HTTP头字段，检查指定的内容类型是否可接受。 该方法返回最佳匹配，或者如果没有指定的内容类型是可接受的，则返回undefined（在这种情况下，应用程序应该使用406“Not Acceptable”响应）。

类型值可以是单个MIME(多用途互联网邮件扩展类型)类型字符串（诸如“application / json”），诸如“json”的扩展名，逗号分隔的列表或数组。 对于列表或数组，方法返回最佳匹配（如果有的话）。
accept的一些介绍都在https://github.com/jshttp/accepts，to be done
### 好多还没做，不过我觉得这几个太无聊了，果断跳

## response
### res.headersSent
如果响应头已经发送过了，就返回true，未发送就返回false。类型就是boolean
```
var app = require('express')();
app.get('/', function(req, res) {
	console.log(res.headersSent); // false
	res.send('OK');
	console.log(res.headersSent); // true
}).listen(3000);
```
### res.locals
包含响应局部变量的对象，该局部变量的范围为请求，因此仅对在请求/响应周期（如果有）期间呈现的视图可用。 否则，此属性与app.locals相同。

此属性对于显示请求级别信息（如请求路径名称，已验证用户，用户设置等）很有用。
## res   Methods

### res.append
将指定的值附加到HTTP响应头字段。 如果头未设置，则创建具有指定值的头。 value参数可以是字符串或数组。
在res.append（）之后调用res.set（）将重置先前设置的相应头。

```
res.append('Link', ['<http://localhost/>', '<http://localhost:3000/>']);
res.append('Set-Cookie', 'foo=bar; Path=/; HttpOnly');
res.append('Warning', '199 Miscellaneous warning');

```
### res.attachment('文件名')
将HTTP响应头中的Content-Disposition设置为“attachment”。 如果给定了文件名，则它通过res.type（）将会根据文件的扩展名设置Content-Type，并设置Content-Disposition的"filename ="参数。

```
res.attachment();
// Content-Disposition: attachment

res.attachment('path/to/logo.png');
 // Content-Disposition: attachment; filename="logo.png"
 // Content-Type: image/png
```
### res.cookie(name,value,[options])

 - **domin**      String类型,Cookie的域名。 默认为应用程序的域名
 - **expires**      Date类型 ，Cookie的到期日期（GMT）。 如果未指定或设置为0，则创建 session cookie。
 - **httpOnly**   Boolean类型，将cookie标记为只能由Web服务器访问。
 - **maxAge**    String类型，用于设置相对于当前时间的到期时间的方便选项（以毫秒为单位）。
 - **path**  String，Cookie的路径。 默认为“/”。
 - **secure** Boolean, 将Cookie标记为仅在HTTPS协议下使用。
 - **signed**Boolean, 指示Cookie是否应该被签名。
 
所有res.cookie（）都会设置HTTP Set-Cookie头，并提供选项。 未指定的任何选项默认为RFC 6265中规定的值。

```
res.cookie('name', 'tobi', { domain: '.example.com', path: '/admin', secure: true });
res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true });
//你可以传递一个对象作为value参数; 它然后被序列化为JSON并由bodyParser（）中间件解析。
res.cookie('cart', { items: [1,2,3] });
res.cookie('cart', { items: [1,2,3] }, { maxAge: 900000 });
//当使用cookie解析器中间件时，此方法还支持签名的cookie。 只需将signed选项设置为true即可。 然后res.cookie（）将使用传递给cookieParser（secret）的密钥对值进行签名。
res.cookie('name', 'tobi', { signed: true });
```
### res.clearCookie(name)
清除名称指定的cookie，因为这方面还不是很明白，所以就先不写了
### res.download('文件的路径',回调函数)

在路径中将文件作为“附件”传输。 通常，浏览器会提示用户下载。 默认情况下，响应头中Content-Disposition中“filename =”参数是path（这通常出现在浏览器对话框中）。 使用filename参数覆盖此默认值。

当错误发生或传输完成时，该方法调用可选的回调函数fn。 此方法使用res.sendFile（）传输文件。

```
var app = require("express")();
app.get('/', function(req, res) {
	res.download('body.js', function(err) {
		if (err)
			console.log(err);
		else {
			console.log('成功完成')
		}
	});
}).listen(3000);
```
会自动下载此文件，然后调用回调函数
### res.end([data] [, encoding])
结束响应过程。 这个方法实际上来自Node核心，特别是http.ServerResponse的response.end（）方法。

用于快速结束响应而不使用任何数据。 如果您需要使用数据响应，请使用res.send（）和res.json（）等方法。
### res.format(object)
对请求对象（如果存在）上的Accept HTTP头执行内容协商。 它使用req.accepts（）为请求选择处理程序，基于按质量值排序的可接受类型。 如果未指定头，则调用第一个回调。 当没有找到匹配时，服务器以406“不可接受”响应，或调用默认回调。

选择回调时，将设置Content-Type响应头。 但是，您可以使用res.set（）或res.type（）等方法在回调中更改此值。

以下示例将在Accept头字段设置为“application / json”或“* / json”时响应{“message”：“hey”}（但是如果它是“* / *”，则响应将是 "hey"）。

```
res.format({
  'text/plain': function(){
    res.send('hey');
  },

  'text/html': function(){
    res.send('<p>hey</p>');
  },

  'application/json': function(){
    res.send({ message: 'hey' });
  },

  'default': function() {
    // log the request and respond with 406
    res.status(406).send('Not Acceptable');
  }
});
```
### res.get(field)
返回字段指定的HTTP响应头。 匹配不区分大小写。

```
res.get('Content-Type');
// => "text/plain"
```
### res.json([body])
发送JSON响应。 此方法与res.send（）相同，以对象或数组作为参数。 但是，您可以使用它将其他值转换为JSON，例如null和undefined。 （虽然这些是无效的JSON）。

```
res.json(null)
res.json({ user: 'tobi' })
res.status(500).json({ error: 'message' })
```
### res.jsonp([body])
使用JSONP支持发送JSON响应。 此方法与res.json（）相同，除了它支持JSONP回调。

```
app.set('jsonp callback name', 'cb');
res.jsonp({ user: 'tobi' })
// => cb({ "user": "tobi" })

```
### res.links(links)
http响应头的link属性

```
res.links({
  next: 'http://api.example.com/users?page=2',
  last: 'http://api.example.com/users?page=5'
});


```
Link:
 <http://api.example.com/users?page=2>; rel="next", 
 <http://api.example.com/users?page=5>; rel="last"
### res.location与res.redirect
这两种方法都可以进行url的重定向
但是两者有区别

```
var app = require('express')();
app.get('/', function(req, res) {
	res.location('index');
	res.statusCode = 301;//需要手动设置状态码，否则不能成功定向
	res.end();
})
.get('/index', function(req, res) {
	res.send('this is index');
})
.listen(3000);
```
redirect是location的扩展
详情可以查看这篇博客，写的非常详细

http://www.cnblogs.com/duhuo/p/5609127.html

### res.render()
es.render(file,option)是渲染视图，在app.js或者index.js中设置一下渲染引擎，比如html,jade。express就会根据模板引擎自动渲染
### res.send([body])
body参数可以是Buffer对象，String，对象或数组。

```
res.send(new Buffer('whoop'));
res.send({ some: 'json' });
res.send('<p>some html</p>');
res.status(404).send('Sorry, we cannot find that!');
res.status(500).send({ error: 'something blew up' });
```
这个方法根据参数类型可以自动分配响应头
当参数是Buffer对象时，该方法将Content-Type响应头字段设置为“application / octet-stream”
当参数是String时，该方法将Content-Type设置为“text / html”：
当参数是对象或者数组时，该方法会将相应json格式。
### res.sendFile(path [, options] [, fn])
options这些选项就看官网上的表格吧，markdown不知道怎么弄表格方便一点 

```
var app = require('express')();
app.get('/file/:name', function(req, res, next) {
	var options = {
		root: __dirname + '/',//文件的根目录
		dotfiles: 'deny',
		headers: {
			'x-timestamp': Date.now(),
			'x-sent': true
		}
	};
	var fileName = req.params.name;//文件名
	res.sendFile(fileName, options, function(err) {
		if (err) {
			console.log(err);
			res.status(err.status).end();
		} else {
			console.log('sent:', fileName);
		}

	})
}).listen(3000);
```
也可以简单一点
直接发送html文件
res.sendFile('index.html')
### res.sendStatus(statusCode)
将响应HTTP状态代码设置为statusCode，并将其字符串表示形式作为响应正文。

```
res.sendStatus(200); // equivalent to res.status(200).send('OK')
res.sendStatus(403); // equivalent to res.status(403).send('Forbidden')
res.sendStatus(404); // equivalent to res.status(404).send('Not Found')
res.sendStatus(500); // equivalent to res.status(500).send('Internal Server Error')
```
### res.set(field [, value])
将响应的HTTP头字段设置为值。 要一次设置多个字段，请传递一个对象作为参数。

```
res.set('Content-Type', 'text/plain');

res.set({
  'Content-Type': 'text/plain',
  'Content-Length': '123',
  'ETag': '12345'
})
```
### res.type(type)
将Content-Type HTTP头设置为确定的MIME类型。 如果类型包含“/”字符，那么它将Content-Type设置为type。

```
res.type('.html');              // => 'text/html'
res.type('html');               // => 'text/html'
res.type('json');               // => 'application/json'
res.type('application/json');   // => 'application/json'
res.type('png');                // => image/png:

```
就写到这里吧，感觉自己要恶补响应头相关的东西了

