<template>
  <div class="users">
    <div class="filter tal">
      <select :value="uType" name="" class="fr">
        <option value="">-- 选择用户类型 --</option>
        <option v-for="(item, ind) in uTypeList" :key="ind" :value="item.value">{{item.name}}</option>
      </select>
      <select :value="uStatus" name="">
        <option value="">-- 选择用户状态 --</option>
        <option v-for="(item, ind) in uStatusList" :key="ind" :value="item.value">{{item.name}}</option>
      </select>
      <button class="fr vam">查找 <i class="icon-search"></i></button>
      <input type="text" :value="searchStr" placeholder="请输入关键字">
    </div>
    <div class="table tal bsb">
      <div class="header flex" ref="header">
        <div style="flex: 5">头像/用户名</div>
        <div style="flex: 4">昵称</div>
        <div style="flex: 2">操作 <span class="fr" @click="addUser">+</span></div>
      </div>
      <div class="item-box" @scroll="lower">
        <div class="item flex" @click="itemClick(item, ind)" v-for="(item, ind) in userList" :key="ind">
          <div style="flex: 5">
            <img src="../../images/logo-v1.png" alt="" class="vam avatar circle">
            <span>username</span>
          </div>
          <div style="flex: 4">nickname</div>
          <div style="flex: 2">
            <i class="icon-bin"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="curtain" v-show="showDetail" @click="toggleShowDetail">
      <div class="user-detail fix-mc" @click.stop="nothing">
        <i class="sure icon-checkmark poa r b" @click="edit" v-show="isEdit"></i>
        <i class="cancel icon-cross poa l b" @click="toggleEdit" v-show="isEdit"></i>
        <i class="edit icon-pen poa r t" @click="toggleEdit" v-show="!isEdit"></i>
        <div class="avatar fl">
          <i v-if="!currUser.avatar" class="icon-image" style="opacity: .4"></i>
          <img v-else :src="currUser.avatar" alt="">
        </div>
        <div class="username tal">
          <label>用户名：</label>
          <input :value="currUser.username" :readonly="!isEdit" type="text" placeholder="请输入用户名">
        </div>
        <div class="nickname tal">
          <label>昵称：</label>
          <input :value="currUser.nick_name" :readonly="!isEdit" type="text" placeholder="请输入昵称">
        </div>
        <div class="qq tal">
          <label>QQ：</label>
          <input :value="currUser.qq" :readonly="!isEdit" type="text" placeholder="请输入qq号码">
        </div>
        <div class="phone tal">
          <label>电话：</label>
          <input :value="currUser.phone" :readonly="!isEdit" type="text" placeholder="请输入电话号码">
        </div>
        <div class="email tal">
          <label>电子邮箱：</label>
          <input :value="currUser.email" :readonly="!isEdit" type="text" placeholder="请输入电子邮箱">
        </div>
        <div class="u-type tal">
          <label>用户类型：</label>
          <select :value="currUser.user_type" name="" :disabled="!isEdit">
            <option :value="undefined">-- 选择用户类型 --</option>
            <option v-for="(item, ind) in uTypeList" :key="ind" :value="item.value">{{item.name}}</option>
          </select>
        </div>
        <div class="u-status tal">
          <label>用户状态：</label>
          <select :value="currUser.user_status" name="" :disabled="!isEdit">
            <option :value="undefined">-- 选择用户状态 --</option>
            <option v-for="(item, ind) in uStatusList" :key="ind" :value="item.value">{{item.name}}</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "users",
    data() {
      return {
        showDetail: false,
        isEdit: false,
        userList: [],
        uType: '',
        uTypeList: [],
        uStatus: '',
        uStatusList: [],
        currUser: {},
        searchStr: '',

        curr: 1,
        limits: 15,
      }
    },
    methods: {
      getUserList(init){
        if(init === true){
          this.curr = 1;
          this.limits = 15;
        }
        this.$ajax('', {
          type: 'get_user_list',
          curr: this.curr,
          limits: this.limits,
          search: this.searchStr,
          user_status: this.uStatus,
          user_type: this.uType
        }).then(res => {
          //
        }).catch(this.$err);
      },
      toggleShowDetail(bool) {
        this.showDetail = !this.showDetail;
        this.isEdit = false;
      },
      toggleEdit(bool) {
        this.isEdit = !this.isEdit;
      },
      itemClick(item, index) {
        this.currUser = Object.assign({}, item);
        this.toggleShowDetail();
      },
      edit(item) {
        this.toggleEdit();
        this.toggleShowDetail();
      },
      addUser() {
        this.currUser = {};
        this.toggleShowDetail();
      },
      add(){
        this.toggleEdit();
        this.toggleShowDetail();
      },
      lower(e){
        let {
          scrollHeight: sh,
          scrollTop: st,
          clientHeight: ch,
          scrollWidth: sw,
          scrollLeft: sl,
          clientWidth: cw,
        } = e.target;
        if(sh === st + ch){
          // lower
        }
      }
    },
    created(){
      this.getUserList();
      // console.log(this.$refs);
    },
    mounted(){
      // console.dir(this.$refs.header);
    }
  }
</script>

<style scoped>

</style>
