<template>
    <div class="app-content">
        <div class="app-content-body fade-in-up">
            <transition name="custom-classes-transition" enter-active-class="fadeIn">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </transition>
        </div>
    </div>
</template>

<script>
export default {
    name: "mainContent",
    data() {
        return {};
    },
    computed: {},
    methods: {},
    created() {}
};
</script>
<style scoped>

</style>

