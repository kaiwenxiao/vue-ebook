<!--字体样式设置的弹出层-->
<template>
  <transition name="popup-slide-up">
    <!--fontFamilyVisible 由EbookSettingFont修改-->
    <div class="ebook-popup-list" v-show="fontFamilyVisible">
      <!--弹出层title-->
      <div class="ebook-popup-title">
        <div class="ebook-popup-title-icon" @click="hide">
          <span class="icon-down2"></span>
        </div>
        <!--$t 代表国际化文本  选择cn.js下的book对象(key值)-->
        <span class="ebook-popup-title-text">{{$t('book.selectFont')}}</span>
      </div>
      <!--字体样式列表-->
      <div class="ebook-popup-list-wrapper">
        <div class="ebook-popup-item" v-for="(item,index) in fontFamilyList" :key="index"
             @click="setFontFamily(item.font)">
          <!--点击设置字体样式-->
          <div class="ebook-popup-item-text" :class="{'selected':isSelected(item)}">
            {{item.font}}
          </div>
          <div class="ebook-popup-item-check" v-show="isSelected(item)">
            <span class="icon-check"></span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import {ebookMinxin} from "../../utils/mixin";
  import {FONT_FAMILY} from "../../utils/book";
  import {saveFontFamily} from "../../utils/localStorage";

  export default {
    name: "EbookSettingFontPopup",
    mixins: [ebookMinxin],
    data() {
      return {
        fontFamilyList: FONT_FAMILY
      }
    },
    methods: {
      // 隐藏弹出层
      hide() {
        this.setFontFamilyVisible(false)
      },
      // 判断某个字体样式条目（item）是否被选中
      isSelected(item) {
        return this.defaultFontFamily === item.font
      },
      // 设置字体样式list某条目的选中状态 以及修改电子书字体样式
      setFontFamily(font) {
        this.setDefaultFontFamily(font)
        // 将选中的电子书的字体样式存到localStorage中
        saveFontFamily(this.fileName, font)
        if (font === 'Default') {
          this.currentBook.rendition.themes.font('Calibri')
        } else {
          // 添加的字体样式样式需要在EbookReader rendition注入 不能直接引用（iframe里面的fontfamily）
          this.currentBook.rendition.themes.font(font)
        }
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import "../../assets/styles/global";

  .ebook-popup-list {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 300;
    width: 100%;
    background: white;
    box-shadow: 0 px2rem(-4) px2rem(6) rgba(0, 0, 0, .1);

    .ebook-popup-title {
      position: relative;
      padding: px2rem(15);
      /*将padding border margin算到width height中，使得里面内容宽度 高度变小*/
      box-sizing: border-box;
      border-bottom: px2rem(1) solid #b8b9bb;
      text-align: center;
      @include center;

      .ebook-popup-title-icon {
        font-size: px2rem(16);
        font-weight: bold;
        position: absolute;
        left: px2rem(15);
        top: 0;
        // height:100%是根据父元素被缩小的实际宽高
        height: 100%;
        @include center;
      }

      .ebook-popup-title-text {
        font-size: px2rem(14);
        font-weight: bold;
      }
    }

    .ebook-popup-list-wrapper {
      .ebook-popup-item {
        display: flex;
        padding: px2rem(15);

        .ebook-popup-item-text {
          flex: 1;
          font-size: px2rem(14);
          text-align: left;

          &.selected {
            color: #346cb9;
          }
        }

        .ebook-popup-item-check {
          flex: 1;
          text-align: right;
          font-size: px2rem(14);
          font-weight: bold;
          color: #346cb9;
        }
      }
    }
  }
</style>
