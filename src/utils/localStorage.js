import Storage from 'web-storage-cache'
// localStorage  传入的数据变为json，提取时json转换数据

const localStorage = new Storage()

// 自定义 设置localStorage
export function setLocalStorage(key, value) {
  return localStorage.set(key, value)
}

// 自定义 获得设置localStorage
export function getLocalStorage(key) {
  return localStorage.get(key)
}

// 自定义 删除某个localStorage
export function removeLocalStorage(key) {
  return localStorage.delete(key)
}

// 自定义 清空所有localStorage
export function clearLocalStorage() {
  return localStorage.clear()
}

// ------------------------------------------------
// 每本电子书 存储一个localStorage（保存字体大、样式等）
export function setBookObject(fileName, key, value) {
  let book = getLocalStorage(`${fileName}-info`)
  // 看看能否取到这本书
  if (!book) {
    book = {}
  }
  // key代表电子书的字号大小、样式 value时具体的值
  book[key] = value
  setLocalStorage(`${fileName}-info`, book)
}

// 获取电子书localStorage
export function getBookObject(fileName, key) {
  let book = getLocalStorage(`${fileName}-info`)
  // 看看能否取到这本书
  if (book) {
    return book[key]
  } else {
    return null
  }
}

// 获取字体样式
export function getFontFamily(fileName) {
  return getBookObject(fileName, 'fontFamily')
}

// 设置字体样式 font=vuex的defaultFontFamily
export function saveFontFamily(fileName,font) {
  return setBookObject(fileName, 'fontFamily', font)
}

// -------------------------------------
export function getTheme(fileName) {
  return getBookObject(fileName, 'theme')
}

export function saveTheme(fileName, theme) {
  return setBookObject(fileName, 'theme', theme)
}

export function getFontSize(fileName) {
  return getBookObject(fileName, 'fontSize')
}

export function saveFontSize(fileName, fontSize) {
  return setBookObject(fileName, 'fontSize', fontSize)
}

export function getMetadata(fileName) {
  return getBookObject(fileName, 'metadata')
}

export function saveMetadata(fileName, metadata) {
  return setBookObject(fileName, 'metadata', metadata)
}

export function getCover(fileName) {
  return getBookObject(fileName, 'cover')
}

export function saveCover(fileName, cover) {
  return setBookObject(fileName, 'cover', cover)
}

export function getProgress(fileName) {
  return getBookObject(fileName, 'progress')
}

export function saveProgress(fileName, progress) {
  return setBookObject(fileName, 'progress', progress)
}

export function getNavigation(fileName) {
  return getBookObject(fileName, 'navigation')
}

export function saveNavigation(fileName, navigation) {
  return setBookObject(fileName, 'navigation', navigation)
}

export function getReadTime(fileName) {
  return getBookObject(fileName, 'readTime')
}

export function saveReadTime(fileName, readTime) {
  return setBookObject(fileName, 'readTime', readTime)
}

export function getBookmark(fileName) {
  return getBookObject(fileName, 'bookmark')
}

export function saveBookmark(fileName, bookmark) {
  return setBookObject(fileName, 'bookmark', bookmark)
}

export function getLocation(fileName) {
  return getBookObject(fileName, 'location')
}

export function saveLocation(fileName, location) {
  return setBookObject(fileName, 'location', location)
}

// 全局
export function getLocale() {
  return getBookObject('locale')
}

export function saveLocale(locale) {
  return setBookObject('locale', locale)
}
