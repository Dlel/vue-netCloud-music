<!--  -->
<template>
  <transition name="playlive">
    <div class="play-music" v-show="$store.state.banClick">
      <div class="background">
        <img :src="$store.state.bannerInfo.imgUrl" alt="">
      </div>
      <div class="content">
        <div class="play-header">
          <div class="header-content">
            <div class="header-left" @click="backPage()">
              <span class="icon-left"></span>
            </div>
            <div class="header-middle" v-if="$store.state.bannerInfo.song">
              <div class="song-name">{{$store.state.bannerInfo.song.songName}}</div>
              <div class="singer">
                <span class="singer-name">{{$store.state.bannerInfo.song.arName}}</span>
                <span class="icon-right"></span>
              </div>
            </div>
            <div class="header-right">
              <span class="icon-enjoy"></span>
            </div>
          </div>
        </div>
        <div class="play-middle" @click="middleClick()" v-if="$store.state.bannerInfo.song">
          <div class="middle-cdshow" v-show="middleClicked">
            <div class="rod">
              <!-- <img :src="icoPause" alt="" class="rod-Pause"> -->
              <img :src="icoPlay" alt="" class="rod-Play" id="iconAnimation" :class="{'animatePlay':animatePlay, 'animatePause':animatePause}">
            </div>
            <div class="cd-box">
              <div class="ring-1">
                <div class="ring-2">
                  <div class="ring-3">
                    <img :src="$store.state.bannerInfo.song.songImage" alt="" class="song-img" id="imgAnimation">
                  </div>
                </div>
              </div>
            </div>
            <div class="icons-list">
              <div class="like">
                <span class="icon-like"></span>
              </div>
              <div class="download">
                <span class="icon-download"></span>
              </div>
              <div class="sing">
                <span class="icon-sing"></span>
              </div>
              <div class="message" @click.stop="backAfter()">
                <span class="icon-message"></span>
                <div class="count">
                  <span>{{songSource.comment | isOver}}</span>
                </div>
              </div>
              <div class="more">
                <span class="icon-more"></span>
              </div>
            </div>
          </div>
          <div class="middle-lyric" v-show="!middleClicked">
            <Lyric v-if="lyricLoad" ref="lyrics" :lyric="lyrics"></Lyric>
          </div>
        </div>
        <div class="play-bottom">
          <div class="bottom-feature">
            <audio :src="songSource.url" id="myAudio"></audio>
            <div class="progress-bar">
              <div class="nowTime">
                <span id="Ntime">{{$store.state.nowTime}}</span>
              </div>
              <div class="bar" id="barn">
                <span class="bar-control" id="ball" @touchstart='progress()'></span>
                <span class="bar-line" id="line"></span>
                <span class="bar-line-mask" id="mask"></span>
              </div>
              <div class="endTime">
                <span>{{$store.state.Time}}</span>
              </div>
            </div>
            <div class="buttons-icon">
              <div class="play-style">
                <span class="icon-all" v-show="currentIndex === 0"></span>
                <span class="icon-one" v-show="currentIndex === 1"></span>
                <span class="icon-random" v-show="currentIndex === 2"></span>
              </div>
              <div class="play-left">
                <span class="icon-up"></span>
              </div>
              <div class="play-pause-open">
                <span class="icon-play" v-show="!playClick" @click="myPlayClick()"></span>
                <span class="icon-pause" v-show="playClick" @click="myPauseClick()"></span>
              </div>
              <div class="play-right">
                <span class="icon-down"></span>
              </div>
              <div class="play-list">
                <span class="icon-list" @click="showList()"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <transition name='commentMove'>
        <songCommment v-if="messageClick" @backAfter="backAfter()"></songCommment>
      </transition>
    </div>
  </transition>
</template>

<script>
import songCommment from '../../components/comment/songComment.vue'
import Lyric from '../../components/lyric/Lyric.vue'
export default {
  name: 'PlayMusic',
  props: {
    songSource: {
      type: Object,
      default () {
        return {}
      }
    },
    lyrics: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      middleClicked: true,
      playClick: false,
      currentIndex: 0,
      timer: null,
      pauseTime: 0,
      icoPause: '',
      icoPlay: '',
      animatePlay: false,
      animatePause: true,
      messageClick: false,
      lyricLoad: false
    }
  },
  components: {
    songCommment,
    Lyric
  },
  created () {
    this.icoPause = require('./icon/rodPause.png')
    this.icoPlay = require('./icon/rodPlay.png')
  },
  computed: {
  },
  updated () {
    this.$nextTick(() => {
      this.updateTime()
    })
  },
  beforeMount () {},
  mounted () {
  },
  filters: {
    isOver (data) {
      if (data > 10000) {
        return '1w+'
      } else if (data > 999) {
        return '999+'
      } else {
        return data
      }
    }
  },
  destroyed () {
  },
  methods: {
    backPage () {
      this.$store.state.banClick = !this.$store.state.banClick
      this.middleClicked = true
    },
    middleClick () {
      this.middleClicked = !this.middleClicked
    },
    updateTime () {
      const audio = document.getElementById('myAudio')
      const _vuex = this.$store
      let end = ''
      audio.addEventListener('canplay', function () {
        let minute = 0
        let second = 0
        minute = Math.floor(audio.duration / 60)
        second = parseInt(audio.duration - minute * 60)
        if (second < 10) {
          end = `0${minute}:0${second}`
        } else {
          end = `0${minute}:${second}`
        }
        _vuex.commit('updateTime', { end: end, time: audio.duration })
      })
      // console.log(end)
      // this.$store.commit('updateTime', end)
    },
    myPlayClick () {
      // console.log(this.songSource.url, this.$store.state.bannerInfo.song.songImage)
      // this.$store.state.listSong.push({
      //   songUrl: this.songSource.url,
      //   songBack
      // })
      const audio = document.getElementById('myAudio')
      const imgAnimation = document.getElementById('imgAnimation')
      const iconAnimation = document.getElementById('iconAnimation')
      imgAnimation.style.animationPlayState = 'running'
      this.animatePlay = true
      this.animatePause = false
      iconAnimation.style.animationPlayState = 'running'
      // iconAnimation.addEventListener('animationend', () => {
      //   console.log(iconAnimation.setAttribute('animation', ''))
      // })
      // this.lyricLoad = true
      // if (this.$refs.lyrics) {
      //   this.$refs.lyrics._getSongLyric()
      // }
      this.playClick = !this.playClick
      audio.play()
      this.timeChange()
      this.$refs.lyrics.lyricMove()
    },
    myPauseClick () {
      const audio = document.getElementById('myAudio')
      const imgAnimation = document.getElementById('imgAnimation')
      const iconAnimation = document.getElementById('iconAnimation')
      imgAnimation.style.animationPlayState = 'paused'
      this.animatePause = true
      this.animatePlay = false
      iconAnimation.style.animationPlayState = 'running'
      this.playClick = !this.playClick
      audio.pause()
      const times = this.timeFormatting(this.pauseTime)
      // dispatch 执行vuex中actions的异步任务
      this.$store.commit('updateNowTime', times) // commit 执行vuex中mutations的同步任务
      clearInterval(this.timer)
      this.$refs.lyrics.lyricStop()
    },
    timeChange () {
      const ball = document.getElementById('ball')
      const mask = document.getElementById('mask')
      const line = document.getElementById('line')
      const lineHeight = line.offsetWidth
      let minute = 0
      let second = 0
      let now = ''
      const time = this.$store.state.timeVal
      this.timer = setInterval(() => {
        if (now === this.$store.state.Time) {
          this.pauseTime = this.pauseTime - 1
          this.closeTimer()
          this.$store.commit('changeNowTime')
          this.songLyricOver()
        } else {
          this.pauseTime = this.pauseTime + 1
          const radio = (this.pauseTime / time) * lineHeight
          mask.style.width = radio + 'px'
          ball.style.left = radio * 0.968 + 'px'
          minute = Math.floor(this.pauseTime / 60) >= 1 ? Math.floor(this.pauseTime / 60) : 0
          second = parseInt(this.pauseTime - minute * 60)
          if (second < 10) {
            now = `0${minute}:0${second}`
          } else {
            now = `0${minute}:${second}`
          }
          this.$store.commit('updateNowTime', now)
        }
      }, 1000)
    },
    timeFormatting (time) {
      let minute = 0
      let second = 0
      minute = Math.floor(time / 60)
      second = parseInt(time - minute * 60)
      if (second < 10) {
        return `0${minute}:0${second}`
      } else {
        return `0${minute}:${second}`
      }
    },
    closeTimer () {
      clearInterval(this.timer)
      const mask = document.getElementById('mask')
      const ball = document.getElementById('ball')
      const imgAnimation = document.getElementById('imgAnimation')
      imgAnimation.style.animationPlayState = 'paused'
      const iconAnimation = document.getElementById('iconAnimation')
      this.animatePause = true
      this.animatePlay = false
      iconAnimation.style.animationPlayState = 'paused'
      // const Ntime = document.getElementById('Ntime')
      this.pauseTime = 0
      this.playClick = false
      mask.style.width = 0 + 'px'
      ball.style.left = 0 + 'px'
    },
    progress (event) {
      // event.cancelable
      event.preventDefault()
      const barn = document.getElementById('barn')
      const mask = document.getElementById('mask')
      const ball = document.getElementById('ball')
      ball.style.width = 16 + 'px'
      ball.style.height = 16 + 'px'
      let xs = 0
      ball.addEventListener('touchmove', (event) => {
        xs = event.clientX - barn.offsetLeft // 拖动滑块位置获得的坐标
        ball.style.left = xs + 'px'// 控制滑块移动到当前坐标
        mask.style.width = xs + 'px' // 控制进度条颜色改变（遮罩的宽度=滑块到进度条初始端的坐标位置）
        // 限制滑块的位置，限制遮罩的宽度
        if (xs < 0) {
          ball.style.left = 0
          mask.style.width = 0
        } else if (xs >= 279) {
          ball.style.left = 279 + 'px'
          mask.style.width = 279 + 'px'
        }
      })
      ball.addEventListener('touchend', () => {
        // document.onmousemove = null // 弹起鼠标不做任何操作
        ball.style.width = 8 + 'px'
        ball.style.height = 8 + 'px'
      })
    },
    backAfter () {
      this.messageClick = !this.messageClick
    },
    lyricFilter () {
      this.$refs.lyrics.lyricTime()
    },
    songLyricOver () {
      this.$refs.lyrics.lyricStop()
      this.$refs.lyrics.backTop()
    }
  },
  watch: {
  }

}

</script>

<style lang='stylus'>
.play-music
  position fixed
  top 0px
  left 0px
  bottom 0px
  width 100%
  z-index 300
  transform translate3d(0,0,0)  //最终动画布局不变
  &.playlive-enter-active,&.playlive-leave-active
    transition all 0.5s
  &.playlive-leave-to
    transform translate3d(-100%,0,0) //动画离开时是左移动 <--
  &.playlive-enter
    transform translate3d(100%,0,0) //动画进入时是右移动 -->
  .background
    position absolute
    // top 0px
    // left 0px
    width 100%
    height 100%
    background rgb(117,117,132)
    z-index -1
    img
      width 100%
      height 100%
      filter blur(18px) //让背景照片模糊化
      -webkit-mask -webkit-linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4),rgba(0,0,0,0.4),rgba(0,0,0,0.4)) //蒙版
  .content
    display flex
    flex-direction column
    width 100%
    height 100%
    .play-header
      flex 0 0 38px
      padding 52px 20px 16px 20px
      .header-content
        width 335px
        height 38px
        display flex
        .header-left
          flex 1
          display inline-block
          position relative
          .icon-left
            font-size 24px
            position absolute
            top 7px
        .header-middle
          flex 0 0 270px
          display inline-block
          text-align center
          .song-name
            font-size 18px
            color rgb(255,255,255)
          .singer
            color rgb(223,223,231)
            .singer-name
              font-size 14px
              vertical-align middle
            .icon-right
              font-size 26px
              vertical-align middle
        .header-right
          flex 1
          display inline-block
          position relative
          .icon-enjoy
            font-size 28px
            position absolute
            top 5px
    .play-middle
      flex 1
      .middle-cdshow
        width 100%
        height 100%
        .rod
          position relative
          height 127px
          width 100%
          // .rod-Pause
          //   position absolute
          //   right 20px
          //   top 10px
          //   width 168px
          //   height 117px
          //   z-index 1
          //   transform-origin left top
          //   animation move 1s linear
          //   animation-play-state paused
          //   transform rotate(33deg)
          //   @keyframes move
          //     0%
          //       transform rotate(0deg)
          //     100%
          //       transform rotate(33deg)
          .rod-Play
              position absolute
              right 100px
              top 20px
              width 100px
              height 179px
              z-index 1
              &.animatePlay
                transform-origin left top
                animation move 0.5s linear
                animation-play-state paused
                  // animation-direction alternate
                transform rotate(0deg)
                @keyframes move
                  0%
                    transform rotate(-33deg)
                  100%
                    transform rotate(0deg)
              &.animatePause
                transform-origin left top
                animation move 0.5s linear
                  // animation back 1s linear
                // animation-play-state paused
                // animation-direction alternate
                transform rotate(-33deg)
                // @keyframes move
                //   0%
                //     transform rotate(0deg)
                //   100%
                //     transform rotate(-33deg)
        .cd-box
          height 356px
          width 100%
          .ring-1
            position relative
            margin 0px 33px
            width 309px
            height 309px
            border-radius 50%
            background rgba(255,255,255,0.2)
            .ring-2
              width 283px
              height 283px
              border-radius 50%
              background rgb(11,11,11)
              position absolute
              top 13px
              left 13px
              .ring-3
                width 193px
                height 193px
                position absolute
                top 50% - 34px
                left 50% - 34px
                border-radius 50%
                .song-img
                  display inline-block
                  width 193px
                  height 193px
                  border-radius 50%
                  animation run 20s linear infinite
                  animation-play-state paused
                  @keyframes run
                    0%
                      transform rotate(0deg)
                    25%
                      transform rotate(90deg)
                    50%
                      transform rotate(180deg)
                    75%
                      transform rotate(270deg)
                    100%
                      transform rotate(360deg)
        .icons-list
          height 76px
          width 100%
          display flex
          text-align center
          padding-top 10px
          .like
            flex 1
            .icon-like
              display inline-block
              padding-top 20px
              font-size 26px
          .download
            flex 1
            .icon-download
              display inline-block
              padding-top 20px
              font-size 26px
          .sing
            flex 1
            .icon-sing
              display inline-block
              padding-top 20px
              font-size 26px
          .message
            flex 1
            position relative
            .icon-message
              display inline-block
              padding-top 20px
              font-size 26px
            .count
              position absolute
              top 15px
              right 7px
              // background rgba(0,0,0, 0.5)
              span
                display inline-block
                color rgb(255,255,255)
                font-size 8px
                background rgba(0,0,0, 0.5)
                padding 2px 4px
                border-radius 8px
          .more
            flex 1
            .icon-more
              display inline-block
              padding-top 20px
              font-size 26px
      .middle-lyric
        width 100%
        height 469px
        padding-top 50px
        padding-bottom 50px
        overflow hidden
    .play-bottom
      flex 0 0 137px
      .bottom-feature
        width 100%
        height 100%
        .progress-bar
          display flex
          .nowTime
            flex 1
            font-size 13px
            text-align center
            color rgba(255,255,255,0.5)
          .bar
            flex 0 0 279px
            position relative
            .bar-control
              display inline-block
              width 8px
              height 8px
              border-radius 50%
              background rgb(255,255,255)
              position absolute
              top 3px
              left 0px
            .bar-line
              display inline-block
              width 279px
              height 3px
              background rgba(255,255,255,0.2)
              border-radius 3px
              position absolute
              top 5px
              left 0px
            .bar-line-mask
              display inline-block
              width 0px
              height 3px
              background rgba(255,255,255,0.4)
              border-radius 3px
              position absolute
              top 5px
              left 0px
          .endTime
            flex 1
            font-size 13px
            text-align center
            color rgba(255,255,255,0.5)
        .buttons-icon
          padding-top 30px
          display flex
          text-align center
          .play-style
            display inline-block
            flex 1
            font-size 23px
            .icon-all
              line-height 54px
          .play-left
            flex 1
            font-size 25px
            .icon-up
              line-height 54px
          .play-pause-open
            flex 0 0 67px
            font-size 50px
            text-align center
            .icon-pause
              line-height 54px
            .icon-open
              line-height 54px
          .play-right
            flex 1
            font-size 23px
            .icon-down
              line-height 54px
          .play-list
            flex 1
            font-size 34px
            .icon-list
              line-height 54px
</style>
