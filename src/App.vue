<template>
  <div id="app">
    <transition name='transitionName'>
      <router-view/>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        transitionNames: ['fade'],
        transitionName: ''
      }
    },
    watch: {
      '$route' () {
        let i = (this.transitionNames.length * Math.random()) | 0;
        this.transitionName = this.transitionNames[i];
      }
    }
  }
</script>
