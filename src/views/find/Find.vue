<!--  -->
<template>
  <div class="find">
    <FindSearch @refresh="refresh()"></FindSearch>
    <div class="find-swaper" ref="findScroll">
      <div class="find-content">
        <div class="showOne" v-show="!$store.state.isTouch">
          <Banner @bnnClick="bnnClick()"></Banner>
          <SelectTab></SelectTab>
          <Recommend></Recommend>
          <Personal></Personal>
          <Calendar></Calendar>
          <Exclusive></Exclusive>
          <NewResource></NewResource>
          <KTV></KTV>
          <PlayClien></PlayClien>
          <div class="up"></div>
        </div>
        <SearchPage v-show="$store.state.isTouch" ref="searchPage"></SearchPage>
      </div>
    </div>
    <play-music :songSource="songSource" ref="mp3" :lyrics= "lyrics"></play-music>
  </div>
</template>

<script>
import FindSearch from '../../components/search/FindSearch.vue'
import BScroll from 'better-scroll'
import Banner from '../../components/banner/Banner.vue'
import SelectTab from '../../components/selectTab/SelectTab.vue'
import Recommend from '../../components/recommend/Recommend.vue'
import Personal from '../../components/personal/Personal.vue'
import Calendar from '../../components/calendar/Calendar.vue'
import Exclusive from '../../components/exclusive/Exclusive.vue'
import NewResource from '../../components/newResource/NewResource.vue'
import KTV from '../../components/ktv/KTV.vue'
import PlayClien from '../../components/playClien/PlayClien.vue'
import PlayMusic from '../../components/playMusic/PlayMusic.vue'
import SearchPage from '../../components/searchPage/SearchPage.vue'
import { getSongData, getSongComment, getSongLyric } from '../../api/index.js'
export default {
  name: 'Find',
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
      Fscroll: null,
      songSource: {},
      historyId: Number,
      lyrics: {}
    }
  },
  components: {
    FindSearch,
    Banner,
    SelectTab,
    Recommend,
    Personal,
    Calendar,
    Exclusive,
    NewResource,
    KTV,
    PlayClien,
    PlayMusic,
    SearchPage
  },
  created () {
    this.$root.$on('synthClick', () => {
      this.bnnClick()
    })
  },
  computed: {
  },
  beforeMount () {},
  mounted () {
    setTimeout(() => {
      this.$nextTick(() => {
        this.Fscroll = new BScroll(this.$refs.findScroll, {
          click: true
        })
      })
    }, 800)
  },
  methods: {
    _getSong () {
      if (this.historyId !== this.$store.state.bannerInfo.song.songId) {
        getSongData({ id: this.$store.state.bannerInfo.song.songId }).then((res) => {
          this.songSource = (res[0])
          this.historyId = this.$store.state.bannerInfo.song.songId
          this.$refs.mp3.closeTimer()
        })
        getSongComment({ id: this.$store.state.bannerInfo.song.songId }).then((res) => {
          Object.defineProperty(this.songSource, 'comment', {
            value: res.total,
            writable: true,
            enumerable: true,
            configurable: true
          })
        })
        if (this.$refs.mp3.lyricLoad) {
          this.$refs.mp3.songLyricOver()
        }
        getSongLyric({ id: this.$store.state.bannerInfo.song.songId }).then((text) => {
          const patt = /]/g
          const lyricArr1 = text.lrc.lyric.split('] ').join('|').split('[').slice(1).join('|').replace(patt, '|').split('|')
          const lyric = {}
          for (let i = 0; i < lyricArr1.length; i++) {
            if (lyricArr1[i] === '\n') {
              lyricArr1.splice(i - 1, 2)
            }
          }
          for (let i = 0; i < lyricArr1.length; i = i + 2) {
            const key = lyricArr1[i]
            const value = lyricArr1[i + 1]
            lyric[key] = value
          }
          this.lyrics = lyric
        })
        this.$refs.mp3.lyricLoad = true
      } else {
      }
    },
    bnnClick () {
      this.$nextTick(() => {
        this._getSong()
      })
    },
    refresh () {
      this.$refs.searchPage.lookMore = true
      setTimeout(() => {
        this.$nextTick(() => {
          this.Fscroll.refresh()
        })
      }, 300)
    }
  },
  beforeDestroy () {
    this.$root.Bus.$off('synthClick')
  },
  watch: {
  }

}

</script>

<style lang='stylus'>
.find
  padding 65px 0px 22px 0px
  height 100vh
  overflow hidden
  .find-swaper
    height 100%
    .find-content
      padding-top 14px
      .up
        height 200px
        width 100%

</style>
