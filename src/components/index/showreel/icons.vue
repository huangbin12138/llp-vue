<template>
  <div class="fonts">
    <h1>icomoon icon</h1>
    <h5>使用时在名字前加“icon-”</h5>
    <input v-show="isShow" ref="input" v-model="className" name="icon-class" id="icon-class" readonly/>
    <div class="button pof" :class="{active: search}">
      <div class="poa input">
        <input v-model="searchStr" type="text" ref="search" class="input-inner" @blur="searchClick">
      </div>
      <i class="icon-search" @click="searchClick"></i>
    </div>
    <ul class="clearfix">
      <li @click="getClass(icon[0])" :title="icon[0] + '：' + icon[1]" class="clearfix"
          v-if="new RegExp(searchStr).test(icon[0].replace('icon-', ''))" v-for="icon in fonts"
          :key="icon[1]">
        <div :class="icon[0]">
          <div>{{icon[0].replace('icon-', '')}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        fonts: [],
        search: false,
        searchStr: '',
        className: '',
        isShow: false,
        msg: 'hello'
      }
    },
    props: {
      //
    },
    methods: {
      getClass(name) {
        if (!document.execCommand) return this.$toast('当前浏览器不支持复制');
        this.isShow = true;
        this.className = name;
        setTimeout(() => {
          this.$refs.input.select();
          document.execCommand('copy') ? this.$toast({
            content: '复制成功<br />' + name
          }) : this.$toast('复制失败');
          this.isShow = false;
        }, 0);
      },
      searchClick(e) {
        if(e.type === 'blur') return;
        this.search = !this.search;
        this.search && this.$refs.search.focus();
      }
    },
    created() {
      this.$ajax('', {
        type: 'getFileString',
        file_name: 'fonts.less'
      }).then(res => {
        res.replace(/\.icon-[^]*?;/g, (e, k) => {
          this.fonts.push(e.slice(1, -2).split(/:[^]+"/));
        });
        this.fonts.sort();
        /*let str = '';
        this.fonts.map((e) => {
          str += `.add-icon("${e[0].replace('icon-', '')}", "${e[1]}");\n\n`;
        });
        console.log(str);*/
      })
    }
  }
</script>

<style scoped lang="less">
  @import "../../../less/global";

  #icon-class {
    position: absolute;
    opacity: 0;
    z-index: -1000;
  }

  .button {
    right: 1rem;
    transform: translateY(-50%);
    top: 50%;
    width: 2rem;
    line-height: 2rem;
    opacity: .6;
    border-radius: 50%;
    transition: all .3s;
    z-index: 100;
    .bubble-default(@bgcolor);
    &.active {
      opacity: 1;
      .input {
        width: 20rem;
        padding-left: 1rem;
        padding-right: 2.2rem;
        .input-inner {
          opacity: 1;
        }
      }
    }
    .input {
      .t;
      .r;
      .bubble-default(@bgcolor);
      box-sizing: border-box;
      height: 2rem;
      width: 2rem;
      z-index: -1;
      padding: 0;
      transition: all .3s;
      border: 1px @bgcolor solid;
      border-radius: 1rem;
      overflow: hidden;
      .input-inner {
        color: @color;
        opacity: 0;
        overflow: hidden;
        font-size: 1.5rem;
        box-sizing: border-box;
        border-radius: 1rem;
        background: none;
        width: 100%;
        border: 0;
        line-height: 2rem;
        outline: 0;
      }
    }
  }

  ul {
    text-align: center;
    li {
      background-color: lighten(@bgcolor, 20%);
      position: relative;
      float: left;
      height: 6rem;
      margin: 1%;
      box-sizing: border-box;
      width: 23%;
      transition: all .3s linear;
      .media-width(48%, 23%, 23%);
      > div {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 2.5rem;
        div {
          margin-top: .3rem;

          font-size: .5rem;
        }
      }
      &:hover {
        background-color: lighten(@bgcolor, 15%);
        transform: scale(1.02);
      }
    }
  }
</style>
