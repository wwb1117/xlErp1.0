import router from 'router'
import store from 'store'
const customDirective = {}
var perssionArr = store.state.home.menuSetting.perssionArr


customDirective.install = Vue => {

    //自定义指令 路由后退一步
    Vue.directive('RouterBack', function(el, binding){
        el.onclick = function(){
            router.go(-1)
        }
    })

    //验证是否有权限
    Vue.directive('perss', function(el, binding){
        let hasPermisson = perssionArr.indexOf(binding.value)

        if (hasPermisson === -1){
            el.parentNode.removeChild(el);
        }
    })
}

export default customDirective
