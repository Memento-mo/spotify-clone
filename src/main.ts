import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vueCookies from 'vue-cookies'

Vue.config.productionTip = false
Vue.use(vueCookies)

Vue.$cookies.config('7d')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
