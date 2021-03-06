import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

// 引入阿里巴巴矢量图
import './assets/icon/iconfont.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
