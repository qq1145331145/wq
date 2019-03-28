import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../public/scss/element-variables.scss'
// import WedIm from './config'

Vue.use(ElementUI);

// WebIm.conn.open(options);

Vue.config.productionTip = false

// 开启全局守卫判断你是否登录,如未登录自动跳转到登录页面
router.afterEach((to) => {
  let {isLogin} = store.state.login
  if (to.name !== 'login' && !isLogin) {
      router.replace({name: 'login'})
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

store.dispatch('listen')