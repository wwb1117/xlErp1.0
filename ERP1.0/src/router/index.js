import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home/home'
import hallo from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: home,
            children: [
                {name: "首页", path: '/main', component: hallo}
            ]
        }
    ]
})
