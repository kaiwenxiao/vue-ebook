<template>
  <div class="ebook-reader">
    <div id="read"></div>
  </div>
</template>

<script>
  import {ebookMinxin} from "../../utils/mixin"
  import Epub from 'epubjs'
  import {
    getFontFamily, saveFontFamily,
    getFontSize, saveFontSize, getTheme, saveTheme,
    getLocation
  } from "../../utils/localStorage";

  global.ePub = Epub
  export default {
    mixins: [ebookMinxin],
    methods: {
      // 实现左翻页
      prevPage() {
        if (this.rendition) {
          this.rendition.prev().then(() => {
            this.refreshLocation()
          })
          // 隐藏标题和菜单栏
          this.hideTitleAndMenu()
        }
      },
      // 实现右翻页
      nextPage() {
        if (this.rendition) {
          this.rendition.next().then(() => {
            this.refreshLocation()
          })
          // 隐藏标题和菜单栏
          this.hideTitleAndMenu()
        }
      },
      // 点击中间 切换Title和Menu的显示
      toggleTileAndMenu() {
        if (this.menuVisible) {
          this.setSettingVisible(-1)
          this.setFontFamilyVisible(false)
        }
        // this.$store.dispatch('setMenuVisible', !this.menuVisible)
        this.setMenuVisible(!this.menuVisible)
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
      initFontSize() {
        // 获得当前电子书的字体大小 (localStorage是没有默认值的)
        let font = getFontFamily(this.fileName)
        if (!font) {
          saveFontFamily(this.fileName, this.defaultFontFamily)
        } else {
          // 如果有存在的fontSize值就设置 并且设置vuex的DefaultFontSize（每次刷新就会display一次）
          this.rendition.themes.font(font)
          this.setDefaultFontFamily(font)
        }
      },
      initFontFamily() {
        // 获得当前电子书的字体样式 (localStorage是没有默认值的)
        let fontSize = getFontSize(this.fileName)
        if (!fontSize) {
          saveFontSize(this.fileName, this.defaultFontSize)
        } else {
          // 如果有存在的fontfamily值就设置 并且设置vuex的DefaultFontFamily（每次刷新就会display一次）
          this.rendition.themes.fontSize(fontSize)
          this.setDefaultFontSize(fontSize)
        }
      },
      initTheme() {
        // 从localstorage中提取主题
        let defaultTheme = getTheme(this.fileName)
        // 假如localstorage没有主题，设置默认的Default主题给他
        if (!defaultTheme) {
          defaultTheme = 'Default'
          saveTheme(this.filename, defaultTheme)
        }
        // 设置vuex
        this.setDefaultTheme(defaultTheme)
        this.themeList.forEach(theme => {
          // 注册主题
          this.rendition.themes.register(theme.name, theme.style)
        })
        // 假如从vuex取，由于vuex异步，取不到（要在setTheme后用then就可以）
        // this.rendition.themes.select(this.defaultTheme(vuex的))  这样不行
        // 本处由于还没注册主题，暂时不能按上面那样写
        this.rendition.themes.select(defaultTheme)
      },
      initRendition() {
        this.rendition = this.book.renderTo('read', {
          width: innerWidth,
          height: innerHeight,
          // 微信兼容
          method: 'default'
        })
        const location = getLocation(this.fileName)
        this.display(location, () => {
          this.initTheme()
          this.initFontFamily()
          this.initFontSize()
          // mixin 实现全局样式切换
          this.initGlobalStyle()
        })
        // rendition钩子函数 为content注册样式表（源码addStylesheet需要url）
        // contents对象 管理资源
        this.rendition.hooks.content.register((contents) => {
          // vue cli 环境变量(环境变量都是在启动时一次性加载到内存，配置环境变量之后需要重新启动)
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`)
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/cabin.css`)
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`)
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`)
        })
      },
      initGresture() {
        // 电子书的手势操作
        this.rendition.on('touchstart', event => {
          // 点击的X坐标的位置
          this.touchStartX = event.changedTouches[0].clientX
          // 点击的X坐标的时间(毫秒 0.001秒)
          this.touchStartTime = event.timeStamp
        })
        this.rendition.on('touchend', event => {
          // 离开时X轴的偏移量
          const offsetX = event.changedTouches[0].clientX - this.touchStartX
          // 点击到离开所用时间
          const time = event.timeStamp - this.touchStartTime
          // 左翻页 右翻页 中间的判断
          if (time < 500 && offsetX > 40) {
            this.prevPage()
          } else if (time < 500 && offsetX < -40) {
            this.nextPage()
          } else {
            this.toggleTileAndMenu()
          }
          // 禁用touchend的默认事件
          event.preventDefault()
          event.stopPropagation()
        })
      },
      initEpub() {
        // nginx下的资源路径
        const url = process.env.VUE_APP_RES_URL + '/epub/' + this.fileName + '.epub'
        // this.book 没定义的话代表全局变量（ES5）
        this.book = new Epub(url)

        // 当前图书
        this.setCurrentBook(this.book)
        this.initRendition()
        this.initGresture()
        // this.book.ready钩子函数，调用异步方法
        this.book.ready.then(() => {
          // 电子书分页
          return this.book.locations.generate(750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16))
        }).then(location => {
          // console.log(location)
          this.setBookAvailable(true)
          // 刷新后，设置进度条
          this.refreshLocation()
        })

      }
    },
    mounted() {
      // 接收用户输入的fileName
      // const fileName = this.$route.params.fileName.split('|')
      //   .join('/')
      // 这里的dispatch调用了book.js的actions 然后将这里的fileName传入
      // mutations将fileName传给state的fileName
      // 而mapGetter获得的就是state的fileName
      // this.$store.dispatch('setFileName', fileName).then(() => {
      //   this.initEpub()
      // })
      this.setFileName(this.$route.params.fileName.split('|').join('/')).then(() => {
        this.initEpub()
      })
    }
  }
</script>

<style lang='scss' scoped>

</style>
