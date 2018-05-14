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
                { name: "首页", icon: "fa fa-desktop" },
                { name: "商品", icon: "fa fa-th" },
                { name: "采购", icon: "fa fa-file-text" },
                { name: "仓储", icon: "fa fa-cubes" },
                { name: "审批", icon: "fa fa-user-o" },
                { name: "系统", icon: "fa fa-gear" }
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
