<template>
  <div class="toast" @click="close" :class="position" v-if="isShow" :style="{opacity: opacity}">
    <template v-if="iconClass">
      <i :class="iconClass"></i><br>
    </template>
    <div v-if="content" v-html="content"></div>
    <div v-else>{{msg}}</div>
  </div>
</template>

<script>
  export default {
    name: "toast",
    data() {
      return {
        isShow: false,
        opacity: 0
      }
    },
    methods: {
      inits() {
        this.isShow = true;
        setTimeout(() => {
          this.opacity = 1;
          this.duration && setTimeout(this.close, this.duration * 1);
        }, 100);
      },
      close() {
        this.opacity = 0;
        setTimeout(() => {
          this.isShow = false;
        }, 400);
      }
    },
    props: {
      position: {
        type: String,
        default: 'top'
      },
      iconClass: {
        type: String,
        default: ''
        // default: 'icon-connection'
      },
      duration: {
        type: String | Number,
        default: 2000
      },
      content: {
        type: String,
        default: ''
      },
      msg: {
        type: String,
        default: ''
      }
    },
    mounted() {
      this.inits();
    }
  }
</script>

<style scoped lang="less">
  @import "../less/global";

  .toast {
    &.top {
      .fix-c;
      .t;
      margin-top: .5rem;
    }
    &.middle {
      .fix-mc;
    }
    &.bottom {
      .fix-c;
      .b;
      margin-bottom: .5rem;
    }
    transition: all .3s linear;
    min-width: 10%;
    max-width: 75%;
    word-wrap: break-word;
    padding: .5rem 1rem;
    border-radius: .3rem;
    background-color: rgba(0, 0, 0, .6);
    color: #bbb;
    font-weight: bold;
    > i {
      margin: 0 auto;
      max-width: 4rem;
      font-size: 4rem;
      & + br + div {
        max-width: 6rem;
        margin: 0 auto;
      }
    }
  }
</style>
