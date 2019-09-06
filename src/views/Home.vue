<template>
  <div class="home">
    <mark-down/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MarkDown from '../components/Markdown.vue';
@Component({
  components: {
    MarkDown
  },
})
export default class Home extends Vue {}
</script>
