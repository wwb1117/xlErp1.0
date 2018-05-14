<template>
  <div class="slider">
      <div class="silder_left">
        <ul>
          <li v-for="item in menuList" :key="item.icon" :class="item.icon" v-text="item.name"></li>
        </ul>
      </div>
      <div class="silder_right">
        <div class="silder_right_top">
          <h4 :style="{textAlign: 'center', margin: '0', padding: '0', lineHeight: '45px', color: '#313131'}">商品</h4>
        </div>
        <ul>
          <li v-for="(item, index) in nextMenuList" :class="index == 0 ? 'active' : ''" :key="item.path" v-text="item.name"></li>
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
    methods: {},
    created() {}
  };

</script>
<style scoped>
  .slider{
    width: 200px;
    height: 100%;
    cursor: pointer;
  }
  .silder_left {
    width: 90px;
    height: 100%;
    background: #2c303c;
    float: left;
    box-sizing: border-box;
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
  .silder_left li{
    text-align: center;
    color: #dcdedc;
    padding: 10px 20px;
  }

</style>
