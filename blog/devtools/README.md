# Devtools
## 断点调试

断点调试的方法有多种，先介绍一下在js代码中打断点，
1. 打开 Sources 面板，从左侧的 File Navigator 窗格中选择脚本。
2. 如果处理压缩过的代码，请按 pretty print 按钮("{}")使代码可读。
3. 左侧点击添加和取消断点
![这是图片](../../img/duandian.png)

## 网络性能

下面是一个network的面板，大家应该很熟悉
![这是一个network](../../img/network.png)
我简单的说一下
这个实心灰点是记录按钮
旁边是清除按钮
摄像机按钮如果选中的话，是可以记录一部分网页的截图在下方显示
如果点击截图，会显示当前时间的所有network，双击显示大图
这个时间间隔的原理我没有找到资料，官网说的是增量图像。
下面说一下这个Resource timing 
### Resource timing阶段

#### 重定向
立即开始 startTime。 
如果正在发生重定向，redirectStart 也会开始。
如果重定向在本阶段末发生，将采集 redirectEnd。
#### 应用缓存
如果是应用缓存在实现请求，将采集 fetchStart 时间。
#### DNS
domainLookupStart 时间在 DNS 请求开始时采集。
domainLookupEnd 时间在 DNS 请求结束时采集。
#### TCP
connectStart 在初始连接到服务器时采集。
如果正在使用 TLS 或 SSL，secureConnectionStart 将在握手（确保连接安全）开始时开始。
connectEnd 将在到服务器的连接完成时采集。
#### 请求
requestStart 会在对某个资源的请求被发送到服务器后立即采集。
响应
responseStart 是服务器初始响应请求的时间。
responseEnd 是请求结束并且数据完成检索的时间。
![timing api的周期](../../img/resource-timing-api.png)

#### Queuing
如果某个请求正在排队，则指示：
请求已被渲染引擎推迟，因为该请求的优先级被视为低于关键资源（例如脚本/样式）的优先级。 图像经常发生这种情况。
请求已被暂停，以等待将要释放的不可用 TCP 套接字。
请求已被暂停，因为在 HTTP 1 上，浏览器仅允许每个源拥有六个 TCP 连接。
生成磁盘缓存条目所用的时间（通常非常迅速）
#### Stalled/Blocking
请求等待发送所用的时间。 可以是等待 Queueing 中介绍的任何一个原因。 此外，此时间包含代理协商所用的任何时间。
 Proxy Negotiation
与代理服务器连接协商所用的时间。
#### DNS Lookup
执行 DNS 查询所用的时间。 页面上的每一个新域都需要完整的往返才能执行 DNS 查询。
#### Initial Connection / Connecting
建立连接所用的时间，包括 TCP 握手/重试和协商 SSL 的时间。
#### SSL
完成 SSL 握手所用的时间。用于https协议
#### Request Sent / Sending
发出网络请求所用的时间。 通常不到一毫秒。
#### Waiting (TTFB)
等待初始响应所用的时间，也称为至第一字节的时间。 此时间将捕捉到服务器往返的延迟时间，以及等待服务器传送响应所用的时间。这就是等待服务器的相应时间。
#### Content Download / Downloading
接收响应数据所用的时间。
### 资源加载时间分析
#### dns时间
通常dns解析时间是不在考虑的范围里面的，但是在一些比较大的门户站点，比如新浪，尤其是一些没有开keep alive的服务器，dns解析的时间也挺长的，下面是dns预解析的步骤1. 用meta信息来告知浏览器, 当前页面要做DNS预解析:<meta http-equiv="x-dns-prefetch-control" content="on" />
2. 在页面header中使用link标签来强制对DNS预解析: <link rel="dns-prefetch" href="http://bdimg.share.baidu.com" />
#### 排队时间长
排队时间过长的话，是因为浏览器的设置每台主机最多同时六个tcp连接，这时候就需要域名分散，将资源分布到多个域名下，但是在http2.0中不需要这样做，在 HTTP 2 中，到服务器的单个 TCP 连接作为多路复用连接。这消除了 HTTP 1 中的六个连接限制，并且可以通过单个连接同时传输多个资源。
#### 绿色时间过长
原因一般有两个，一个是客户端到服务器的网络条件过差，另一个是因为服务器的处理速度过慢，在测试新首页改版的时候，经常会出现某一个很小的资源加载了几百ms的情况，这就是后台的处理资源的问题了。前者可以通过cdn在全国各地设立资源托管，后者，需要后端的一些优化，减少响应时间。
#### 蓝色时间过长
Content Download 阶段花费了大量时间，这时候可以通过gzip，雪碧图，图片处理压缩等方式，降低时间。
