import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import './assets/styles/icon.css'
import './assets/font/tangerine.css'
import './assets/styles/global.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
