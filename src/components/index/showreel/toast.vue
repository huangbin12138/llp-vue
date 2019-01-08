<template>
  <div class="base-toast">
    <div class="tac">
      <div>
        <button @click="test('top')">上面</button>
        <button @click="test('middle')">中部</button>
        <button @click="test('bottom')">下面</button>
        <button @click="noClose">不自动关闭</button>
        <button @click="test('middle', 'icon-images')">带图标</button>
        <button @click="test('top', '','<span style=\'color: yellowgreen\' class=\'icon-images\'>some html code</span>')">html片段</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "base-toast",
    data() {
      return {
        isShow: false,
        msg: 'show',
        classs: ['toast']
      }
    },
    created() {
      this.classs.push(this.position);
    },
    methods: {
      test(position, iconClass, html) {
        this.$toast({
          msg: 'hello ' + position,
          iconClass: iconClass,
          content: html,
          position: position
        });
      },
      noClose(){
        this.$toast({
          msg: 'do not close',
          duration: 0
        });
      }
    }
  }
</script>
