// import Vue from 'vue'
// import App from './App.vue'
const Vue = window.Vue
Vue.config.productionTip = false

let id = 0
const createUser = (name, gender) => {
  id += 1
  return {id: id, name: name, gender: gender}
}
new Vue({
  data() {
    return {
      user: {
        email: "FrankFang",
        nickname: "方",
        phone: "13812312312"
      },
      userList: [
        createUser("方方", "男"),
        createUser("圆圆", "女"),
        createUser("小新", "女"),
        createUser("小葵", "女"),
      ],

      // DRY 重复代码 使用computed重构displayUsers
      /* displayUsers: [],*/

      // 初始化gender，根据gender筛选结果result
      gender: '',
    }
  },
  // created 实例出现在内存中，而未出现在页面中
  // 创建时 复制一份原始数据用来展示
  // DRY 重复代码 使用computed重构displayUsers时不需要
  /*
  created() {
    this.displayUsers = this.userList
  },
  */
    computed: {
      /*
      displayName() {
        const user = this.user
        return user.nickname || user.email || user.phone
      },
      */
      displayName: {
        get() {
          const user = this.user
          return user.nickname || user.email || user.phone
        },
        set(value) {
          console.log(value)
          return this.user.nickname = value
        },
      },
      displayUsers() {
        console.log('计算了一次')
        // 哈希映射
        const hash = {
          male: '男',
          female: '女'
        }
        const {userList, gender} = this
        if(gender === '') {
          return userList
        }
        /*
        else if(gender === 'male') {
          return userList.filter(user => user.gender === '男')
        }else if(gender === 'female') {
          return userList.filter(user => user.gender === '女')
        }
        */
        /*
        else if(gender === 'male' || gender === 'female') {
          return userList.filter(user => user.gender === hash[gender])
        }
        */
        else if(typeof gender === 'string') {
          return userList.filter(user => user.gender === hash[gender])
        }else{
          throw new Error('gender的值是意外的值')
        }
      },
  },
  // DRY 原则
  // 用 computed 来计算 displayName 代替模板中的 user.nickname || user.email || user.phone
  template: `
    <div>
      {{displayName}}
      <div>
        {{displayName}}
      </div>
      {{displayName}}
    <button @click="set">set</button>
      <br/>
      <br/>
      <div>
        <!--
        <button @click="showAll">全部</button>
        <button @click="showMale">男</button>
        <button @click="showFemale">女</button>
        -->
        <!--  不需要加this 可省略methods中的三个方法 直接改变this.gender    -->
        <!--
        <button @click="gender =''">全部</button>
        <button @click="gender ='male'">男</button>
        <button @click="gender ='female'">女</button>
        -->
        <button @click="setGender('')">全部</button>
        <button @click="setGender('male')">男</button>
        <button @click="setGender('female')">女</button>
        <ul>
<!--      <li v-for="u in userList" :key="u.id">   -->
          <li v-for="(u, index) in displayUsers" :key="index">
            {{u.name}} - {{u.gender}}
          </li>
        </ul>
      </div>
    </div>
  `,
  methods: {
    set() {
      console.log('set')
      this.displayName = '圆圆'
    },
    // 在template中改变属性的选择条件，自动计算 改变内容
    /*
    // DRY 重复代码 使用computed重构
    showMale() {
      // 用 computed 计算属性 根据不同的gender显示userList内容 来代替
      // this.displayUsers = this.userList.filter(user => user.gender === '男')
      this.gender = 'male'
    },
    showFemale() {
      // 用 computed 计算属性 根据不同的gender显示userList内容 来代替
      // this.displayUsers = this.userList.filter(user => user.gender === '女')
      this.gender = 'female'
    },
    showAll() {
      // 用 computed 计算属性 根据不同的gender显示userList内容 来代替
      // this.displayUsers = this.userList
      this.gender = ''
    },
    */
    // setGender 代替以上三个函数
    setGender(string) {
      this.gender = string
    }
  }
}).$mount('#app')

// Computed 缓存原理
let obj1 = {
  姓: "高",
  名: "圆圆",
  get 姓名() {
    console.log('计算了一次，将姓与名相加')
    return this.姓 + this.名;
  },
  set 姓名(xxx){
    this.姓 = xxx[0]
    this.名 = xxx.slice(1)
  },
  age: 18
};

console.log(obj1.姓名)
console.log(obj1.姓名)
console.log(obj1.姓名)

console.log('----------------') // 精髓

// 杠精说：为什么每次都要重新计算？如果计算很复杂，不就很浪费时间吗？
// 那就缓存一下吧
// 缓存是啥？就是哈希表
const cache = {} // {'高':{'圆圆': '高圆圆'}}
let obj2 = {
  姓: "高",
  名: "圆圆",
  get 姓名() {
    // 由于对象不支持 ['高','圆圆'] 数组作为 key，只能变通一下
    if(this.姓 in cache && this.名 in cache[this.姓]){
      console.log('有缓存，不再计算')
      return cache[this.姓][this.名]
    }
    // 如果 cache[this.姓] 不存在，就赋值为 {}
    // 如果 cache[this.姓] 存在，就赋值为它自己（相当于什么都不做）
    cache[this.姓] = cache[this.姓] || {} // 保底值
    cache[this.姓][this.名] = this.姓 + this.名
    console.log('计算了一次，将姓与名相加')
    return cache[this.姓][this.名];
  },
  set 姓名(xxx){
    this.姓 = xxx[0]
    this.名 = xxx.slice(1)
  },
  age: 18
};

console.log(obj2.姓名)
console.log(obj2.姓名)
console.log(obj2.姓名)