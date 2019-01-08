<template>
  <div class="showreel box" @click="allMove(0)">
    <div :style="{left: item.position[0] + 'px', top: item.position[1] + 'px', opacity: item.opacity}"
         class="showreel-item poa"
         v-for="(item, ind) in pages" :key="ind"
         @click.stop="itemClick(item.link)">
      <span :class="item.iconClass">{{item.title || ''}}</span>
      <div class="mask abs-mc" :style="{maskImage: `url(${img})`, backgroundColor: item.bc}">
        <img :src="img">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "showreel",
    data() {
      return {
        img: require('../../../images/mask_fff.png'),
        pages: [
          {title: 'icons', link: '/showreel/icons', position: [0, 0], opacity: 0, bc: ''},
          {title: 'toast', link: '/showreel/toast', position: [0, 0], opacity: 0, bc: ''},
          {title: 'message', link: '/showreel/message', position: [0, 0], opacity: 0, bc: ''},
          {title: 'admin', link: '/admin', position: [0, 0], opacity: 0, bc: ''},
          {title: 'demo 1', link: '#', position: [0, 0], opacity: 0, bc: ''},
          {title: ' back ', iconClass: 'icon-arrow-left', link: '/', position: [0, 0], opacity: 0, bc: ''}
        ],
        cw: screen.width,
        ch: screen.height
      }
    },
    methods: {
      itemClick(link) {
        if (link === '#') {
          this.allMove();
        } else {
          this.$router.push(link);
        }
      },
      move(index, w) {
        this.pages[index].opacity = 1;
        this.pages[index].bc = this.getRandomColor();
        this.pages[index].position = [
          this.getRandomNum(this.cw - w),
          this.getRandomNum(this.ch - w)
        ];
      },
      allMove(time = 1000) {
        let elements = document.getElementsByClassName('showreel-item');
        for (let i in this.pages) {
          elements[i] && setTimeout(() => {
            this.move(i, elements[i].offsetWidth);
          }, i * time)
        }
      }
    },
    created() {
      //
    },
    mounted() {
      this.allMove(500);
      // console.log(this.pages.indexOf(this.pages[3]));
    }
  }
</script>

<style scoped>

</style>
