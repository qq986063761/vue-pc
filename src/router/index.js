import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/comment' },
  {
    path: '/comment',
    name: 'comment',
    component: () => import(/* webpackChunkName: "components" */ '../views/components/comment.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
