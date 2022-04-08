/* test */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Find from '../views/find/Find.vue'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [{ // 默认先进去的地址
    path: '/',
    redirect: '/find'
  },
  {
    path: '/find',
    name: 'Find',
    component: Find
  },
  {
    path: '/video',
    name: 'Video',
    component: () => import('../views/video/Video.vue')
  },
  {
    path: '/myself',
    name: 'Myself',
    component: () => import('../views/myself/Myself.vue')
  },
  {
    path: '/cloud',
    name: 'Cloud',
    component: () => import('../views/cloud/Cloud.vue')
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('../views/account/Account.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
