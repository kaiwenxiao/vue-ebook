<!--进度条-->
<template>
  <transition name="slide-up">
    <div class="setting-wrapper" v-show="menuVisible && settingVisible === 2">
      <div class="setting-progress">
        <div class="read-time-wrapper">
          <span class="read-time-text">{{getReadTimeText()}}</span>
          <span class="icon-forward"></span>
        </div>
        <div class="progress-wrapper">
          <!--前面的箭头（去上一章）-->
          <div class="progress-icon-wrapper" @click="preSection()">
            <span class="icon-back"></span>
          </div>
          <!--进度条-->
          <input class="progress" type="range"
                 max="100"
                 min="0"
                 step="1"
                 @change="onProgressChange($event.target.value)"
                 @input="onProgressInput($event.target.value)"
                 :value="progress"
                 :disabled="!bookAvailable"
                 ref="progress">
          <!--后面的箭头（去下一章）-->
          <div class="progress-icon-wrapper" @click="nextSection()">
            <span class="icon-forward"></span>
          </div>
        </div>
        <div class="text-wrapper">
          <span class="progress-section-text">{{getSectionName}}</span>
          <span>({{bookAvailable ? progress + '%' : '加载中...'}})</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import {ebookMinxin} from "../../utils/mixin";
  import {getReadTime} from "../../utils/localStorage";

  export default {
    name: "EbookSettingProgress",
    mixins: [ebookMinxin],
    computed: {
      getSectionName() {
        if (this.section) {
          const sectionInfo = this.currentBook.section(this.section)
          if (sectionInfo && sectionInfo.href) {
            // navigation 获取目录
            return this.currentBook.navigation.get(sectionInfo.href).label
          }
        }
        return ''
      }
    },
    methods: {
      // 拖动进度条松开
      onProgressChange(progress) {
        this.setProgress(progress).then(() => {
          this.displayProgress()
          this.updateProgressBg()
        })
      },
      // 拖动进度条过程 实时更新百分比和  页面（暂时不要）
      onProgressInput(progress) {
        this.setProgress(progress).then(() => {
          // this.displayProgress()
          this.updateProgressBg()
        })
      },
      // 展示当前进度所在的页面
      displayProgress() {
        const cfi = this.currentBook.locations.cfiFromPercentage(this.progress / 100)
        // this.currentBook.rendition.display(cfi).then(()=>{
        //   // 同时刷新进度条
        //   this.refreshLocation()
        // })
        this.display(cfi)
      },
      // 更新已阅读进度条颜色
      updateProgressBg() {
        // 获取progress的DOM 设置它
        // cssText 的本质就是设置 HTML 元素的 style 属性值
        this.$refs.progress.style.cssText += `background-size:${this.progress}% 100% !important;`
      },
      displaySection() {
        // epub section api 返回对象
        const sectionInfo = this.currentBook.section(this.section)
        if (sectionInfo && sectionInfo.href) {
          // 跳转回上一章
          // this.currentBook.rendition.display(sectionInfo.href).then(() => {
          //   this.refreshLocation()
          // })
          this.display(sectionInfo.href)
        }
      },
      // 上一章
      preSection() {
        if (this.section > 0 && this.bookAvailable) {
          this.setSection(this.section - 1).then(() => {
            this.displaySection()
          })
        }
      },
      // 下一章
      nextSection() {
        if (this.section < this.currentBook.spine.length - 1 && this.bookAvailable) {
          this.setSection(this.section + 1).then(() => {
            this.displaySection()
          })
        }
      },
      getReadTimeText() {
        return this.$t('book.haveRead').replace('$1', this.getReadTimeByMinute())
      },
      getReadTimeByMinute() {
        const readTime = getReadTime(this.fileName)
        if (!readTime) {
          return 0
        } else {
          return Math.ceil(readTime / 60)
        }
      }
    },

    // 进度条的初始状态，假如没有这个，默认没有设置background-size 保证刷新进度条颜色正确 因为本来只有在改变进度条才会调用updateProgressBg
    // 也可以用 watch
    updated() {
      this.updateProgressBg()
    }
  }
</script>

<style lang='scss' scoped>
  @import "../../assets/styles/global";

  .setting-wrapper {
    position: absolute;
    bottom: px2rem(48);
    left: 0;
    z-index: 101;
    width: 100%;
    height: px2rem(90);
    background: white;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);

    .read-time-wrapper {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      @include center;
      height: px2rem(40);
      font-size: px2rem(12);
    }

    .setting-progress {
      position: relative;
      width: 100%;
      height: 100%;

      .progress-wrapper {
        width: 100%;
        height: 100%;
        @include center;
        padding: 0 px2rem(15);
        box-sizing: border-box;

        .progress-icon-wrapper {
          font-size: px2rem(20);

        }

        .progress {
          width: 100%;
          -webkit-appearance: none;
          height: px2rem(2);
          margin: 0 px2rem(10);

          &:focus {
            outline: none;
          }

          &::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: px2rem(20);
            width: px2rem(20);
            border-radius: 50%;
            background: white;
            box-shadow: 0 4px 4px 0 rgba(0, 0, 0, .15);
            border: px2rem(1) solid #ddd;
          }
        }
      }

      .text-wrapper {
        position: absolute;
        left: 0;
        bottom: px2rem(10);
        width: 100%;
        color: #333;
        font-size: px2rem(12);
        text-align: center;
        @include center;
        padding: 0 px2rem(15);
        box-sizing: border-box;

        .progress-section-text {
          @include ellipsis;
        }
      }
    }
  }
</style>
