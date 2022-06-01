<template>
  <div id="app" class="all">
    <div class="logo" v-show="twoShow">
      <div class="box">
        <img :src="logoUrl" alt="">
      </div>
    </div>
    <!-- keep-alive 可以防止切换的来回重复请求，将第一次请求的数据缓存在Dom里 -->
    <keep-alive>
      <router-view/>
    </keep-alive>
    <MainNavBar></MainNavBar>
  </div>
</template>
<script>
import MainNavBar from './components/navbar/MainNavBar'
export default {
  name: 'APP',
  props: {
    // __key: {
    //   type: Number,
    //   default () {
    //     return [{
    //       __KEY: '__VALUE'
    //     }]
    //   }
    // }
  },
  data () {
    return {
      logoUrl: '',
      twoShow: true,
      timer: ''
    }
  },
  components: {
    MainNavBar
  },
  created () {
    this.logoUrl = require('./common/icon/clogo.png')
  },
  computed: {},
  beforeMount () {},
  mounted () {
    this.timer = setTimeout(this.close, 3000)
  },
  methods: {
    close () {
      this.twoShow = !this.twoShow
    }
  },
  watch: {}
}
</script>

<style lang="stylus">
.all
  width 100%
  height 100%
  .logo
    position fixed
    top 0px
    bottom 0px
    left 0px
    width 100%
    background rgb(255,255,255)
    z-index 250
    .box
      margin 150px auto
      width 364px
      height 364px
      img
        width 364px
        height 364px

</style>
