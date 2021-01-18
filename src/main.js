import Vue from 'vue'
import App from './App.vue'
import plugin from './plugins'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(plugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
