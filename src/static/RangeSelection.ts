/**
 * 提供通用的光标操作、Selection和Range API，以及内容插入
 */
export default class RangeSelection {
  public selection = window.getSelection()

  /**
   * 设置当前光标的位置
   * @param dom 被设置光标的dom元素，如果不是文本节点，则会设置到其子节点上；如果是文本节点，则设置到其文本内容上
   * @param pos 位置
   */
  public setCaretPosition(dom: Element, pos: number) {
    if(!this.selection) {
      this.selection = window.getSelection()
    }
    this.selection && this.selection.setPosition(dom, pos)
  }

  /**
   * 获取当前光标的位置，返回光标所在的节点及其偏移；如果不是文本节点其偏移为0
   */
  public getCaretPosition() {
    if(this.selection) {
      return [this.selection.anchorNode, this.selection.anchorOffset]
    }
    return []
  }

  /**
   * 在当前光标的位置插入内容
   * @param content 插入的内容
   */
  public insertContentBefore(content: string) {
    const [aNode, aOffset] = this.getCaretPosition() as [Node, number]
    if(!aNode || aOffset === undefined) {
      return false
    }
    const range = this.selection && this.selection.getRangeAt(0)
    if(!range) {
      return false
    }
    const aParent = aNode.parentNode
    const div = document.createElement('div')
    const before = aNode.textContent && aNode.textContent.substring(0, aOffset)
    const after = aNode.textContent && aNode.textContent.substring(aOffset)
    div.innerText = `${before}\n${content}\n${after}`
    return aParent && aParent.replaceChild(div, aNode)
  }
}
