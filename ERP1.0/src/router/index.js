import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home/home'
import main from '@/views/home/main'
import login from '@/views/login/login'
import purchaseList from '@/views/purchase/purchaseList'
import addPurchaseList from '@/views/purchase/addPurchaseList'
import chooseGood from '@/views/purchase/chooseGood'
import { Message } from 'element-ui'
// 商品
// 列表
import goods from '@/views/goods/list/goods'
import add from '@/views/goods/list/add'
// 分类
import items from '@/views/goods/items'

Vue.use(Router)

var router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: home,
            children: [
                {name: "首页", path: '/main', component: main},
                {name: "采购单", path: '/purchaseList', component: purchaseList},
                {name: "新增采购单", path: '/addPurchaseList', component: addPurchaseList},
                {name: "选择商品", path: '/chooseGood', component: chooseGood},
                {name: "商品", path: '/goodsList', component: goods},
                {name: "新增商品", path: '/add', component: add},
                {name: "新增商品", path: '/goodsItems', component: items}
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
    if (to.fullPath == '/'){
        if (sessionStorage.getItem('user')){
            next({ path: '/main' })
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
    } else if (to.fullPath == '/login'){
        next();
        return
    } else {
        if (sessionStorage.getItem('user')){
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
    }
})
export default router
