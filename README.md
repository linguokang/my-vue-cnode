#my-vue-cnode
---
####一个vuex vue-router axios element-ui的单页面应用demo，api来自cnodejs

###技术栈
---
- Vue2.0：前端页面展示。
- Vuex：Vuex，实现不同组件间的状态共享
- vue-router：页面路由切换
- axios：一个基于 Promise 的 HTTP 库，向后端发起请求。
- timeago.js：一个时间处理的库，方便对时间进行格式化成需要的格式，如主题、回复时间显示"* 分钟前、* 小时前、*天前"等等。
- ES6、ES7：采用ES6语法，这是以后的趋势。箭头函数、Promise等等语法很好用。
- localStorage：保存用户信息。
- Webpack：vue-cli自带Webpack，但是需要自己改造一下，比如要对需要安装sass相关loader，
- flex：flex弹性布局，简单适配手机、PC端。

###项目运行
---
git clone https://github.com/linguokang/my-vue-cnode.git

cd my-vue-cnode

npm install

npm start

###打包发布
---
npm run build

###效果演示
---
[点击查看demo](https://linguokang.github.io/my-vue-cnode/)

![](https://github.com/linguokang/my-vue-cnode/blob/master/demo.png)
