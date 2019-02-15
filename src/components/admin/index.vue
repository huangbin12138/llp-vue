<template>
  <div class="admin-index">
    <div id="logo">
      <img class="vam" src="../../images/logo-v1.png">
    </div>
    <div class="menu">
      <div class="item" v-for="(item, ind) in menu" :key="ind">
        <div class="title" @click="toNext(item.path)">{{item.title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "admin",
    data(){
      return {
        msg: '',
        menu: [
          {title: '用户管理', path: 'users'},
          // {title: '字典管理', path: '/'},
          {title: '网站管理', path: ''},
          {title: '数据库管理', path: 'editdatabase'}
        ]
      }
    },
    methods: {
      toNext(path){
        this.$router.push('admin/' + path);
      },
    },
    beforeCreate(){
    },
    created(){},
  }
</script>

<style scoped>

</style>
