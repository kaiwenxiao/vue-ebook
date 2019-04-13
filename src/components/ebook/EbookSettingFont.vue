<!-- 点击右下角字号 弹出的component-->
<template>
  <transition name="slide-up">
    <!-- EbookMenu设置的 settingVisible 若为0 则展示字体设置的menu   // 假如menuVisible（Tile和Menu的显示）为false或者settingVisible为大于0，Menu的阴影去除-->
    <div class="setting-wrapper" v-show="menuVisible && settingVisible ===0">
       <!--字体大小拖动条布局-->
      <div class="setting-font-size">
        <div class="preview" :style="{fontSize: fontSizeList[0].fontSize + 'px'}">A</div>
        <div class="select">
          <div class="select-wrapper" v-for="(item, index) in fontSizeList" :key="index"
               @click="setFontSize(item.fontSize)">
            <div class="line"></div>
            <div class="point-wrapper">
              <div class="point" v-show="defaultFontSize === item.fontSize">
                <div class="small-point"></div>
              </div>
            </div>
            <div class="line"></div>
          </div>
        </div>
        <div class="preview" :style="{fontSize: fontSizeList[fontSizeList.length - 1].fontSize + 'px'}">A</div>
      </div>
       <!--字体样式设置布局-->
      <div class="setting-font-family" @click="showFontFamilyPopup">
          <div class="setting-font-family-text-wrapper">
            <span class="setting-font-family-text">{{defaultFontFamily}}</span>
          </div>
        <div class="setting-font-family-icon-wrapper">
            <span class="icon-forward"></span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import {ebookMinxin} from "../../utils/mixin"
  import {FONT_SIZE_LIST} from "../../utils/book"
  import {saveFontSize} from "../../utils/localStorage";

  export default {
    name: 'EbookSettingFont.vue',
    data() {
      return {
        fontSizeList: FONT_SIZE_LIST
      }
    },
    methods: {
      // 设置字体大小
      setFontSize(fontSize) {
        // 修改DefaultFontSize 设置point小圆圈
        this.setDefaultFontSize(fontSize)
        // 将选中的电子书的字体大小存到localStorage中
        saveFontSize(this.fileName,fontSize)
        this.currentBook.rendition.themes.fontSize(fontSize)
      },
      // 点击弹出字体样式设置弹出层
      showFontFamilyPopup(){
        // 传到EbookSettingFontPopup中
        this.setFontFamilyVisible(true)
      }
    },
    mixins: [ebookMinxin]
  }
</script>

<style lang='scss' scoped>
  @import "../../assets/styles/global";

  .setting-wrapper {
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: px2rem(48);
    left: 0;
    z-index: 101;
    width: 100%;
    height: px2rem(90);
    background: white;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);

    .setting-font-size {
      display: flex;
      height: 100%;
      flex: 2;
      .preview {
        flex: 0 0 px2rem(40);
        @include center;
      }

      .select {
        display: flex;
        flex: 1;

        .select-wrapper {
          flex: 1;
          display: flex;
          align-items: center;

          &:first-child {
            .line {
              &:first-child {
                border-top: none;
              }
            }
          }

          &:last-child {
            .line {
              &:last-child {
                border-top: none;
              }
            }
          }

          .line {
            flex: 1;
            height: 0;
            border-top: px2rem(1) solid #ccc;
          }

          .point-wrapper {
            position: relative;
            flex: 0 0 0;
            width: 0;
            height: px2rem(7);
            border-left: px2rem(1) solid #ccc;

            .point {
              position: absolute;
              top: px2rem(-8);
              left: px2rem(-10);
              width: px2rem(20);
              height: px2rem(20);
              border-radius: 50%;
              background: white;
              border: px2rem(1) solid #ccc;
              box-shadow: 0 px2rem(4) px2rem(4) rgba(0, 0, 0, .15);
              @include center;

              .small-point {
                width: px2rem(5);
                height: px2rem(5);
                background: black;
                border-radius: 50%;
              }
            }
          }
        }
      }
    }
    .setting-font-family{
      flex: 1;
      font-size: px2rem(14);
      @include center;
      .setting-font-family-text-wrapper{
        @include center;
      }
      .setting-font-family-icon-wrapper{
        @include center;
      }
    }
  }
</style>
