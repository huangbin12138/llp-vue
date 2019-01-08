<template>
  <div>
    <div>
      <button type="button" @click="prev">prev</button>
      <button type="button" @click="next">next</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'test',
    data() {
      return {
        steps: [{
          title: '第一步',
          name: ''
        },
        {
          title: '第二步',
          name: ''
        },
        {
          title: '第三步',
          name: ''
        }],
        activeStep: 1,
        cardSrc: require('@/assets/logo.png'),
        msg: 'test',
        show: false,
        alertShow: false,
      }
    },
    watch: {
      //
    },
    created() {
      //
    },
    methods: {
      next() {
        this.show = !this.show;
        if(this.activeStep >= this.steps.length) return;
        this.activeStep ++;
        console.log(this.activeStep);
      },
      isShow(val) {
        if(!val) {
          this.show = val;
        }
      },
      prev() {
        this.alertShow = true;
        if(this.activeStep <= 1) return;
        this.activeStep --;
        console.log(this.activeStep);
      }
    }
  }
</script>

<style>

</style>
