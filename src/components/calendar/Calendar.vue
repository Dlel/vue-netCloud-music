<!--  -->
<template>
  <div class="calendar">
    <div class="calendar-content">
      <div class="calendar-header">
        <span class="icon">
          <img :src="CalIcon" alt="">
        </span>
        <span class="text">{{calendarTxt}}</span>
      </div>
     <div class="calendar-body" v-if="calendarInfo[0]&&calendarInfo[1]">
        <div class="box">
          <transition name="fade">
            <div class="body-info" v-if="isNow" :class="{'txtPostion':isNow}">
              <div class="title">今天</div>
              <div class="message">{{calendarInfo[0].titles}}</div>
            </div>
          </transition>
          <transition name="fade">
            <div class="body-info" v-if="!isNow" :class="{'txtPostion':!isNow}">
              <div class="title">后天</div>
              <div class="message">{{calendarInfo[1].titles}}</div>
            </div>
          </transition>
        </div>
        <div class="body-img">
          <img :src="calendarInfo[0].imgUrl" alt="" :class="{'postion':!isNow}">
          <img :src="calendarInfo[1].imgUrl" alt="" :class="{'postion':isNow}">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHomepageData } from '../../api/index.js'
let i = 0
export default {
  name: 'Calendar',
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
      calendarInfo: [],
      calendarTxt: '',
      CalIcon: '',
      isNow: true

    }
  },
  components: {},
  created () {
    getHomepageData().then((data) => {
      const Calendar = data.blocks[4].creatives
      this.calendarTxt = data.blocks[4].uiElement.subTitle.title
      Calendar.forEach((info) => {
        // this.$set(this.calendarInfo, {
        //   imgUrl: info.resources[0].uiElement.image.imageUrl,
        //   titles: info.resources[0].uiElement.mainTitle.title,
        //   resourceId: info.resources[0].resourceId
        // })
        this.calendarInfo.push(
          {
            imgUrl: info.resources[0].uiElement.image.imageUrl,
            titles: info.resources[0].uiElement.mainTitle.title,
            resourceId: info.resources[0].resourceId
          }
        )
      })
    })
    this.CalIcon = require('./icon/musicCal.png')
  },
  computed: {},
  beforeMount () {},
  mounted () {
    this.timer = setInterval(() => {
      this.isNow = !this.isNow
      i++
      if (i >= this.calendarInfo.length) {
        i = 0
      }
    }, 5000)
  },
  methods: {},
  watch: {}

}

</script>

<style lang='stylus'>
.calendar
  padding 37px 16px
  .calendar-content
    border 1px solid rgba(230,230,230,0.5)
    box-shadow: 1px 2px 11px 0px rgb(230,230,230)
    .calendar-header
      padding 10px 10px
      .icon
        width 24px
        height 24px
        img
          width 24px
          height 24px
      .text
        font-size 19px
        line-height 24px
        vertical-align top
        color #EB4D45
        font-weight 600
    .calendar-body
      white-space nowrap
      padding 14px 11px 0px 13px
      position relative
      .box
        position relative
        display inline-block
        vertical-align middle
        padding 14px 0px 0px 13px
        width 238px
        height 83px
        .body-info
          display inline-block
          padding 6px 0px 13px 0px
          white-space normal
          width 238px
          &.txtPostion
            position absolute
            top 0px
            left 0px
          &.fade-enter-active,&.fade-leave-active
            transition opacity .5s
          &.fade-enter,&.fade-leave-to
            opacity 0
          .title
            font-size 18px
            padding-bottom 10px
          .message
            font-size 18px
            color rgb(102,102,103)
      .body-img
        display inline-block
        vertical-align middle
        position relative
        width 61px
        height 61px
        img
          width 61px
          height 61px
          &.postion
            position absolute
            width 53px
            height 53px
            z-index -1
            top 8px
            left 16px

</style>
