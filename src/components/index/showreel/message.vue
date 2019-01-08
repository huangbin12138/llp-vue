<template>
  <div class="base-message">
    <div class="tac">
      <div>
        <button @click="test">提示</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "base-message",
    data() {
      return {
        //
      }
    },
    created() {
      //
    },
    methods: {
      test() {
        this.$message({
          title: '我提醒你',
          html: `<b>hello</b> <i style="color: red">world</i>`
        });
      }
    }
  }
</script>
