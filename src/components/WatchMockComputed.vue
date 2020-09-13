<template>
  <div>
    <hr>
    {{displayName}}
    <button @click="user.nickname=undefined">remove nickname</button>
    <button @click="user.email=undefined">remove email</button>
  </div>
</template>

<script>
export default {
  name: "WatchMockComputed.vue",
  data() {
    return {
      user: {
        email: 'fangfang@qq.com',
        nickname: "rectangle",
        phone: "13812345678",
      },
      displayName: null,
    }
  },
  watch: {
    'user.email': {
        handler: 'changed',
        immediate: true, // 第一次渲染也触发 watch
    },
    'user.nickname': {
        handler: 'changed',
        immediate: true, // 第一次渲染也触发 watch
    },
    'user.phone': {
      handler: 'changed',
      immediate: true, // 第一次渲染也触发 watch
    },
  },
  methods: {
    changed(item) {
      console.log(`item: ${item}`)
      console.log(item === this.displayName)
      console.log(`已知this.displayName: ${this.displayName}`)
      const {user: {email, nickname, phone}} = this
      this.displayName = nickname || email || phone
    },
  },
}
</script>

<style scoped>

</style>