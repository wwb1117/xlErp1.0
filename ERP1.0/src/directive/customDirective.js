import router from 'router'
const customDirective = {}


customDirective.install = Vue => {

    //自定义指令 路由后退一步
    Vue.directive('RouterBack', function(el, binding){
        el.onclick = function(){
            router.go(-1)
        }
    })


}

export default customDirective
