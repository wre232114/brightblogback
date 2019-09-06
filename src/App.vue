<template>
  <div id="app">
    <comp-header/>
    <section id="container">
      <div id="nav">
        
      </div>
      <div id="content">
        <router-view/>
      </div>
    </section>
    <comp-footer/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CompHeader from './components/Header.vue'
import CompFooter from './components/Footer.vue'

export default Vue.extend({
  components: {
    CompHeader,
    CompFooter
  }
})
</script>

<style lang="scss">
#app {
  #container {
    overflow: hidden;
    #nav {
      float: left;
      width: 200px;
      background: #ccc; // 测试用
      height: 100px; // 测试用
    }

    #content {
      overflow: hidden;
    }
  }
}
</style>
