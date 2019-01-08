<template>
    <div>
      <div class="mask" :style="{maskImage: 'url(' + src + ')', background: color}">
        <img :src="src">
        <!--<div>
          <div v-for="item in 35" :key="item"></div>
        </div>-->
      </div>
    </div>
</template>

<script>
  export default {
    name: "l-mask",
    data() {
      return {
        //
      }
    },
    props: {
      // 颜色
      color: {
        type: String,
        default: '#fff'
      },
      // 背景图片
      src: {
        type: String,
        default: require('../images/logo-v1.png')
      }
    }
  }
</script>

<style scoped lang="less">
</style>
