"use strict";

// import Vue from 'vue'
// import App from './App.vue'
var Vue = window.Vue;
Vue.config.productionTip = false;
new Vue({
  data: function data() {
    return {
      user: {
        email: "FrankFang",
        nickname: "方",
        phone: "13812312312"
      }
    };
  },
  computed: {
    displayName: function displayName() {
      var user = this.user;
      return user.nickname || user.email || user.phone;
    }
  },
  // DRY 原则
  // 用 computed 来计算 displayName 代替模板中的 user.nickname || user.email || user.phone
  template: "\n    <div>\n      {{displayName}}\n      div\n      {{displayName}}\n    </div>\n  "
}).$mount('#app');