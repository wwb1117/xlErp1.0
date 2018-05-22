import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home/home'
import login from '@/views/login/login'
import { Message } from 'element-ui'

/**********************************首页  ******************************* */

import main from '@/views/home/main'

/**************************************************采购模块*********************************************/
import purchaseList from '@/views/purchase/purchaseList'
import addPurchaseList from '@/views/purchase/addPurchaseList'
import chooseGood from '@/views/purchase/chooseGood'
import purchaseListDetail from '@/views/purchase/purchaseListDetail'
import invalidRecord from '@/views/purchase/invalidRecord'
import importPurchase from '@/views/purchase/importPurchaseList'


// 商品
// 列表
import goods from '@/views/goods/list/goods'
import addGoods from '@/views/goods/list/addGoods'
import items from '@/views/goods/items'
import brand from '@/views/goods/brand'
import spec from '@/views/goods/spec/spec'
import types from '@/views/goods/types/types'
import addSpec from '@/views/goods/spec/addSpec'
import editSpec from '@/views/goods/spec/editSpec'
import addTypes from '@/views/goods/types/addTypes'
import editTypes from '@/views/goods/types/editTypes'
import dteails from '@/views/goods/details'

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

                /*************************** 采购模块*************************************/
                {name: "采购单", path: '/purchaseList', component: purchaseList},
                {name: "新增采购单", path: '/addPurchaseList', component: addPurchaseList},
                {name: "选择商品", path: '/chooseGood', component: chooseGood},
                {name: "商品详情", path: '/purchaseListDetail', component: purchaseListDetail},
                {name: "作废记录", path: '/invalidRecord', component: invalidRecord},
                {name: "导入采购单", path: '/importPurchase', component: importPurchase},

                /*************************** 商品模块*************************************/
                {name: "商品列表", path: '/goodsList', component: goods},
                {name: "新增商品", path: '/addGoods', component: addGoods},
                {name: "商品详情", path: '/goodsDetails', component: dteails},

                {name: "商品分类", path: '/goodsItems', component: items},

                {name: "商品品牌", path: '/goodsBrand', component: brand},

                {name: "商品规格", path: '/goodsSpec', component: spec},
                {name: "编辑规格", path: '/editSpec', component: editSpec},
                {name: "新增规格", path: '/addSpec', component: addSpec},

                {name: "包装类型", path: '/goodsTypes', component: types},
                {name: "新增类型", path: '/addTypes', component: addTypes},
                {name: "编辑类型", path: '/editTypes', component: editTypes}
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
