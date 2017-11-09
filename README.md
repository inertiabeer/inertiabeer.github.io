# inertiabeer.github.io
`这是关于我的一个简介网页`
## 个人简历地址

[简历](https://inertiabeer.github.io/resume.html)

[Github](https://github.com/inertiabeer)

[GitPage](https://inertiabeer.github.io/gitpage.html)

## 项目预览

[地图要素查询修改](http://139.199.197.107:4000/)

需要申请账户，可以使用密码和账户都是１２３的登录，小钉子可以拖拽，左箭头第一次点击是左边收起，第二次是重新显示
上箭头是收起，下箭头是显示，可以实现上传图片，除了底图之外，城市点等都是直接从数据库中获得，大部分功能是原生的ａｊａｘ请求
后面添加的一些功能用的是jquery。可以拖放geojson文件到地图上，即可直接展示。

[移动端热点信息上传](https://github.com/inertiabeer/dayily/)

这个调用了高德地图的ａｐｉ，实现了热点信息的上传查询分析功能.数据存在mongo数据库中.

[react聊天室](http://139.199.197.107/)

前端界面使用了react，后台是express，利用了webpack+eslint+babel，消息主要是通过socket.io进行交互。
直接enter发送消息，也可以点击小箭头，
头像表情是为了后续的可以发送表情包留下的。暂时还没有做好，打算使用font-icon
点击左侧的聊天室名即可进入到聊天室中。也可以自己添加聊天室，输入聊天室名直接enter

做了移动端适配
实现简单的左划添加进入聊天室，右划显示聊天室内用户。

部署在AWS上，时间是统一使用的服务器时间,这个项目可能会因为网络问题访问的比较慢。

## 博客列表

[阿里云主机上搭建webgis应用](/blog/aliCloud/)

[express api学习](/blog/expressAPI/)

[JsonP实践](/blog/jsonp/)

[Chrome devtools](/blog/devtools/)




