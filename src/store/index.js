import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

import other from './other'

export default new vuex.Store({
  state: {
    // $store.state
    url: 'http://llp.com/php',
    defaultImg: require('@/assets/logo.png'),
    show: false,
    num: 0
  },
  modules: {
    // $store.state.对象
    other: other
  },
  getters: {
    // 用于存放与state内已有属性相关联的属性
    // $store.getters.属性
    notShow(state){ // state 等同于$store.state
      return !state.show;
    },
    notOtherShow(state){
      return !state.other.otherShow;
    }
  },
  mutations: {
    // 一般用来存放同步操作（方法）
    // mutations中的方法不分组件 ，在不同的state对象中定义同名mutations方法，在触发时会调用所有同名方法
    // 用$store.commit('方法名') 调用
    // 操作多个state状态
    someStateChange(state) { // state等同于$store.state
      state.show = !state.show;
      state.other.otherShow = !state.other.otherShow;
      // ...
    },
    // ...
  },
  actions: {
    // 一般用来存放异步操作
    // 用于操作多个mutations方法
    // $store.dispatch('方法名')
    someMutationsActive(context) { // context等同于$store
      context.commit('someStateChange');
      // ...
    },
    // ...
  }
})
