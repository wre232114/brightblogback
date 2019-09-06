<template>
  <section>
    <header class="edit-panel-options"></header>
    <article class="edit-panel-editor">
      <textarea @input="handleInput" id="editor"></textarea>
    </article>
    <article class="edit-panel-preview" @click="handleClick" v-html="preview" id="preview"></article>
  </section>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator'
import marked from 'marked'

// Set options
// `highlight` example uses `highlight.js`
marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function(code) {
    return require('highlight.js').highlightAuto(code).value;
  },
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
});

@Component
export default class MarkDown extends Vue {
  preview: string = '';
  handleInput(e: any) {
    let mark = marked(e.target.value)
    
    this.preview = mark
  }
  handleClick() {
    console.log(this)
  }
}
</script>
<style lang="scss" scoped>
.edit-panel-editor {
  box-sizing: border-box;
  width: 50%;
  float: left;
  #editor {
    box-sizing: border-box;
    width: 100%;
    min-height: 200px;
  }
}

.edit-panel-preview {
  box-sizing: border-box;
  width: 50%;
  float: left;
  min-height: 200px;
  border: 1px solid #eaeaea;
}
</style>