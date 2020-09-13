<template>
  <div>
    <hr/>
    {{n}}
    <hr/>
    <button @click="add1">+1</button>
    <button @click="add2">+2</button>
    <button @click="minus1">-1</button>
    <button @click="minus2">-2</button>
    <hr/>
    <button @click="undo">撤销</button>
    <hr/>
    {{history}}
  </div>
</template>

<script>
export default {
  name: 'watch',
  data() {
    return {
      n: 0,
      history: [],
      inUndoMode: false, // 撤销模式
    }
  },
  watch: {
    n(newValue, oldValue) {
      console.log('now in undo mode ' + this.inUndoMode)
      console.log(`在不在撤销模式：${this.inUndoMode?'在':'不在'}`)
      if (!this.inUndoMode) {
        return this.history.push({ from: oldValue, to: newValue})
      }
    }
  },
  methods: {
    add1() {
      this.n += 1
    },
    add2() {
      this.n += 2
    },
    minus1() {
      this.n -= 1
    },
    minus2() {
      this.n -= 2
    },
    undo() {
      const last = this.history.pop()
      // 开启撤销模式
      this.inUndoMode = true
      console.log('now in undo mode ' + this.inUndoMode)
      console.log(`在不在撤销模式：${this.inUndoMode?'在':'不在'}`)
      const old = last.from
      // watch 的函数是异步的 this.n = old 也会被监听到
      // 等到同级的同步代码执行完毕再去执行 watch的代码
      this.n = old
      this.$nextTick(() => {
        this.inUndoMode = false
      }, 0)
    }
  }
}
</script>

<style scoped>

</style>