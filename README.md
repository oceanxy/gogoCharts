# Bars Chart

### 调用方式

```html
<head>
  <link href="style.css">
</head>
<body>
  <div class="bar"></div>
</body>

```

```javascript
var data = [
             {name: "xxx1", value: 9306},
             {name: "xxx2", value: 22109},
             {name: "xxx3", value: 64761},
             {name: "xxx4", value: 13119},
             {name: "xxx5", value: 67544}
           ]

var bar = require('barChart')

var config = {
  sharpOrient: 'x',
  width: 500,
  height: 300
}

bar.render('bar', data, config)
```


### 柱状图配置列表：
  
渲染图形到哪一个轴上 **sharpOrient** @type {string}

    默认X轴，可选 'y'
    
    如果数据是 {name:xxx,value:xxx} 格式的，强制设置此属性对应的轴为文本轴
    如果数据是 {value:xxx,value:xxx} 格式的，将根据此属性设置图形所在轴
    
图表的宽度 **width** @type {number}
    
    默认500像素
    
图表的高度 **height**

    默认300像素
    
    @type {number}
         
动画选项 **animation** @type {Object}
      
> 启用加载时动画 **animation.enable** @type {boolean}
>
>       true: 启用 默认
>       false: 禁用
>       
> 动画的持续时间 **animation.duration** @type {number}
>
>       默认 500ms
>       单位 ms（毫秒）
>   
> 动画的缓动方式 **animation.ease** @type {string}
>
>       默认 'linear'
>
图表的内边距值 **padding** @type {Object}

    设置图表盒子模型的padding
     
> 上内边距 **padding.top** @type {number}
>
>     默认 30 像素
>
> 右内边距 **padding.right** @type {number}
>
>     默认 30 像素
>
> 下内边距 **padding.bottom** @type {number}
>
>     默认 30 像素
>
> 左内边距 **padding.left** @type {number}
>
>     默认 30 像素

柱状图图形配置项 **itemStyle** @type {Object}
     
> 图形的高度/宽度 **itemStyle.size** @type {number}
>
>     当柱子位于 X 轴时，此值设置柱子的宽度
>     当柱子位于 Y 轴时，此值设置柱子的高度
>       
>     默认 50 像素
>
> 自定义附加元素集合 **itemStyle.components** @type {Object}
>
>     内置两个固定 SVG 元素（rect 和 text），不可修改
>     rect：用于展示可视化数据的矩形
>     text：用于标注可视化数据的具体值
>    
>     默认 一个长度为 0 的空数组
>    
>     可自定义附加 SVG 元素，如image、circle、path等
>    
>     结构示例：
>
>```javascript
>image: {
>  attr: {
>    'href': 'xxx/xxx.png',
>    'width': 100,
>    'height': 100
>  },
>  sort: 1
>}
>```
>
>     字段注释：
>
>     image: 附加的元素标签名称
>     attr: 附加元素的属性集合和css样式集合，如 width、fill、url、'font-size'等
>     sort: 附加元素的位置。
>          此属性设置元素的绘画序列，初始化图形时将根据这个绘画序列依次绘制可视化元素
>          缺省此属性将默认在已有的标签之后添加
>          设置重复的序列会将当前元素的序列值设置为该值，序列中原位置的元素以及其后的元素自动往后面移动一个单位
>          默认的绘画顺序是
>          1. rect
>          2. text
>          此例中将 sort 设置为 1 后，绘画顺序变为
>          1. image
>          2. rect
>          3. text
>       
> 柱子背景色 **itemStyle.color** @type {string}
>
>     默认 '#3c31ec' (蓝色)
>
> 渐变配置 **itemStyle.gradient** @type {Object}
>
>> 启用柱状条渐变 **itemStyle.gradient.enable** @type {boolean}
>>
>>     默认 true
>>     如果禁用此属性，将使用 itemStyle.color
>>         
>> 渐变的id属性值 **itemStyle.gradient.id** @type {string}
>>
>>     强制：如果开启图表的柱状条渐变模式，每一张图表都应该设置独立的id，以免与其他图表产生 id 重合
>>     
>> 渐变色域 **itemStyle.gradient.color**  @type {Object}
>>
>>     默认 '#a60a54' 到 '#a60a54'
>>
>>> 起始颜色 **itemStyle.gradient.color.start** @type {string}
>>>
>>> 终止颜色 **itemStyle.gradient.color.end** @type {string}
>>         
>> 渐变偏移量配置 **itemStyle.gradient.offset** @type Object
>>
>>     默认 0 到 100%
>>         
>>> 渐变起始值 **itemStyle.gradient.offset.start** @type {string}
>>>
>>> 渐变终止值 **itemStyle.gradient.offset.end** @type {string}
>>
>> 渐变透明度配置 **itemStyle.gradient.opacity** @type Object
>>
>>     默认 1
>>
>>> 透明起始值 **itemStyle.gradient.opacity.start** @type {string}
>>>
>>> 透明终止值 **itemStyle.gradient.opacity.end** @type {string}
>>
>>
> 柱子角半径（圆角大小） **itemStyle.radius** @type {number}
>
>      默认0
>
> 图形文本样式配置项 **itemStyle.textStyle** @type {Object}
>       
>> 是否在柱状条上显示文本 **itemStyle.textStyle.show** @type {boolean}
>>
>>     默认 false
>>
>> 显示位置 ****itemStyle.textStyle.outer**** @type {boolean}
>>
>>     当柱状条文本可见时
>>     true: 在柱状条外部 默认
>>     false: 在柱状条内部
>>
>> 文字距离柱状条顶部的距离 **itemStyle.textStyle.spacing** @type {number}
>>
>>     默认 10
>>
>> 文本颜色 **itemStyle.textStyle.color** @type {string}
>>
>>     默认 '#a60a54'
>>
>> 文本大小 **itemStyle.textStyle.fontSize** @type {number}
>>
>>     默认 14
>>
X 轴配置 **xAxis** @type {Object}

> 轴方向 **xAxis.orient** @type {string}
>
>      默认 'bottom'
>      可选'top', 'bottom'
>      
> 轴上需要显示的第一个刻度偏离0刻度的倍率 **xAxis.zero** @type {number}
> 
>      在很多时候，比如 X 轴的第一个刻度（通常为0刻度）需要显示文本，但是为了图表的美观，
>      我们往往需要将文本的显示位置往 X 轴的正方向移动一段距离，使第一个文本刻度与 X 轴的
>      0刻度分离开。zero 属性就是用来设置这个偏移距离的。
>                   
>      该属性值为倍率，即设置前0刻度距离下一个刻度的距离值的倍率
>      该属性仅在文本轴生效
>                   
>      默认 0
>      
> 轴上需要显示的最后一个刻度偏移坐标轴末端的倍率 **xAxis.end**  @type {number}
>
>      默认 0
>           
> 内刻度尺寸 **xAxis.innerTickSize** @type {number}
>
>      坐标轴起始位置刻度和终止位置刻度以外的其他刻度
>
>      默认 6
>
> 内刻度尺寸 **xAxis.outerTickSize** @type {number}
>
>      坐标轴起始位置刻度和终止位置刻度
>
>      默认 6
>
> 比例尺类型 **xAxis.scale** @type {string}
>
>      （'linear'||'pow'||'sqrt'||'log'） 线性比例尺，指数比例尺，平方根比例尺，对数比例尺
>      默认 'linear' 线性比例尺 y = m * x + b
>
>      d3.scale.pow().domain([0,100]).range([0,700]).exponent(2);
>      指数比例尺使用数学公式 y = m * x^k + b 映射 domain 与 range 之间的关系，k 用 exponent() 函数来设定
>      默认指数为1，所以默认情况下也是数值 1:1 的缩放，等同于 linear 。
>      
>      d3.scale.sqrt().domain([0,100]).range([0,700])
>      平方根比例尺是 pow 比例尺的特殊类型，相当于 k = 0.5 的指数比例尺
>      如 d3.scale.pow().exponent(0.5)
>
>      d3.scale.log().domain([10,100]).range([0,700])
>      对数比例尺使用数学公式 y = m * log(x) + b 映射 domain 与 range 之间的关系
>      使用这个比例尺有一个比较苛刻的要求，定义域的开始值（x）必须大于0开始，因为对数的底数不许为小于等于 0 的数
>     
>        
> 指数 **xAxis.exponent**  @type {number}
>
>      在scale为 pow 时生效
>
>      默认 2
>
> 轴单位 **xAxis.unit** @type {boolean || string}
>
>      当数字达到一定范围时自动格式化为带单位的浮点数或整型
>
>      false | 可以转换成false的其他值：不带单位 默认
>      'en'：‘K,M,B’等
>      'cn': ‘千，百万，十亿’等
>      '%': 百分数
>           
> 轴基准线 **xAxis.axisLine** @type {Object}
>
>> 是否显示X轴 **xAxis.axisLine.show** @type {boolean}
>>
>>     默认 true
>>
>> 轴样式 **xAxis.axisLine.style** @type {Object}
>>
>>     以键值对的形式
>>     根据图表自行配置css样式
>>
>> ```javascript
>>   style: {
>>      'fill': 'white',
>>      'text-anchor': 'middle'
>>   }
>> ```
>>
>> 轴文字样式 **xAxis.axisLine.textStyle** @type {Object}
>>    
>>     以键值对的形式
>>     根据图表自行配置css样式
>>
>> ```javascript
>>   textStyle: {
>>      'fill': 'white',
>>      'text-anchor': 'middle'
>>   }
>> ```
>>
>> 轴的刻度文本倾斜度 **xAxis.axisLine.textRotate** @type {number}
>>
>>     由于图表的特性，当 X 轴的刻度文本宽度过低以致于影响到相邻的刻度文本显示时
>>     自动使用这个值来倾斜 X 轴的刻度文本
>>
>>     默认 -45 度
>>
> X轴上的网格线 **xAxis.gridLine** @type {Object}
>
>> 是否显示X轴网格线 **xAxis.gridLine.show** @type {boolean}
>>
>>     默认 true
>>
>> 网格线样式 **xAxis.gridLine.style** @type {Object}
>>
>>     默认灰色，宽1像素
>>     根据图表自行配置css样式
>>
>> ```javascript
>>   style: {
>>     'stroke': 'gray',
>>     'stroke-width': 1
>>   }
>> ```
>>
>> 刻度数 **xAxis.gridLine.ticks** @type {number}
>>
>>     只对数字轴生效
>>
>>     d3默认10
>>
>> 刻度与文本的距离 **xAxis.gridLine.tickPadding** @type {number}
>>
>>     默认 30
>>
>> 设置轴定义域的起始值 **xAxis.gridLine.domainStart** @type {boolean}
>>
>>     false：从0开始，默认
>>     true：从传入数组的最小值开始
>>     如果数组的最小值为负数，则坐标轴启用负数轴
>>
>> 是否在轴上刻度的最小值之前缓冲一段距离 **xAxis.gridLine.bufferAxis** @type {boolean}
>>            
>>     如果图表内的各柱状条的起始值与终止值均大于轴上的某一个值（刻度N），
>>     或者起始值与终止值差值很小但值很大，均超过了刻度N，
>>     为了图表的美观，可以将刻度N之前的轴压缩一定的倍率，使得各柱状条的比例更为明显
>>
>>     该属性仅在 domainStart 属性为 true 时且该轴为数字轴时生效，默认false

Y 轴配置 **yAxis** @type {Object}

> 轴方向 **yAxis.orient** @type {string}
>
>      默认 'left'
>      可选 'left', 'right'
>      
> 轴上需要显示的第一个刻度偏离0刻度的倍率 **yAxis.zero** @type {number}
> 
>      在很多时候，比如 Y 轴的第一个刻度（通常为0刻度）需要显示文本，但是为了图表的美观，
>      我们往往需要将文本的显示位置往 Y 轴的正方向移动一段距离，使第一个文本刻度与 Y 轴的
>      0刻度分离开。zero 属性就是用来设置这个偏移距离的。
>                   
>      该属性值为倍率，即设置前0刻度距离下一个刻度的距离值的倍率
>      该属性仅在文本轴生效
>                   
>      默认 0
>      
> 轴上需要显示的最后一个刻度偏移坐标轴末端的倍率 **yAxis.end**  @type {number}
>
>      默认 0
>           
> 内刻度尺寸 **yAxis.innerTickSize** @type {number}
>
>      坐标轴起始位置刻度和终止位置刻度以外的其他刻度
>
>      默认 6
>
> 内刻度尺寸 **yAxis.outerTickSize** @type {number}
>
>      坐标轴起始位置刻度和终止位置刻度
>
>      默认 6
>
> 比例尺类型 **yAxis.scale** @type {string}
>
>      （'linear'||'pow'||'sqrt'||'log'） 线性比例尺，指数比例尺，平方根比例尺，对数比例尺
>      默认 'linear' 线性比例尺 y = m * x + b
>
>      d3.scale.pow().domain([0,100]).range([0,700]).exponent(2);
>      指数比例尺使用数学公式 y = m * x^k + b 映射 domain 与 range 之间的关系，k 用 exponent() 函数来设定
>      默认指数为1，所以默认情况下也是数值 1:1 的缩放，等同于 linear 。
>      
>      d3.scale.sqrt().domain([0,100]).range([0,700])
>      平方根比例尺是 pow 比例尺的特殊类型，相当于 k = 0.5 的指数比例尺
>      如 d3.scale.pow().exponent(0.5)
>
>      d3.scale.log().domain([10,100]).range([0,700])
>      对数比例尺使用数学公式 y = m * log(x) + b 映射 domain 与 range 之间的关系
>      使用这个比例尺有一个比较苛刻的要求，定义域的开始值（x）必须大于0开始，因为对数的底数不许为小于等于 0 的数
>     
>        
> 指数 **yAxis.exponent**  @type {number}
>
>      在scale为 pow 时生效
>
>      默认 2
>
> 轴单位 **yAxis.unit** @type {boolean || string}
>
>      当数字达到一定范围时自动格式化为带单位的浮点数或整型
>
>      false | 可以转换成false的其他值：不带单位 默认
>      'en'：‘K,M,B’等
>      'cn': ‘千，百万，十亿’等
>      '%': 百分数
>           
> 轴基准线 **yAxis.axisLine** @type {Object}
>
>> 是否显示 Y 轴 **yAxis.axisLine.show** @type {boolean}
>>
>>     默认 true
>>
>> 轴样式 **yAxis.axisLine.style** @type {Object}
>>
>>     以键值对的形式
>>     根据图表自行配置css样式
>>
>> ```javascript
>>   style: {
>>      'fill': 'white',
>>      'text-anchor': 'middle'
>>   }
>> ```
>>
>> 轴文字样式 **yAxis.axisLine.textStyle** @type {Object}
>>    
>>     以键值对的形式
>>     根据图表自行配置css样式
>>
>> ```javascript
>>   textStyle: {
>>      'fill': 'white',
>>      'text-anchor': 'middle'
>>   }
>> ```
>>
> X轴上的网格线 **yAxis.gridLine** @type {Object}
>
>> 是否显示X轴网格线 **yAxis.gridLine.show** @type {boolean}
>>
>>     默认 true
>>
>> 网格线样式 **yAxis.gridLine.style** @type {Object}
>>
>>     默认灰色，宽1像素
>>     根据图表自行配置css样式
>>
>> ```javascript
>>   style: {
>>     'stroke': 'gray',
>>     'stroke-width': 1
>>   }
>> ```
>
> 刻度数 **yAxis.ticks** @type {number}
>
>     只对数字轴生效
>
>     d3默认10
>
> 刻度与文本的距离 **yAxis.tickPadding** @type {number}
>
>     默认 30
>
> 设置轴定义域的起始值 **yAxis.domainStart** @type {boolean}
>
>     false：从0开始，默认
>     true：从传入数组的最小值开始
>     如果数组的最小值为负数，则坐标轴启用负数轴
>
> 是否在轴上刻度的最小值之前缓冲一段距离 **yAxis.bufferAxis** @type {boolean}
>            
>     如果图表内的各柱状条的起始值与终止值均大于轴上的某一个值（刻度N），
>     或者起始值与终止值差值很小但值很大，均超过了刻度N，
>     为了图表的美观，可以将刻度N之前的轴压缩一定的倍率，使得各柱状条的比例更为明显
>
>     该属性仅在 domainStart 属性为 true 时且该轴为数字轴时生效，默认false

### 项目目录说明

- template：handlebars模板文件；
- mockData：使用mockjs生成的测试数据；
- charts：使用D3开发的图表组件；
- doc：项目文档：
  - 需求文档；
  - 设计稿psd；
  - HTML格式的接口文档；
  - 项目维护文档；
  - 前端代码版本管理机制；
  - 前端提供接口文档的统一标准。
- images：图片，包括jpg、png、gif和svg图标等；
- pages：HTML页面；
- scripts：JavaScript代码:
  - common：工具类文件，如通用方法、常量等；
  - 各个模块对应的文件夹。
- sea-modules：引用的第三方库文件，如seajs、jQuery等；
- styles：CSS样式文件；
- seajs.cofig.js：seajs配置文件，可以配置一些别名，方面引用；
- mine.js：类型文件，供server.js文件使用；
- server.js：简单的Nodejs服务器，用于启动服务。

### 运行
    启动服务： `node server`
    访问: `localhost:3000/pages/xxx.html`
