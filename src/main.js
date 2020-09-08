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
        const {userList, gender} = this
        if(gender === '') {
          return userList
        }else if(gender === 'male') {
          return userList.filter(user => user.gender === '男')
        }else if(gender === 'female') {
          return userList.filter(user => user.gender === '女')
        }
        return userList
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
        <!--  不需要加this 可省略this.gender    -->
        <button @click="gender =''">全部</button>
        <button @click="gender ='male'">男</button>
        <button @click="gender ='female'">女</button>
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
    // DRY 重复代码 使用computed重构
    showMale() {
      // 用 computed 计算gender 来代替
      // this.displayUsers = this.userList.filter(user => user.gender === '男')
      this.gender = 'male'
    },
    showFemale() {
      // 用 computed 计算gender 来代替
      // this.displayUsers = this.userList.filter(user => user.gender === '女')
      this.gender = 'female'
    },
    showAll() {
      // 用 computed 计算gender 来代替
      // this.displayUsers = this.userList
      this.gender = ''
    },
    // setGender 代替以上三个函数
  }
}).$mount('#app')
