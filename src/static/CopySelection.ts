export default class CopySelection {
  public selection = window.getSelection()

  /**
   * 设置当前光标的位置
   * @param dom 被设置光标的dom元素
   * @param pos 位置
   */
  public setCaretPosition(dom: Element, pos: number) {
    if (!this.selection) {
      this.selection = window.getSelection()
    }
    this.selection && this.selection.setPosition(dom, pos)
  }

  /**
   * 获取当前光标的位置
   */
  public getCaretPosition() {
    return this.selection && this.selection.getRangeAt(0)
  }
}
