// import Vue from 'vue'
// import App from './App.vue'
const Vue = window.Vue
Vue.config.productionTip = false

import Computed from './components/Computed.vue'
new Vue({
  render: h => h(Computed)
}).$mount('#computed')

import Watch from './components/Watch.vue'
new Vue({
  render: h => h(Watch)
}).$mount('#watch')

import WatchMockComputed from './components/WatchMockComputed.vue'
new Vue({
  render: h => h(WatchMockComputed)
}).$mount('#watchMockComputed')

import WatchDeep from './components/WatchDeep.vue'
new Vue({
  render: h => h(WatchDeep)
}).$mount('#watchDeep')

import WatchOfficialExample from './components/WatchOfficialExample.vue'
new Vue({
  render: h => h(WatchOfficialExample)
}).$mount('#watchOfficialExample')

/*
const vmWatchDeep = new Vue({
  template: `
    <div>
      <hr>
      <button @click="n += 1">n + 1</button>
      <button @click="m += 1">m + 1</button>
      <button @click="obj.a += 'hi'">obj.a + 'hi'</button>
      <button @click="obj1.a += 'ho'">obj1.a + 'ho'</button>
      <button @click="obj = {a: 'a'}">obj = 新对象</button>
    </div>
  `,
  name: 'WatchDeep',
  data() {
    return {
      n: 0,
      m: 0,
      obj: {
        a: "a"
      },
      obj1: {
        a: "a"
      },
    }
  },
  watch: {
    n() {
      console.log("n 变了")
    },
    obj() {
      console.log("obj 变了")
    },
    "obj.a": function() {
      console.log("obj.a 变了")
    },
    obj1: {
      handler() {
        console.log('obj1变了')
      },
      deep: true,
    },
    "obj1.a": function() {
      console.log("obj1.a 变了")
    },
  }
}).$mount('#watchDeep')

vmWatchDeep.$watch('n', function() {
  console.log("n 也变222了")
},{immediate: true})

vmWatchDeep.$watch('m', function() {
  console.log("m 也变了")
},{immediate: true})
*/


