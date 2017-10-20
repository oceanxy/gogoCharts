[柱状图 demo](http://www.xieyangogo.cn/gogoCharts/pages/bars)

## 项目结构说明
### 目录说明
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
- server.js：简单的Nodejs服务器，用于启动服务，使用`node server.js`即可启动，然后在浏览器中访问`localhost:3000/pages/xxx.html`，就可以看到页面效果。

**说明：**所有一级文件夹下面，都可以新建二级文件夹，将同一模块的代码整合在一个文件夹里面。

### 需要特别注意的地方

- scripts文件下分模块建立文件夹，每个模块下所有js都放到对应文件夹中；
- 所有请求都放到入口文件中，包括所有交互，类似Handlebars之类的在使用的模块里面引用；
- 用scss编写所有CSS，使用客户端编译成CSS；
- 添加一个reset.css文件，重置所有默认样式；
- image目录下每个模块新建一个文件夹，用到的图片都放到该文件夹下面，再建立一个common文件夹，放所有公用的图片；
- 图片上传到SVN之前都压缩一下；
- 只require使用到的JS；
- require模板和图表组件时候，如果使用到2次以上，则在最顶部引入，否则在使用到的方法里面引入；
- 注释，编辑器添加插件，自动生成注释，并且注释和功能必须对应， 方法注释时候如果有数据，可以添加数据结构作为注释的一部分；
- 变量定义，作用域局限于函数级；
- mock数据注释：哪个页面下的哪个模块里的那个接口；
- CSS前缀，根据项目对浏览器的要求来定。
