// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import qs from 'qs'
import {url_api, OK} from './config/config'
import g from './unit'
import './less/style.less'

// 引入组件
const components = [
  require('./base/table'),
];

Vue.config.productionTip = false;

// 使用组件
components.map(e => {
  let com = e.default;
  Vue.component(com.name, com);
});

axios.defaults.method = 'POST';
Vue.prototype.axios = axios;
Vue.prototype.$err = function (err) {
  if(err.code){
    g.$toast(err.msg || '');
  } else {
    g.$toast('网络错误！');
  }
};
Vue.prototype.$ajax = function (url = '', param = {}) {
  param = qs.stringify(param); // post 请求需要对param序列化，“key1=value1&key2=value2&...”
  // url = url || 'index.php';
  return new Promise((resolve, reject) => {
    axios({
      url: url_api + url,
      data: param,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(res => {
      if(res.data.code === OK){
        resolve(res.data.data || res.data.msg);
      } else {
        reject(res.data);
      }
    }).catch(this.$err);
  });
}

Object.assign(Vue.prototype, g);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
