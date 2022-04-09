import { get } from '../api/creatData.js'

const getSongData = get('/song/url')
const getHomepageData = get('/homepage/block/page')
const getSongComment = get('/comment/music')
const getSongPageComment = get('/comment/music')
const getPic = get('/album')
const getSongLyric = get('/lyric')
const getSearchHot = get('/search/hot/detail')
const getMessageSearch = get('/search')
export {
  getSongData,
  getHomepageData,
  getSongComment,
  getSongPageComment,
  getPic,
  getSongLyric,
  getSearchHot,
  getMessageSearch
}
