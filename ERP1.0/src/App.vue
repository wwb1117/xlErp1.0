<template>
  <div id="app" :style="{width: homeWidth+'px', height: homeHeight+'px'}">
    <router-view/>
  </div>
</template>

<script>
export default {
    name: 'App',
    data(){
        return {
            homeWidth: null,
            homeHeight: null
        }
    },
    created() {
        this.homeWidth = this.$store.state.home.device.width
        this.homeHeight = this.$store.state.home.device.height
    }

}
</script>

<style>

</style>
