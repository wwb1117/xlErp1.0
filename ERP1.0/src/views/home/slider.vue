<template>
  <div class="slider">
      <div class="silder_left">
        <div class="slider_logo">
            <img src="static/img/logo.png" alt="妈妈去哪儿">
        </div>
        <ul id="firstMenu_ul">
          <li @click="firstMenuClickEvent($event)" v-for="(item, index) in menuList" :key="item.name" :type="item.name" :class="[item.icon, index == 0 ? 'active' : '']" v-text="item.text"></li>
        </ul>
      </div>
      <div v-show="$store.state.home.isNextMenuShow" class="silder_right">
        <div class="silder_right_top">
          <h4 :style="{textAlign: 'center', margin: '0', padding: '0', lineHeight: '45px', color: '#313131'}">商品</h4>
        </div>
        <ul id="secondMenu_ul">
          <li @click="secondMenuClickEvent($event)" v-for="(item, index) in nextMenuList" :class="[index == 0 ? 'active' : '']" :key="item.path" v-text="item.name"></li>
        </ul>
      </div>

  </div>
</template>

<script>
export default {
    name: "slider",
    props: ["menuList"],
    data() {
        return {
            nextMenuList: [
                {
                    name: '商品列表',
                    path: '1111'
                },
                {
                    name: '商品分类',
                    path: '1111'
                },
                {
                    name: '商品品牌',
                    path: '1111'
                },
                {
                    name: '商品规格',
                    path: '1111'
                }

            ]
        };
    },
    computed: {},
    methods: {
        firstMenuClickEvent($event){
            $('#firstMenu_ul>li').removeClass('active')
            var tha = $event.currentTarget
            var type = $(tha).attr('type')

            $(tha).addClass('active')
            if (type == 'home'){
                this.$store.commit('setNextMenuShow', false)
            } else {
                this.$store.commit('setNextMenuShow', true)
            }

        },
        secondMenuClickEvent($event){
            $('#secondMenu_ul>li').removeClass('active')
            var tha = $event.currentTarget

            $(tha).addClass('active')
        }
    },
    created() {}
};

</script>
<style scoped>
  .slider{
    width: 200px;
    height: 100%;
    cursor: pointer;
    float: left;
  }
  .slider_logo{
      text-align: center;
      width: 100%;
      height: 90px;
      line-height: 90px;

  }
  .silder_left {
    width: 90px;
    height: 100%;
    background: #2c303c;
    float: left;
    box-sizing: border-box;
  }
  .silder_left .active{
    background: #f5f5f5;
    color: #313131
  }
  .silder_left li{
    text-align: center;
    color: #dcdedc;
    width: 100%;
    padding: 10px 0px;
    margin: 10px 0;
  }
  .silder_left li:last-child{
      margin-top: 50px;
  }
  .silder_right {
    width: 110px;
    height: 100%;
    background: #ffffff;
    float: right;
    border: 1px solid #e4e8eb;
    color: #636365;
    box-sizing: border-box;
  }
  .silder_right_top{
    width: 100%;
    height: 45px;
    border-bottom: 1px solid #e4e8eb;
  }
  .silder_right li{
    width: 90px;
    text-align: center;
    box-sizing: border-box;
    padding: 7px 0;
    margin: 20px 0 40px 0;
    margin-left: 7px;
    border-radius: 3px;
  }
  .silder_right .active{
    border: 1px solid #f4f4f4;
    background: #f5f5f5
  }
  ul{
    list-style: none;
    text-align: center;
    padding: 0
  }
  .silder_left ::before{
      margin-right: 10px;
  }

</style>
