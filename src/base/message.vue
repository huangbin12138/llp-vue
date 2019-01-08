<template>
  <div class="message curtain" v-if="isShow">
    <div class="message-box abs-mc">
      <div class="title">{{title}}</div>
      <div class="content" v-html="html" v-if="html"></div>
      <div class="content" v-else>{{content}}</div>
      <div class="button">
        <span v-if="cancelText" @click="cancelClick">{{cancelText}}</span>
        <span @click="sureClick">{{sureText}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "message",
    data() {
      return {
        isShow: true,
        opacity: 0
      }
    },
    methods: {
      cancelClick(){
        this.$emit('cancelCallback');
        this.isShow = false;
      },
      sureClick(){
        this.$emit('sureCallback');
        this.isShow = false;
      }
    },
    props: {
      title: {
        type: String,
        default: '提示'
      },
      cancelText: {
        type: String,
        default: ''
        // default: 'icon-connection'
      },
      sureText: {
        type: String,
        default: '确定'
      },
      content: {
        type: String,
        default: ''
      },
      html: {
        type: String,
        default: ''
      }
    },
    mounted () {
      //
    }
  }
</script>

<style scoped lang="less">
  @import "../less/global";

  .message {
    .message-box {
      border-radius: .5rem;
      overflow: hidden;
      background-color: #fff;
      width: 70%;
    }
    .title {
      line-height: 2.5;
      font-size: 1.3rem;
      font-weight: bold;
      box-shadow: 0 .05rem .2rem #aaa;
    }
    .content {
      padding: 1.5rem 0;
      font-size: 1rem;
      line-height: 1;
    }
    .button {
      display: flex;
      line-height: 2rem;
      border-top: solid #d0d0d0 .02rem;
      > :nth-child(n) {
        flex: 1;
        & + * {
          border-left: solid #d0d0d0 .01rem;
        }
      }
    }
  }
</style>
