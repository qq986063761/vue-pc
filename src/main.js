import 'ant-design-vue/dist/antd.css'
import './assets/css/antd/index.scss'

import Vue from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import plugin from './plugins'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(Antd)
Vue.use(plugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
