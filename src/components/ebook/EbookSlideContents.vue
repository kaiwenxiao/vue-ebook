<!--目录 子动态组件-->
<template>
  <div class="ebook-slide-contents">
    <!--搜索栏-->
    <div class="slide-contents-search-wrapper">
      <div class="slide-contents-search-input-wrapper">
        <div class="slide-contents-search-icon">
          <span class="icon-search"></span>
        </div>
        <input type="text" class="slide-contents-search-input"
               :placeholder="$t('book.searchHint')"
               v-model="searchText"
               @click="showSearchPage">
      </div>
      <!--取消按钮-->
      <div class="slide-contents-search-cancel" v-if="searchVisible"
           @click="hideSearchPage()">{{$t('book.cancel')}}
      </div>
    </div>
    <!--图书信息-->
    <div class="slide-contents-book-wrapper" v-show="!searchVisible">
      <!--左-->
      <div class="slide-contents-book-img-wrapper">
        <img :src="cover" alt="" class="slide-contents-book-img">
      </div>
      <!--中-->
      <div class="slide-contents-book-info-wrapper">
        <div class="slide-contents-book-title">{{metadata.title}}</div>
        <div class="slide-contents-book-author">{{metadata.creator}}</div>
      </div>
      <!--右-->
      <div class="slide-contents-book-progress-wrapper">
        <div class="slide-contents-book-progress">
          <span class="progress">{{progress+'%'}}</span>
          <span class="progress-text">{{$t('book.haveRead2')}}</span>
        </div>
        <div class="slide-contents-book-time">{{getReadTimeText()}}</div>
      </div>
    </div>
    <!--具体的目录-->
    <scroll class="slide-contents-list"
            :top="156"
            :bottom="48"
            v-show="!searchVisible">
      <div class="slide-contents-item" v-for="(item,index) in navigation"
           :key="index">
        <!--目录的标签信息-->
        <span class="slide-contents-item-label" :style="contentItemStyle(item)"
              :class="{'selected':section ===index}" @click="displayNavigation(item.href)">{{item.label}}</span>
        <!--目录的页数信息-->
        <span class="slide-contents-item-page"></span>
      </div>
    </scroll>
    <!--搜索结果列表-->
    <scroll class="slide-search-list"
            :top="66"
            :bottom="48"
            v-show="searchVisible">
      <!--<div class="slide-search-item" v-for="(item,index) in searchList" :key="index">{{item.excerpt}}</div>-->
    </scroll>
  </div>
</template>

<script>
  import {ebookMinxin} from "../../utils/mixin";
  import Scroll from '../common/Scroll'
  import {px2rem} from "../../utils/utils";

  export default {
    mixins: [ebookMinxin],
    components: {Scroll},
    data() {
      return {
        searchVisible: false,
        searchList: null,
        searchText: ''
      }
    },
    methods: {
      // doSearch(q) {
      //   return Promise.all(
      //     this.currentBook.spine.spineItems.map(
      //       item => item.load(this.currentBook.load.bind(this.currentBook))
      //         .then(item.find.bind(item, q))
      //         .finally(item.unload.bind(item)))
      //   ).then(results => Promise.resolve([].concat.apply([], results)))
      // },
      // 防止进度功能等用户点击章节后消失的不良体验
      displayNavigation(target) {
        this.display(target, () => {
          this.hideTitleAndMenu()
        })
      },
      // 多级目录缩进
      contentItemStyle(item) {
        return {
          marginLeft: `${px2rem(item.level * 15)}rem`
        }
      },
      hideSearchPage() {
        this.searchVisible = false
        this.searchText = ''
        this.searchList = null
      },
      showSearchPage() {
        this.searchVisible = true
      }
    },
    name: "EbookSlideContent",
    mounted() {
      console.log(this.currentBook)
      console.log('asd')
    }
  }
</script>

<style lang='scss' scoped>
  @import "../../assets/styles/global";

  .ebook-slide-contents {
    width: 100%;
    /*小技巧，消除div和span造成的空格*/
    font-size: 0;

    .slide-contents-search-wrapper {
      display: flex;
      width: 100%;
      height: px2rem(36);
      margin: px2rem(20) 0 px2rem(10);
      padding: 0 px2rem(15);
      box-sizing: border-box;

      .slide-contents-search-input-wrapper {
        flex: 1;
        @include center;

        .slide-contents-search-icon {
          flex: 0 0 px2rem(28);
          font-size: px2rem(12);
          @include center;
        }

        .slide-contents-search-input {
          flex: 1;
          width: 100%;
          height: px2rem(32);
          font-size: px2rem(14);
          background: transparent;
          border: none;

          &:focus {
            outline: none;
          }
        }
      }

      .slide-contents-search-cancel {
        flex: 0 0 px2rem(50);
        font-size: px2rem(14);
        @include center
      }
    }

    .slide-contents-book-wrapper {
      display: flex;
      width: 100%;
      height: px2rem(90);
      /*添加内边距下面两行*/
      box-sizing: border-box;
      padding: px2rem(10) px2rem(15) px2rem(20);

      .slide-contents-book-img-wrapper {
        flex: 0 0 px2rem(45);

        .slide-contents-book-img {
          width: px2rem(45);
          height: px2rem(60);
        }
      }

      .slide-contents-book-info-wrapper {
        flex: 1;
        /*添加内边距下面两行*/
        box-sizing: border-box;
        padding: 0 px2rem(10);
        width: px2rem(153.75);

        .slide-contents-book-title {
          font-size: px2rem(14);
          // 设置行高消除不显示行的多余文字
          line-height: px2rem(16);
          @include ellipsis2(3);
        }

        .slide-contents-book-author {
          width: px2rem(153.75);
          font-size: px2rem(12);
          margin-top: px2rem(5);
          //1.父级元素一定要指定宽度（在这个宽度进行省略），否则会撑开一行
          @include ellipsis;
        }
      }

      .slide-contents-book-progress-wrapper {
        flex: 0 0 px2rem(70);
        display: flex;
        flex-direction: column;

        .slide-contents-book-progress {
          flex: 1;
          padding: px2rem(10) 0;
          box-sizing: border-box;

          .progress {
            font-size: px2rem(14);
          }

          .progress-text {
            font-size: px2rem(12);
          }
        }

        .slide-contents-book-time {
          flex: 1;
          font-size: px2rem(12);
          padding: px2rem(5) 0;
          box-sizing: border-box;
        }
      }
    }

    .slide-contents-list {
      padding: 0 px2rem(15);
      box-sizing: border-box;

      .slide-contents-item {
        padding: px2rem(20) 0;
        box-sizing: border-box;
        //2.父级元素一定要指定宽度（在这个宽度进行省略），否则会撑开一行 (也可以用flex布局)
        display: flex;

        .slide-contents-item-label {
          flex: 1;
          font-size: px2rem(14);
          @include ellipsis;
        }

        .slide-contents-item-page {
        }
      }
    }
  }
</style>
