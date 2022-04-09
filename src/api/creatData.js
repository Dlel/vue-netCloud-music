import axios from 'axios'
const QuestOK = 200
const _baseURL = 'http://localhost:3000'
export function get (url) { // 这一块在index.js里赋值了，然后里面的return给了一个函数表达式
  return function (params) { // 函数表达式在实际组件可以传参数也可以不传
    const newUrl = _baseURL + url
    return axios.get(newUrl, { // axios 就是基于promise的库
      params
    }).then((res) => {
      const data = res.data
      if (data.code === QuestOK) {
        return data.data ? data.data : data // 返回的也是promise
      }
    }).catch((err) => {
      return err
    })
  }
}
