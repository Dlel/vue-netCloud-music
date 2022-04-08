import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 在本入口中修改值，在其他组件中获取值是可以的（如果在组件修改的值是不会响应式的）
export default new Vuex.Store({
  state: {
    banClick: false,
    bannerInfo: {},
    songSource: 0,
    comment: Number,
    Time: '',
    nowTime: '00:00',
    timeVal: Number,
    isTouch: false,
    selectClick: false
  },
  getters:{
  },
  mutations: {
    download (state, item) { // 这里要有参数state
      state.bannerInfo = item // 之前在banner里通过this.$store.xx = xx修改的值并没真正存在store中，要在入口里通过state.xx来修改
      if (state.bannerInfo.song) {
        state.nowTime = '00:00'
        state.banClick = !state.banClick // 这里不要用this！！！
        state.songSource = state.bannerInfo.song.songId
        console.log(state.bannerInfo)
      } else {
        console.log(2)
      }
    },
    searchDownload (state, item) { // 这里要有参数state
      const items = {
        song: {
          atId: item.id,
          arName: item.artists[0].name,
          songId: item.id,
          songName: item.name,
          songImage: item.artists[0].img1v1Url
        }
      }
      state.bannerInfo = items // 之前在banner里通过this.$store.xx = xx修改的值并没真正存在store中，要在入口里通过state.xx来修改
      state.nowTime = '00:00'
      state.banClick = !state.banClick // 这里不要用this！！！
      state.songSource = state.bannerInfo.song.songId
    },
    updateTime (state, obj) {
      state.Time = obj.end
      state.timeVal = obj.time
    },
    updateNowTime (state, val) {
      state.nowTime = val
    },
    changeNowTime (state) {
      state.nowTime = '00:00'
    },
    touch (state) {
      state.isTouch = true
    },
    remove (state) {
      state.isTouch = false
    },
    isSelectClick (state) {
      state.selectClick = true
    }
  },
  actions: {
  },
  modules: {
  }
})
