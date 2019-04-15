<!--通用滚动条-->
<template>
  <!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->
  <!-- 而不会等待 `onScroll` 完成  -->
  <div class="scroll-wrapper" :class="{'no-scroll': ifNoScroll}" @scroll.passive="handleScroll" ref="scrollWrapper">
    <slot></slot>
  </div>
</template>

<script>
  import {realPx} from '@/utils/utils'

  export default {
    name: 'Scroll',
    props: {
      top: {
        type: Number,
        default: 0
      },
      bottom: {
        type: Number,
        default: 0
      },
      ifNoScroll: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      handleScroll(e) {
        const offsetY = e.target.scrollTop || window.pageYOffset || document.body.scrollTop
        this.$emit('onScroll', offsetY)
      },
      scrollTo(x, y) {
        this.$refs.scrollWrapper.scrollTo(x, y)
      },
      // 目录滚动条高度
      refresh() {
        if (this.$refs.scrollWrapper) {
          this.$refs.scrollWrapper.style.height = window.innerHeight - realPx(this.top) - realPx(this.bottom) + 'px'
          // this.$refs.scrollWrapper.addEventListener('scroll', this.handleScroll)
        }
      }
    },
    mounted() {
      this.refresh()
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .scroll-wrapper {
    position: relative;
    z-index: 100;
    width: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    // 解决移动端滚动条卡顿问题
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
      display: none;
    }

    &.no-scroll {
      overflow: hidden;
    }
  }
</style>
