import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import Navigator from '@/components/Navigator.vue'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'


Vue.config.productionTip = false

Vue.component('navigator',Navigator)
new Vue({
  router,
  vuetify,
  Navigator,
  render: h => h(App)
}).$mount('#app')
