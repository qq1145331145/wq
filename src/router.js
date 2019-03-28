import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Chat from './views/Chat.vue'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'home',
      component:Home,
      redirect:'/chat',
      children:[{
        path:'/chat',
        name:'chat',
        component:Chat
      },
      {
        path:'/address',
        name:'address',
        component:()  => import('./views/Address.vue')
      },
      {
        path:'/news',
        name:'news',
        component:() => import('./views/News.vue')
      },
    ]
    },
    {
      path:'/login',
      name:'login',
      component:() => import('./views/Login.vue')
    },
    // {
    //   path: '/about',
    //   name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" *)
    // }
  ],
  linkActiveClass: 'homeActive'
})
