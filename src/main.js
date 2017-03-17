// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import vueResource from 'vue-resource'

Vue.config.productionTip = false

Vue.use(vueResource)

Vue.filter('date', (val) => {
  const date = new Date(val * 1000)
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
