// 设置光标
export function setSelection(el, offset) {
  if (window.getSelection) {
    // 设置焦点
    if (!el.firstChild) {
      el.focus();
      return;
    }
    // 获取选中信息对象
    var sel = window.getSelection();
    // 创建一个范围对象,初始范围的左右边界点都是文档开头
    var range = document.createRange();
    if (offset !== undefined) {
      //把该范围的开始点设置为指定的节点中的指定偏移量
      range.setStart(el.firstChild, offset);
      // range.setEnd(el.firstChild, 1);        
    } else {
      // 定位到末尾
      range.selectNodeContents(el);
      range.collapse(false);
    }

    sel.removeAllRanges();
    // 重新添加一个新的范围对象
    sel.addRange(range);
  } else {
    console.warn('浏览器不支持window.getSelection');
  }
}