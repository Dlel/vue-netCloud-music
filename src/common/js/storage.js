import storage from 'good-storage'

const KEY_SELLER = '__seller__'
let b = '456'
let a = '123'
export function setStorage(id, key, val) { // id ：店铺  key：获取的内容关键字  val：要存在这个关键字的值
  const seller = storage.get(KEY_SELLER, {}) // 获取有关KEY_SELLER的缓存，如果没有定义就获取空对象
  if (!seller[id]) { // 获取到缓存，看也没有对应的店铺id
    seller[id] = {}
  }
  seller[id][key] = val
  storage.set(KEY_SELLER, seller)
}

export function loadStorage(id, key, def) { // id ：店铺  key：获取的内容关键字  val：要存在这个关键字的值
  const seller = storage.get(KEY_SELLER, {}) // 获取有关KEY_SELLER的缓存，如果没有定义就获取空对象
  if (!seller[id]) { // 获取到缓存，看也没有对应的店铺id
    return def
  }
  return seller[id][key] || def
}
