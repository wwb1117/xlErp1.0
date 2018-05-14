<template>
    <div class="login_box">
        <div class="login_logo">
            <img src="static/img/login/login_logo.png" alt="妈妈去哪儿">
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    computed: {},
    methods: {},
    created() {
        this.homeWidth = this.$store.state.home.device.width
        this.homeHeight = this.$store.state.home.device.height
    }
};
</script>
<style scoped>
    .login_box{
        width: 350px;
        height: 400px;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        border: 1px solid red;
    }
</style>

