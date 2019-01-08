<template>
  <div class="index">
    <header>
      <div id="logo">
        <img src="../../images/logo-v1.png">
      </div>
    </header>
    <main>
      <div class="por" @click="itemClick(item.type)" v-for="(item, ind) in mains" :key="ind">
        <i v-if="!(ind % 2)" :class="'font-img ' + item.src" ></i>
        <div class="text-box">
          <div class="title">{{item.title}}</div>
          <div class="subtitle">{{item.subtitle}}</div>
        </div>
        <i v-if="ind % 2" :class="'font-img ' + item.src" ></i>
      </div>
    </main>
    <div class="alert" v-show="alertShow">
      <div class="content">
        <span class="close icon-cross"></span>
      </div>
    </div>
    <footer class="clearfix">
      <div class="text-box abs-m l">
        <small>个人网站。。。站网人个</small>
      </div>
      <img src="../../images/logo-v1.png" />
      <img src="../../images/logo-v1.png" />
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        mains: [],
        alertShow: false
      }
    },
    methods: {
      itemClick(type) {
        switch(type) {
          case 'resume':
            console.log('individual resume');
            return;
          case 'skill':
            console.log('my skills');
            break;
          case 'interest':
            console.log('hobbies and interests');
            break;
          case 'showreel':
            this.$router.push('/showreel');
            break;
          default:
            console.log(type);
            break;
        }
      }
    },
    created() {
      // this.$router.push('admin');
      this.mains = [{
          title: '个人简介',
          src: 'icon-user-tie',
          subtitle: 'Individual Resume',
          type: 'resume'
        },
        {
          title: '我的技能',
          src: 'icon-paint-format',
          subtitle: 'My Skills',
          type: 'skill'
        },
        {
          title: '作品集',
          src: 'icon-book',
          subtitle: 'Showreel',
          type: 'showreel'
        },
        {
          title: '兴趣爱好',
          src: 'icon-happy2',
          subtitle: 'Hobbies And Interests',
          type: 'interest'
        }
      ];
    },
    mounted() {
      // return this.$router.push('/admin');

      this.$ajax('', {type: 'a'}).then(res => console.log(res)).catch(this.$err);
    }
  }
</script>
