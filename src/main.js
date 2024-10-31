import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/global.css'
import axios from "axios";
import VueRouter from "vue-router";
import router from "./router";
import store from "./store"
import ECharts from 'vue-echarts'
import 'echarts'

Vue.prototype.$axios = axios
Vue.prototype.$myurl = 'http://localhost:8081'
Vue.prototype.$ai_apikey = '' //你的openai apikey

Vue.use(ElementUI);
Vue.use(VueRouter,ECharts);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
