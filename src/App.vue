<template>
  <div id="app">

    <router-view/>
  </div>
</template>
<script>

  // const getters = {
  //   a: () => 1,
  //   b: () => 2
  // }
  //
  // function fn(keys) {
  //   const data = {}
  //   keys.forEach(key => {
  //     if (getters.hasOwnProperty(key)) {
  //       data[key] = getters[key]
  //     }
  //   })
  //   return data
  // }

  export default {
    computed: {
      // ...mapGetters(['test']),
      // ...fn(['a', 'b']) // ...代表可以混入，意思就是数组可以有新增的，会添加到原数组中，例如后面加个 ‘c’，但是都是基于
      // getters去找的，所以getters也要加上相对应的'C'属性。这样的好处是，直接abc都可以用this表示，（为什么）...实现的吧也许
    },
    mounted() {
       // this.$store.dispatch('setTest', 10).then(() => {
       //   console.log(this.test)
       // })
      // console.log(this.a, this.b)
    }
  }
  document.addEventListener('DOMContentLoaded', () => {
    const html = document.querySelector('html')
    let fontSize = window.innerWidth / 10
    fontSize = fontSize > 50 ? 50 : fontSize
    html.style.fontSize = fontSize + 'px' // 规定了在这个宽度（可变化）的浏览器1rem等于多少px。（html的fontSize代表1个rem）
  })
</script>
<style lang="scss" scoped>
  #app{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
