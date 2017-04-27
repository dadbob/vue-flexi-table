import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', component: require('./Demo') },
    { path: '/create', component: require('./Create') }
  ]
})

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})