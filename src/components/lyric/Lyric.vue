<!--  -->
<template>
  <div class="lyric-box" ref="lyricWapper">
    <ul class="lyric-ul">
      <div class="center-box"></div>
      <li  v-for="lyrics in lyric" :key="lyrics.index" class="lyric-style">
        {{lyrics}}
      </li>
    </ul>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Lyric',
  props: {
    lyric: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      lyircScroll: null,
      timer: null,
      num: 0,
      timeArr: [],
      lis: 0
    }
  },
  components: {},
  created () {
  },
  computed: {},
  beforeMount () {},
  mounted () {
    setTimeout(() => {
      this.$nextTick(() => {
        this.lyircScroll = new BScroll(this.$refs.lyricWapper, {
          click: true,
          probeType: 3
        })
        this.lyircScroll.on('scroll', (pos) => {
          // console.log(pos)
        })
      })
      this.lyricTime()
    }, 800)
  },
  methods: {
    lyricTime () {
      Object.keys(this.lyric).join('/').split('.').join('/').split('/').forEach(time => {
        if (time.indexOf(':') !== -1) {
          this.timeArr.push(time)
        }
      })
      console.log(this.lyric)
    },
    lyricMove () {
      const list = document.getElementsByClassName('lyric-style')
      list[this.lis].style.color = 'rgb(255,255,255)'

      this.timer = setInterval(() => {
        if (this.timeArr.includes(this.$store.state.nowTime)) {
          list[this.lis].style.color = 'rgb(190,185,182)'
          this.lis++
          list[this.lis].style.color = 'rgb(255,255,255)'
          this.lyircScroll.scrollTo(0, this.num, 20)
          this.num = this.num - 38
          this.lyircScroll.refresh()
        }
      }, 1000)
    },
    lyricStop () {
      clearInterval(this.timer)
    },
    backTop () {
      this.lyircScroll.scrollTo(0, 0, 50)
      this.num = 0
      this.lis = 0
    }
  },
  watch: {
    lyric: {
      handler (newVal) {
        this.timeArr = []
        Object.keys(this.lyric).join('/').split('.').join('/').split('/').forEach(time => {
          if (time.indexOf(':') !== -1) {
            this.timeArr.push(time)
          }
        })
        const list = document.getElementsByClassName('lyric-style')
        for (let i = 0; i < list.length; i++) {
          list[i].style.color = 'rgb(190,185,182)'
        }
      }
    },
    deep: true
  }

}

</script>

<style lang='stylus'>
  .lyric-box
    width 100%
    height 100%
    overflow hidden
    .lyric-ul
      .center-box
        height 202px
        width 100%
      .lyric-style
        text-align center
        color rgb(190,185,182)
        padding-bottom 22px
        .lyric-active
          color rgb(255,255,255)
</style>
