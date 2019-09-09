<template>
  <section>
    <header class="edit-panel-options">
      <ul class="list">
        <li class="list-item"><button title="撤销，ctrl+z"><i class="fas fa-undo"></i></button></li>
        <li class="list-item"><button title="重做，ctrl+y"><i class="fas fa-redo"></i></button></li>
        <li class="list-item"><button title="加粗，ctrl+b"><i class="fas fa-bold"></i></button></li>
        <li class="list-item"><button title="下划线，ctrl+u"><i class="fas fa-underline"></i></button></li>
        <li class="list-item"><button title="删除线，ctrl+t"><i class="fas fa-strikethrough"></i></button></li>
        <li class="list-item"><button title="斜体，ctrl+i"><i class="fas fa-italic"></i></button></li>
        <li class="list-item"><button title="标题，ctrl+1,2,..."><i class="fas fa-heading"></i></button></li>
        <li class="list-item"><button title="无序列表，ctrl+shift+l"><i class="fas fa-list-ul"></i></button></li>
        <li class="list-item"><button title="有序列表，ctrl+shift+u"><i class="fas fa-list-ol"></i></button></li>
        <li class="list-item"><button title="引用，ctrl+shift+q"><i class="fas fa-quote-left"></i></button></li>
        <li class="list-item"><button title="代码，ctrl+shift+c"><i class="fas fa-code"></i></button></li>
        <li class="list-item"><button title="表格，table+shift+t"><i class="fas fa-table"></i></button></li>
        <li class="list-item"><button title="链接，ctrl+shift+k"><i class="fas fa-link"></i></button></li>
        <li class="list-item"><button title="图片，ctrl+shift+i"><i class="fas fa-image"></i></button></li>
        <li class="list-item"><button title="导出，ctrl+shift+e"><i class="fas fa-file-export"></i></button></li>
        <li class="list-item"><button title="导入，ctrl+shift+m"><i class="fas fa-file-import"></i></button></li>
        <li class="list-item"><button title="保存，ctrl+s"><i class="fas fa-save"></i></button></li>
        <li class="list-item"><button title="摘要，ctrl+a"><i class="fas fa-file-alt"></i></button></li>
        <li class="list-item"><button title="复制选中"><i class="fas fa-copy"></i></button></li>
        <li class="list-item"><button title="粘贴"><i class="fas fa-paste"></i></button></li>
      </ul>
    </header>
    <section class="edit-container">
      <article class="edit-panel edit-panel-editor" id="editor" @input="handleInput" contenteditable></article>
      <article class="edit-panel edit-panel-preview markdown-body" @click="handleClick" v-html="preview" id="preview"></article>
    </section>
  </section>
</template>
<script lang="ts">
// ts对于vue的属性注解支持
import { Component, Vue} from 'vue-property-decorator'
// markdown编译器
import marked from 'marked'
// 依赖的css
import 'normalize.css'
import '../static/reset.css'
import 'github-markdown-css'
import 'highlight.js/styles/atom-one-dark.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

// 封装的操作复制粘贴和设置选择的API
import CopySelection from '../static/CopySelection'

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
  copysel = new CopySelection();

  handleInput(e: any) {
    let mark = marked(e.target.innerText)
    this.preview = mark
  }
  handleClick() {
    let editorDom = document.getElementById('editor')
    if (editorDom) {
      this.copysel.setCaretPosition(editorDom, 20)
    }
  }
  mounted() {
    console.log(this.copysel.selection)
  }
}
</script>
<style lang="scss" scoped>
// scss变量，用于markdown.vue
$md-editor-background: #f5f5f5;
$color-white: #fff;
$md-editor-options-background: #e0e0e0;
$md-editor-options-hover: #999;

.edit-panel-options {
  background: $md-editor-options-background;
  padding: 4px 0;
  .list {
    height: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
    .list-item {
      display: inline-block;
      text-align: center;
      color: rgba(0, 0, 0, 0.25);
      & > button {
        width: 40px;
        height: 36px;
        line-height: 40px;
        font-size: 18px;
        border-radius: 4px;
        &.letter {
          font-weight: bold;
          font-size: 22px;
        }
        &:hover {
          background: $md-editor-options-hover;
          color: $md-editor-options-background;
        }
      }
      &:first-child {
        margin-left: 20px;
      }
    }
  }
}
.edit-container {
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  .edit-panel {
    min-width: 200px;
    max-width: 980px;
    padding: 10px 20px 178px;
  }
  .edit-panel-editor {
    resize: horizontal;
    flex: 1;
    resize: horizontal;
    min-height: 100vh;
    background: $md-editor-background;

    &:focus {
      outline: none;
      border: none;
    }
  }

  .edit-panel-preview {
    resize: horizontal;
    min-height: 100vh;
    flex: 1;
    background: $color-white;
  }
}

</style>