<template>
    <section>
        <header class="details_header">
            <div>
                <el-breadcrumb separator='-' style="line-height:45px;font-size:15px">
                    <el-breadcrumb-item :to="{ path: '/goodsList' }">商品列表</el-breadcrumb-item>
                    <el-breadcrumb-item>商品详情</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div style="margin-top:7px">
                <el-button size='small'>删除</el-button>
                <el-button type="primary" size='small'>修改</el-button>
            </div>
        </header>
        <section class="details_conent">
            <div class="details_box" :style="{height: $store.state.home.modelContentHeight + 'px'}">
                <div class="details_text">
                    <!-- 轮播图 -->
                    <div class="img_box">
                        <div class="details_img" style="width:418px;height:418px;background:pink">
                            <img src="" alt="">
                        </div>
                        <div class="small_box smallpri_box">
                            <div class="img_prev img_button" ></div>
                            <!-- 小图 -->
                                <dl class="small_box smallpri">
                                    <dd style="width:78px;height:78px;background:pink">
                                        <img src="" alt="">
                                    </dd>
                                    <dd style="width:78px;height:78px;background:pink">
                                        <img src="" alt="">
                                    </dd>
                                    <dd style="width:78px;height:78px;background:pink">
                                        <img src="" alt="">
                                    </dd>
                                    <dd style="width:78px;height:78px;background:pink">
                                        <img src="" alt="">
                                    </dd>
                                </dl>
                            <div class="img_next img_button"></div>
                        </div>
                    </div>
                    <!-- 右侧详细内容 -->
                    <ul class="recommend">
                        <li class="list_title"><h2>{{goods.name}}</h2></li>
                        <li class="list_recommend" style="margin-top:5px">{{goods.recommend}}</li>
                        <li class="list_import"><i class="el-icon-warning" style="line-height:38px"></i> &nbsp; &nbsp;{{goods.import}}</li>
                        <li class="list_money"><span style="margin-left:40px">建议零售价：</span><span style="color:#fe7673;">￥</span> &nbsp;<h2 style="color:#fe7673;margin-top:12px">{{goods.money}}</h2></li>
                        <li>
                            <span  style="line-height:33px;margin-left:40px">规格：</span>
                            <p v-for='it in goods.spec' :key="it">{{it}}</p>
                        </li>
                        <li>
                            <span  style="line-height:33px;margin-left:40px">尺寸：</span>
                            <p v-for='it in goods.size' :key="it">{{it}}</p>
                        </li>
                        <li class="list_dl">
                            <dl>
                                <dd><span>分类：</span>{{goods.item}}</dd>
                                <dd><span>贸易类型：</span>{{goods.types}}</dd>
                                <dd><span>商品条码：</span>{{goods.code}}</dd>
                                <dd><span>保质期：</span>{{goods.time}}</dd>
                            </dl>
                            <dl style="margin-left:100px">
                                <dd><span>品牌：</span>{{goods.brand}}</dd>
                                <dd><span>商品编码：</span>{{goods.num}}</dd>
                                <dd><span>计量单位：</span>{{goods.unit}}</dd>
                            </dl>
                        </li>
                    </ul>
                </div>
                <div class="more_img">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="商品详情" name="first" style='font-size:16px'>
                            <div>这是商品详情图</div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </section>
        <footer class="details_footer">
            <el-button size='small' @click="returnPrev">返回</el-button>
        </footer>
    </section>
</template>
<script>
export default {
    data() {
        return {
            goods: {
                name: '花王XL44纸尿裤 彩标新包装 原箱',
                recommend: '日本销量第一鸷鸟哭加速度喀什发布艾斯比爱上发生部分阿江登记卡上吧俺不是简单三大块是科技奥斯卡爱好时刻把快递吧卡死卡就是把卡卡阿布卡刷包氨基酸爱上啊',
                import: '签收时请开箱检查',
                money: '403.5',
                spec: ['四包装', '六包装'],
                size: ['XLL', 'XL'],
                item: '奶粉-羊奶粉',
                brand: '贝因美',
                types: '国内贸易',
                num: 'P32435132',
                code: '123456789',
                unit: '罐',
                time: '36'
            },
            activeName: 'first'
        }
    },
    created() {

    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        returnPrev() {
            this.$router.push('goodsList')
        }
    }
}
</script>
<style scoped>
/* 轮播 */

.small_box{
    display: flex;
    justify-content: space-between;
}
.smallpri_box{
    margin-top: 10px
}
.img_button{
    width: 18px;
    height: 78px;
    background:blue;
}
.smallpri dd{
    margin-left: 15px
}
.smallpri dd:first-child{
    margin-left: 0
}
/* 顶部 */
.details_header{
    height: 45px;
    width: 100%;
    padding: 0 30px;
    display: flex;
    justify-content: space-between
}
.details_conent{
    padding:10px;
    background: #f5f5f5;
    border-top:1px solid #e6e9e9
}
.details_box{
    border: 1px solid #e6e9eb;
    color: #5e6161;
    background: white;
    padding: 50px
}
/* 内容 */
.details_text{
    display: flex;
    height: 520px
}
.recommend{
    margin-left: 50px;
    margin-top: -40px
}
.recommend li{
    display: flex;
    margin-top: 20px
}
.recommend li p{
    padding: 5px 18px;
    border: 1px solid #e1e1e1;
    margin-left: 20px
}
.list_title{
    color: #525252;
}
.list_recommend{
    width: 644px;
    color: #888
}
.list_import{
    width: 730px;
    height: 38px;
    border: 1px  dashed #fbba42;
    background: #fffbef;
    color: #fe7673;
    line-height: 38px;
    text-indent: 20px
}
.list_money{
    width: 730px;
    height: 67px;
    background: #f8f8f8;
    color:#888;
    line-height: 67px
}
.list_dl{
    width: 730px;
    border-top: 1px solid #e7e7e7;
    padding: 10px 40px;
}
.list_dl dl dd{
    color: #888;
    margin-top: 10px
}
.more_img{
    margin-top: 40px
}
/* 底部 */
.details_footer{
    border-top:1px solid #e5e8e8;
    padding: 12px 30px;
    margin-top: -23px;
    background: white
}
</style>


