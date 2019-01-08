<template>
  <div class="table tal bsb">
    <div class="header flex">
      <div style="flex: 5">头像/用户名</div>
      <div style="flex: 4">昵称</div>
      <div style="flex: 2">操作 <span class="fr">+</span></div>
    </div>
    <div class="item-box">
      <div class="item flex" v-for="(item, ind) in 3" :key="ind">
        <div style="flex: 5">
          <img src="../images/logo-v1.png" alt="" class="vam avatar circle">
          <span>username</span>
        </div>
        <div style="flex: 4">nickname</div>
        <div style="flex: 2">
          <i class="icon-bin"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "glTable"
  }
</script>

<style scoped lang="less">
  @import "../less/global";

  .table {
    .item-box {
      padding: 0 .5rem;
      max-height: calc(100vh - 6.75rem);
      overflow-y: auto;
    }
    .header {
      box-shadow: 0 .2rem .2rem darken(@bgcolor, 5%);
      font-weight: bold;
      font-size: 1rem;
      padding: 0 .5rem;
      line-height: 2rem;
      .fr {
        padding: 0 .5rem;
      }
    }
    .avatar {
      width: 2rem;
      height: 2rem;
      .border;
    }
    .item {
      align-items: center;
      padding: .5rem 0;
      border-bottom: 1px @bdcolor dotted;
      &:last-child {
        border: 0;
        margin-bottom: 2rem;
      }
      div {
        .wot;
        padding-right: .2rem;
      }
      > :last-child {
        i {
          padding: .5rem;
        }
      }
    }
  }
</style>
