<template>
  <div id="app">
    <div id="nav">
      
    </div>
    <div id="container">
      <router-view/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default Vue.extend({
  components: {
    Header,
    Footer
  }
})
</script>

<style lang="scss">

#nav {
  float: left;
  width: 200px;
  display: flex;
  flex-flow: column nowrap;
}
#container {
  overflow: hidden;
}
</style>
