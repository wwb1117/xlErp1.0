import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home/home'
import hallo from '@/components/HelloWorld'
import login from '@/views/login/login'
import { Message } from 'element-ui';

Vue.use(Router)

var router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: home,
            children: [
                {name: "首页", path: '/main', component: hallo}
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: login
        }
    ]
})

router.beforeEach((to, from, next) => {
    // 登录拦截
    if (sessionStorage.getItem('user')){
        next()
        return
    } else if (to.fullPath == '/login'){
        next();
        return
    } else {
        Message({
            message: '会话已过期,请重新登录!',
            showClose: true,
            type: 'warning'
        });

        next({ path: '/login' })
        return
    }
})
export default router
