# 介绍

基于 vue & element-ui 的后台管理系统业务组件库

npm 仓库地址：`http://xxx.com`


## 前提

使用需要在当前项目下设置下载源

新建一个`.npmrc`文件，写入`registry=http://xxx.com`


## 完整引入

```javascript
import Vue from 'vue'
import Earth from 'xxx/earth'
import App from './App.vue'

Vue.use(Earth)

new Vue({
  el: '#app',
  render: h => h(App)
})
```

## 按需引入
```javascript
import Vue from 'vue'
import DDD from 'xxx'
import App from './App.vue'

Vue.component(DDD.name, DDD)
/* 或写为
 * Vue.use(DDD)
 */

new Vue({
 el: '#app',
 render: h => h(App)
})
```


