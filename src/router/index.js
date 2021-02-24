import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/res',
    name: 'Resources',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Resources.vue')
  },
  {
    path: '/pool',
    name: 'Pool',
    component: () => import(/* webpackChunkName: "about" */ '../views/Pool.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "about" */ '../views/Admin.vue')
  },
  {
    path: '/defs',
    name: 'Definitions',
    component: () => import(/* webpackChunkName: "about" */ '../views/Definitions.vue')
  }

]

const router = new VueRouter({
  routes
})

export default router
