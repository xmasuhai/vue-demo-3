<template>
<div>
  <h2>watch文档实示例</h2>
  a: {{a}}
  <hr>
  b: {{b}} 无缓存 数据不变不触发回调
  <hr>
  c: {{JSON.stringify(c)}}
  <hr>
  d: {{d.toLocaleString()}}
  <hr>
  e: {{e}}
  <hr>
  e.f: {{e.f}}
  <hr>
  e.f.g: {{e.f.g}}
  <hr>
  <button @click="changeData">数据变更 请查看后台</button>
</div>
</template>

<script>
export default {
  data() {
    return {
      a: 1,
      b: 2,
      c: {
        "three": {
          "san": 3
        }
      },
      d: 4,
      e: {
        f: {
          g: 5
        }
      }
    }
  },
  watch: {
    // [key: string]: Function
    a: function (val, oldVal) {
      console.log('new value of a: %s, old value: %s', val, oldVal)
    },
    // [key: string]: string // 方法名
    b: 'someFunctionInMethod',
    // [key: string]: Object
    // deep 属性：该回调函数会在任何被侦听的对象的 property 改变时被调用，不论其被嵌套多深
    c: {
      handler: function (val, oldVal) {
        console.log('new value of c: %s, old value: %s', val, oldVal)
      },
      deep: true
    },
    // immediate属性：该回调将会在侦听开始之后被立即调用
    d: {
      handler: 'someMethod',
      immediate: true
    },
    // [key: string]: Array
    // 可传入回调数组，它们会被逐一调用
    e: [
      'handle1',
      function handle2(val, oldVal) {
        console.log('new value of e by handle2 %s, old value: %s', val, oldVal)
      },
      {
        handler: function handle3(val, oldVal) {
          console.log('new value of e by handle3: %s, old value: %s', val, oldVal)
        },
      }
    ],
    // watch vm.e.f's value: {g: 5}
    'e.f': function (val, oldVal) {
      console.log('new value of e.f: %s, old value: %s', val, oldVal)
    }

  },
  methods: {
    someMethod(val, oldVal) {
      console.log('-----------------');
      console.log('new value of d immediate: %s, old value: %s', val, oldVal)
    },
    someFunctionInMethod(val, oldVal) {
      console.log('new value of b: %s, old value: %s', val, oldVal)
    },
    handle1(val, oldVal) {
      console.log('new value of e by handle1: %s, old value: %s', val, oldVal)
    },
    changeData() {
      this.a = (this.a === 10) ? 1 : 10
      this.b = 2
      this.c = null
      this.d = 4n
      this.e = {
        f: {
          g: 5
        }
      }
      this.f = null
      console.log('-----------------');
    },
  }
}
</script>

<style scoped>

</style>
