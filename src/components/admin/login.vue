<template>
  <div class="admin-login">
    <h3 class="tal">后台登录</h3>
    <div class="form">
      <div class="username">
        <label for="username" class="">用户名：</label>
        <input v-model="username" placeholder="请输入用户名" id="username" class="username" type="text">
      </div>
      <div class="password">
        <label for="password" class="">密码：</label>
        <input v-model="password" placeholder="请输入密码" id="password" class="password" type="password">
      </div>
      <div class="btn">
        <span @click="closeLogin">取消</span>
        <span @click="login">登录</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    data(){
      return {
        username: '',
        password: '',
      }
    },
    methods: {
      closeLogin(){
        let go = localStorage.getItem('goBack') || -1;
        localStorage.removeItem('goBack');
        this.$router.go(go);
      },
      login(){
        let {username, password} = this;
        if(!username) {
          return this.$toast('请填写用户名！');
        }
        if(!password) {
          return this.$toast('请填写密码！')
        }
        this.$ajax('', {
          username,
          password,
          type: 'login',
          login_type: 1
        }).then(res => {

        }).catch(this.$err);
      }
    },
  }
</script>

<style scoped lang="less">

</style>
