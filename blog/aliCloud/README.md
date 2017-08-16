`这是当时给同学们做的科普贴`
## 阿里云主机
首先要说的是，云主机其实就是你的远程电脑，如果之前用过远程桌面的，应该是可以直接上手的，因为之前写过腾讯云的，就写一下阿里云的，因为同学们用的还是蛮多的
申请一个学生优惠，用什么环境无所谓，之后我们会改成windows2016的
![云翼计划](http://img.blog.csdn.net/20170613093632397?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaW5lcnRpYXBlZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
#### 可能会要求学生认证，填完之后，点击控制台
#### 然后选择自己的云主机
![这里写图片描述](http://img.blog.csdn.net/20170613094338322?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaW5lcnRpYXBlZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
首先需要关机》》然后在更多里面选择更换系统盘，选择安装windows server的2016数据中心版本（因为这个操作系统和win10很像）,设置密码，一会登录的时候用.
### 设置安全组
因为阿里会因为安全问题，帮你封端口，但是咱们发布服务的时候，很多端口其实都需要暴露出来（有安全问题），选择更多中的，安全组配置，然后点击配置安全组规则。
把默认的删除，然后重新配置。如下图
![这里写图片描述](http://img.blog.csdn.net/20170613100525350?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaW5lcnRpYXBlZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

### 登录云主机
首先要明白需要安装什么，geoserver postgresql（需要postgis插件）代码编辑器
第一个装一个浏览器，因为我不喜欢ie（ie的作用就是装一个chrome）
你可以选择装你自己喜欢的浏览器。
安装好浏览器之后，搜索postgresql,去官网下载，进入官网之后，点击download，
选择自己的系统，然后会有两个选项，记得选第一个。
接下来会选择版本，选windows64位，版本随便选
等待下载完成
安装就是一路next，记得输入密码，连接数据库的时候用
![这里写图片描述](http://img.blog.csdn.net/20170613100741337?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaW5lcnRpYXBlZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
正常情况下，默认安装最后会弹出一个stack builder，然后安装postgis
![这里写图片描述](http://img.blog.csdn.net/20170613101405643?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaW5lcnRpYXBlZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
![这里写图片描述](http://img.blog.csdn.net/20170613101457104?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaW5lcnRpYXBlZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
点击安装的时候基本上都会卡一下，等等就行。
![这里写图片描述](http://img.blog.csdn.net/20170613102301624?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaW5lcnRpYXBlZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

这部分有问题的容易出现问题的是你的数据库没有运行，就连接不上，出现错误的时候，在开始菜单搜搜服务，进行windows自带的服务，找到postgresql启动就可以了。
找到pgadmin这是一个数据库的可视化软件
最开始需要做的是连接你自己的数据库，这个密码通常是你之前设置的密码，如果有错的。试试你的云主机的登录密码。
点击数据库名字，选择create database （会用sql语句的就当我没说）。
![这里写图片描述](http://img.blog.csdn.net/20170613103411083?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaW5lcnRpYXBlZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
进入自己刚才创建的数据库，点击extension，添加你的postgis扩展，在list中找到你的postgis，保存
![这里写图片描述](http://img.blog.csdn.net/20170613103746580?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaW5lcnRpYXBlZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

### postgis shp导入

![这里写图片描述](http://img.blog.csdn.net/20170613104033273?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaW5lcnRpYXBlZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
连接成功之后，就可以导入shp文件了
### 上传文件
如何把老师发的文件导入到云主机，方法很多，有挂载本地磁盘的，ftp的，我只讲一个简单的，利用qq邮箱的文件中转站，然后在云主机进入就行了。下载解压之后，记得把文件夹名字换成英文的，找到刚才解压的shp文件，选择option，为GBK，然后import,这时候就可以导入到数据库中
![这里写图片描述](http://img.blog.csdn.net/20170613105057154?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaW5lcnRpYXBlZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
### geoserver发布
安装geoserver，我安装的是最新的版本，不用tomcat，直接百度去官网下载，
我是没用java做开发的，做开发的需要用jdk，配置环境变量等（这些可以百度，就不写了），我只装了一个jre，安装好java环境之后，再安装geoserver，安装完成之后，在开始菜单找到geoserver，start。然后等待启动，进入网页中，输入localhost:8080/geoserver，然后先登录（这些之前都见过，不详细说了）
左边，新建一个工作区，取名随便，写一个url http://localhost:8080/(这里可以随便写)，你自己记住就行了。
左边有一个数据存储，打开之后，新建一个数据源，点击postgis选项
![这里写图片描述](http://img.blog.csdn.net/20170613111207400?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaW5lcnRpYXBlZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
其他版本的geosever可能需要边界等，基本上选上就可以了。
确定以后，点击发布。
这里需要计算边界，第一个选择从数据中计算，第二个只有一个选项，
![这里写图片描述](http://img.blog.csdn.net/20170613111648885?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaW5lcnRpYXBlZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
然后点击左边的layers preview,选择自己之前上传的图层，名字应该叫res_4m之类的，选择openlayers就可以查看了，怎么在openlayers里面导入，一会再写。
最后的最后，百度很好用。
![这里写图片描述](http://img.blog.csdn.net/20170613112336628?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaW5lcnRpYXBlZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
我使用的geojson数据发布到html中，因为我用的js比较好转换，在preview中，点击select one中 geojson方式，就会获得你的图层的数据，然后可以修改url中的maxfeatures（因为默认的是50），我们的点位有300多个，修改以后，复制保存。
把json数据放进web服务器中，然后使用我的一个html例子，html要和json数据放在同一路径下。geoserver的webapp目录下面，新建一个map文件夹，将这两个文件放进去，然后就可以了。
这是我的
http://139.199.206.187:4000/