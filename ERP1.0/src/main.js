// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import store from './store'
import 'vue2-animate/dist/vue2-animate.min.css'
import 'jquery'

// 引入代码填充,解决浏览器兼容问题n
import 'babel-polyfill'

import 'element-ui/lib/theme-chalk/index.css' //引入elementUI主题样式

// 引入全局css
import './assets/css/bootstrap.css'
import './assets/css/animate.css'
import './assets/css/font-awesome.min.css'
import './assets/css/simple-line-icons.css'
import './assets/css/font.css'

Vue.config.productionTip = false

/* eslint-disable no-new */

Vue.use(ElementUI)


// 进入页面重新获取屏幕可视高度
var winheight = document.documentElement.clientHeight;
var winwidth = document.documentElement.clientWidth;

store.commit('setDevice', {width: winwidth, height: winheight});

new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
