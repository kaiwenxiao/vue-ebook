<template>
  <div class="ebook">
    <ebook-title></ebook-title>
    <ebook-reader></ebook-reader>
    <ebook-menu></ebook-menu>
  </div>
</template>

<script>
  import EbookReader from "../../components/ebook/EbookReader"
  import EbookTitle from '../../components/ebook/EbookTitle'
  import EbookMenu from '../../components/ebook/EbookMenu'
  import {getReadTime, saveReadTime} from "../../utils/localStorage";
  import {ebookMinxin} from "../../utils/mixin";

  export default {
    name: 'index.vue',
    mixins:[ebookMinxin],
    components: {
      EbookReader,
      EbookTitle,
      EbookMenu
    },
    methods: {
      startLoopReadTime() {
        // 获取LocalStorage中的Read Time
        let readTime = getReadTime(this.fileName)
        if (!readTime) {
          readTime = 0
        }
        // 设置定时任务
        this.task = setInterval(() => {
          readTime++
          // 每30秒设置一次LocalStorage
          if (readTime % 30 === 0) {
            saveReadTime(this.fileName, readTime)
          }
        }, 1000)
      }
    },
    mounted() {
      this.startLoopReadTime()
    },
    beforeDestroy() {
      // 清除定时任务
      if (this.task) {
        clearInterval(this.task)
      }
    }
  }
</script>

<style lang='scss' scoped>

</style>
