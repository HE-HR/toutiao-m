// 提供 本地数据操作 各种方法
// 1.保存数据
export const setItem = function(key, dataobj) {
  if (typeof dataobj === 'object') {
    dataobj = JSON.stringify(dataobj)
  }
  window.localStorage.setItem(key, dataobj)
}

// 2.获取数据
export const getItem = function(key) {
  const dataStr = window.localStorage.getItem(key)
  try {
    return JSON.parse(dataStr)
  } catch (error) {
    return dataStr
  }
}
// 3.删除数据
export const removeItem = function(key) {
  window.localStorage.removeItem(key)
}
