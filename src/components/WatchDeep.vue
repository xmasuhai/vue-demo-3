<template>
  <div>
    <hr>
    <button @click="n += 1">n + 1</button>
    <button @click="m += 1">m + 1</button>
    <button @click="obj.a += 'hi'">obj.a + 'hi'</button>
    <button @click="obj1.a += 'ho'">obj1.a + 'ho'</button>
    <button @click="obj = {a: 'a'}">obj = 新对象</button>
  </div>
</template>

<script>
export default {
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
  created(){
    this.$watch('n', function() {
      console.log("n 也变222了")
    },{immediate: true});

    this.$watch('m', function() {
      console.log("m 也变了")
    },{immediate: true})
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
}

</script>

<style scoped>

</style>