import { MessageBox } from 'element-ui';
import { Message } from 'element-ui';
import store from 'store'

// noinspection JSAnnotator
export default {
    backSpaceBiden(){ //禁止返回键
        function doKey(e){
            var ev = e || window.event; //获取event对象
            var obj = ev.target || ev.srcElement;//获取事件源
            var t = obj.type || obj.getAttribute('type');//获取事件源类型

            if (ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea"){
                return false;
            }
        }
        //禁止后退键 作用于Firefox、Opera
        document.onkeypress = doKey;

        //禁止后退键  作用于IE、Chrome
        document.onkeydown = doKey;
    },
    isHasPerssion(keyvalue){
        var perssionArr = store.state.home.menuSetting.perssionArr
        var res = perssionArr.indexOf(keyvalue)

        if (res === -1) {
            return false
        }
        return true
    },
    confirm(text, success, cancel){
        MessageBox.confirm(text, '温馨提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then( () => {
            if (success){
                success()
            }

        }).catch(() => {
            if (cansel){
                cancel()
            }
            Message.info({
              type: 'info',
              duration: 1500,
              showClose: true,
              message: '已取消操作'
            });
        });
    },
    confirmDelet(text, success, cancel){
        MessageBox.confirm(text, '温馨提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then( () => {
            if (success){
                success()
            }
        }).catch(() => {
            if (cansel){
                cancel()
            }
            Message.info({
              type: 'info',
              duration: 1500,
              showClose: true,
              message: '已取消删除'
            });
        });
    },
    deepCopy(initalObj) {
        var obj = {};
        obj = JSON.parse(JSON.stringify(initalObj));
        return obj;
    }


}
