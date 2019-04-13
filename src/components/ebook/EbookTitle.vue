<template>
  <transition name="slide-down">
    // 当父组件EbookReader用menuVisible这个vux来改变是否展示标题栏（vuex很好做到大型项目父子组件公用数据的使用，达到解耦代码易理解的作用）
    <div class="title-wrapper" v-show="menuVisible">
      <div class="left">
        <span class="icon-back" @click="back"></span>
      </div>
      <div class="right">
        <div class="icon-wrapper">
          <span class="icon-shelf"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-cart"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-more"></span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import {ebookMinxin} from "../../utils/mixin";

  export default {
    mixins: [ebookMinxin],
    methods: {
      back() {
        console.log('back')
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import '../../assets/styles/global';

  .title-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 101;
    display: flex;
    width: 100%;
    height: px2rem(48);
    background: white;
    box-shadow: 0 px2rem(8) px2rem(8) rgba(0, 0, 0, .15);
    // 该div下的字体或图标的大小
    font-size: px2rem(20);
    .left {
      flex: 0 0 px2rem(60);
      @include left;
      margin-left: px2rem(15);
    }

    .right {
      flex: 1;
      display: flex;
      justify-content: flex-end;

      .icon-wrapper {
        flex: 0 0 px2rem(40); // flex-grow、flex-shrink、flex-basis
        @include center;

        .icon-shelf {
          font-size: px2rem(22);
        }

        .icon-cart {
          font-size: px2rem(22);
        }
      }
    }
  }
</style>
