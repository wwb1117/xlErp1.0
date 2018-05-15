<template>
    <div class="app" :style="{width: homeWidth+'px', height: homeHeight+'px'}">
        <HQSilder :menuList = "menuList"></HQSilder>
        <HQContent></HQContent>
    </div>
</template>

<script>
import HQSilder from "views/home/slider";
import HQContent from "views/home/content";
export default {
    name: "home",
    components: {
        HQSilder,
        HQContent
    },
    data() {
        return {
            menuList: [
                { text: "首页", name: 'home', icon: "fa fa-desktop" },
                { text: "商品", name: 'goods', icon: "fa fa-th" },
                { text: "采购", name: 'purchase', icon: "fa fa-file-text" },
                { text: "仓储", name: 'depot', icon: "fa fa-cubes" },
                { text: "审批", name: 'review', icon: "fa fa-user-o" },
                { text: "系统", name: 'system', icon: "fa fa-gear" }
            ],
            homeWidth: null,
            homeHeight: null
        };
    },
    computed: {},
    methods: {},
    created() {
        this.homeWidth = this.$store.state.home.device.width
        this.homeHeight = this.$store.state.home.device.height
    }
};
</script>
