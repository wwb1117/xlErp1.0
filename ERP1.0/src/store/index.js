import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home'
import purchase from './modules/purchase'
import goods from './modules/goods'
// import login from './modules/login'
// import menu from './modules/menu'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        home,
        purchase,
        goods
        // login,
        // menu
    }
})

export default store
