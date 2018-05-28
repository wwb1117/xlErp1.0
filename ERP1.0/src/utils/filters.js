export function trim (str) {
    return str.replace(/(^\s*)(\s*$)/g, '')
}
export function integer(val) {
    var reg = /^\d+$/;
    if (!reg.val) {
        alert("请输入正整数")
        return false;
    }
}
function titlefilter(str){

    var reg = new RegExp('"',"g")
    let str1 = '"'+str+'"'
    if(str){
        if(str1.length>40){
            let s
            s=str1.substring(0,40)+"...";
            return s.replace(reg, "")
        }else{
            return str1.replace(reg, "")
        }
    }

}
function getTime (num,cc) {
    //num  是毫秒时间戳

    //cc  'day','min','day_min','day_min_s'

    if (!num) {
        return ""
    }

    var date=new Date(num*1000);

    //日期格式化
    var week=['日','一','二','三','四','五','六'];
    var y=date.getFullYear()+'-';
    var m=date.getMonth()+1+'-';
    var d=date.getDate()+'';

    var w='  星期'+week[date.getDay()];

    var h=date.getHours();
    // var am=h>=12?'  下午':'  上午';
    //h=h>12  ?  h-12  :  h;

    d=d<10  ?  '0'+d  :  ''+d;
    h=h<10  ?  '0'+h  :  ''+h ;

    var mi=date.getMinutes();
    mi=mi<10  ?  '0'+mi  :  ''+mi;

    var s=date.getSeconds();
    s=s<10  ?  '0'+s  :  ''+s;

    var str='';

    //console.log(cc);
    // var cc = 'day'

    if(cc=='day'){

        str= y+m+d;

    }else if(cc=='min'){

        str= h+' : '+mi;
    }else if(cc=='day_min'){

        str=y+m+d+' '+h+' : '+mi;
    }else if(cc=='day_min_s'){
        str=y+m+d+' '+h+' : '+mi+' : '+s;

    }

    return str;
}

export function time (num) {
    return getTime(num,'day')
}
export function time_s (num) {
    return getTime(num,'day_min_s')
}
export function time_m (num) {
    return getTime(num,'day_min')
}
export function zishu (num) {
    return titlefilter(num,'day_min_s')
}
const filters = {
    trim,
    time,
    time_m,
    time_s,
    zishu,
}
export default filters
