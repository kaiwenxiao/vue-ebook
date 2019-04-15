<template>
  <div>
    <transition name="slide-up">
      <!-- 假如menuVisible（Tile和Menu的显示）为false或者settingVisible为大于0，Menu的阴影去除-->
      <div class="menu-wrapper" :class="{'hide-box-shadow': !menuVisible || settingVisible >=0}" v-show="menuVisible">
        <div class="icon-wrapper">
          <span class="icon-menu" @click="showSetting(3)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-progress" @click="showSetting(2)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-bright" @click="showSetting(1)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-A" @click="showSetting(0)"></span>
        </div>
      </div>
    </transition>
    <ebook-setting-font></ebook-setting-font>
    <ebook-setting-font-popup></ebook-setting-font-popup>
    <ebook-setting-theme></ebook-setting-theme>
    <ebook-setting-progress></ebook-setting-progress>
    <ebook-setting-slide></ebook-setting-slide>
  </div>
</template>

<script>
  import EbookSettingFont from './EbookSettingFont'
  import EbookSettingFontPopup from './EbookSettingFontPopup'
  import EbookSettingTheme from './EbookSettingTheme'
  import EbookSettingProgress from './EbookSettingProgress'
  import EbookSettingSlide from './EbookSlide'
  import {ebookMinxin} from "../../utils/mixin"

  export default {
    mixins: [ebookMinxin],
    components: {
      EbookSettingTheme,
      EbookSettingFont,
      EbookSettingFontPopup,
      EbookSettingProgress,
      EbookSettingSlide
    },
    methods: {
      // 点击菜单栏下的（字号大小、进度、主题等）
      showSetting(key) {
        // 对settingVisible进行赋值
        this.setSettingVisible(key)
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import "../../assets/styles/global";

  .menu-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 102;
    display: flex;
    width: 100%;
    height: px2rem(48);
    background: white;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
    font-size: px2rem(20);

    &.hide-box-shadow {
      box-shadow: none;
    }

    .icon-wrapper {
      flex: 1;
      @include center;

      .icon-progress {
        font-size: px2rem(25);
      }

      .icon-bright {
        font-size: px2rem(22);
      }
    }
  }

</style>
