import Vue from 'vue'
import VueI18N from 'vue-i18n'
import en from './en'
import cn from './cn'
import {getLocale, saveLocale} from "../utils/localStorage";

Vue.use(VueI18N)

const messages = {
  en, cn
}
let locale = getLocale()
// 假如LocalStorage没有存储 ‘选择字体’ 的语言 修改locale的localstorage为中文
if (!locale) {
  locale = 'cn'
  saveLocale(locale)
}

const i18n = new VueI18N({
  locale,
  messages
})
// 输出插件
export default i18n
