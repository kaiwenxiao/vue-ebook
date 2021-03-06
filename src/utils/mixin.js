// mixin做到简化代码的作用 在其他需要引入的地方调用mixin则可以使用了 超过两处调用就可以用mixin
import {mapGetters, mapActions} from "vuex"
import {themeList, addCss, removeAllCss,getReadTimeByMinute} from "./book";
import {saveLocation} from "./localStorage";

export const ebookMinxin = {
  computed: {
    // 通过getters.js获得 component可以直接用
    ...mapGetters([
      'fileName',
      'menuVisible',
      'settingVisible',
      'defaultFontSize',
      'defaultFontFamily',
      'fontFamilyVisible',
      'defaultTheme',
      'bookAvailable',
      'progress',
      'section',
      'isPaginating',
      'currentBook',
      'navigation',
      'cover',
      'metadata',
      'paginate',
      'pagelist',
      'offsetY',
      'isBookmark'
    ]),
    // 使得不同组件都可以引用到ThemeList
    themeList() {
      return themeList(this)
    }
  },
  // actions.js获得 component可以直接用
  methods: {
    ...mapActions([
      'setFileName',
      'setMenuVisible',
      'setSettingVisible',
      'setDefaultFontSize',
      'setDefaultFontFamily',
      'setFontFamilyVisible',
      'setDefaultTheme',
      'setBookAvailable',
      'setProgress',
      'setSection',
      'setIsPaginating',
      'setCurrentBook',
      'setNavigation',
      'setCover',
      'setMetadata',
      'setPaginate',
      'setPagelist',
      'setOffsetY',
      'setIsBookmark'
    ]),
    // 全局CSS
    initGlobalStyle() {
      removeAllCss()
      switch (this.defaultTheme) {
        case 'Default':
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
          break
        case 'Eye':
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_eye.css`)
          break
        case 'Gold':
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_gold.css`)
          break
        case 'Night':
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_night.css`)
          break
        case '':
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
          break
      }
    },
    // 刷新进度条
    refreshLocation() {
      // 现在的位置 返回一个对象
      const currentLocation = this.currentBook.rendition.currentLocation()
      if(currentLocation&&currentLocation.start){
        const startCfi = currentLocation.start.cfi
        // 本章节开始位置的百分比
        const progress = this.currentBook.locations.percentageFromCfi(startCfi)
        // vuex 刷新后不会保存，只能在book.ready 在重新调用此函数refreshLocation，加载进度
        this.setProgress(Math.floor(progress * 100))
        // vuex 设置当前位置的章节名称
        this.setSection(currentLocation.start.index)
        saveLocation(this.fileName, startCfi)
      }
    },
    // 自定义display 先显示图书位置，再刷新进度条，若有其他任务则进行callback
    display(target,cb) {
      if (target) {
        this.currentBook.rendition.display(target).then(() => {
          this.refreshLocation()
          if (cb) cb()
        })
      } else {
        this.currentBook.rendition.display().then(() => {
          this.refreshLocation()
          if (cb) cb()
        })
      }
    },
    // 隐藏标题和菜单栏
    hideTitleAndMenu() {
      // this.$store.dispatch('setMenuVisible', false)
      this.setMenuVisible(false)
      // 隐藏设置菜单（字号大小、进度、主题等）
      this.setSettingVisible(-1)
      // 隐藏字体设置菜单
      this.setFontFamilyVisible(false)
    },
    // 已读时间
    getReadTimeText() {
      return this.$t('book.haveRead').replace('$1', getReadTimeByMinute(this.fileName))
    }
  }
}
