<!--  -->
<template>
  <div>
     <Swiper>
      <SwiperItem :key='item.index' v-for="item in bannersInfo">
          <img :src="item.imgUrl" alt="" @click="bannerClick(item)">
          <div class="btn-icon" :class="item.color">
            <span>{{item.title}}</span>
          </div>
      </SwiperItem>
    </Swiper>
  </div>
</template>

<script>
import { getHomepageData } from '../../api/index.js'
import Swiper from './swiper/Swiper.vue'
import SwiperItem from './swiper/SwiperItem.vue'
// const Music = () => import('../playMusic/PlayMusic.vue')
export default {
  name: 'Banner',
  props: {
  },
  data () {
    return {
      bannerInfo: {},
      mySwiper: null,
      banClick: false,
      bannersInfo: []
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  created () {
    getHomepageData().then((data) => {
      this.bannerImg = data.blocks[0].extInfo.banners
      this.bannerImg.forEach((info) => {
        this.bannersInfo.push(
          {
            imgUrl: info.pic,
            title: info.typeTitle,
            color: info.titleColor,
            url: info.url ? info.url : '',
            song: info.song != null ? {
              songId: info.song.id,
              songName: info.song.name,
              songImage: info.song.al.picUrl,
              arId: info.song.ar[0].id,
              arName: info.song.ar[0].name
            } : ''
          }
        )
      })
    })
  },
  computed: {},
  beforeMount () {},
  mounted () {
  },
  methods: {
    bannerClick (item) {
      this.$store.commit('download', item)
      this.$emit('bnnClick')
    }
  },
  watch: {}

}

</script>

<style lang='stylus'>
  img
    width 343px
    border-radius 12px
    height 135px
  .btn-icon
    position absolute
    bottom -4px
    right -3px
    color rgb(255,255,255)
    padding 3px 8px 6px 6px
    border-radius 7px
    font-size 10px
  .red
    background-color rgb(234,95,78)
  .blue
    background-color rgb(95,163,234)
</style>
