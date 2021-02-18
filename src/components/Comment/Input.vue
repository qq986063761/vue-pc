<template>
  <div class="w-comment-input">
    <div class="textinput-wrap">
      <div
        ref="input"
        class="textinput"
        contenteditable
        v-show="inputing"
        @blur="blur"
        @input="input"
        @paste.prevent="paste"
        @keydown.ctrl.enter="submit"
        @keyup="keyup"
      ></div>
      <div
        class="textinput placeholder"
        contenteditable
        v-show="!inputing"
        @focus="placeholderFocus"
      >
        请输入评论
      </div>
      <!-- 下面是 @ 选项 -->
      <div class="atdropdown" v-show="showUsrs">
        <div
          class="item"
          :key="item"
          v-for="item in atUsrs"
          @click="clickAtItem({ key: item })"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <div class="toolbar">
      <div class="toolbar-left">
        <span class="item" @click="showAtOpts">@</span>
      </div>
      <div class="toolbar-right">
        <span class="tips">Ctrl + Enter 发送</span>
        <button class="submit-btn" type="primary" size="small" @click="submit">
          发送
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { setSelection } from '@/assets/dom'

export default {
  name: 'CommentInput',
  data() {
    return {
      // 是否在输入中
      inputing: false,
      // @ 相关数据
      showUsrs: false,
      atUsrs: ['用户1', '用户2', '用户3'],
    }
  },
  methods: {
    init() {
      const { input } = this.$refs
      input.innerHTML = ''
      this.inputing = false
    },
    placeholderFocus() {
      const { input } = this.$refs
      this.inputing = true
      setTimeout(() => input.focus(), 50)
    },
    // 选择了@选项
    clickAtItem({ key }) {
      const { input } = this.$refs
      let data = [key]
      let html = input.innerHTML
      this.showUsrs = false
      this.inputing = true
      
      // 这里后面的 </span>&nbsp; 结尾是为了能让光标能正常定位到末尾，不然钉钉web应用会有兼容问题光标定位无效
      const addhtml = data
        .map(item => `<span class="at-item" data-userId="${item}" data-name="${item}" onclick="return false;" contenteditable="false">@${item}</span>&nbsp;`)
        .join('')
      
      // 如果没有新增的内容就直接返回
      if (!addhtml) {
        this.inputAt = false
        return
      }

      // 如果是输入 @ 弹出的选人，则清除之前最后一个位置的 @
      if (this.inputAt) {
        // 如果前面存在有用户信息元素就直接获取 html 做处理
        if (this.atPrevEl) {
          const atPrevElHtml = this.atPrevEl.outerHTML + '' // 原字符串
          const atPrevElHtmlAndSpace = atPrevElHtml + '&nbsp;' // 原字符串，包含后面的空格
          const atPrevElHtmlRep = atPrevElHtml + '@' // 用于做替换用，需要移除@
          const atPrevElHtmlAndSpaceRep = atPrevElHtmlAndSpace + '@' // 用于做替换用，需要移除@
          const newHtml = atPrevElHtml + addhtml // 新插入字符串
          const newAndSpaceHtml = atPrevElHtmlAndSpace + addhtml // 新插入字符串

          if (html.match(atPrevElHtmlAndSpaceRep)) {
            html = html.replace(atPrevElHtmlAndSpaceRep, newAndSpaceHtml)
          } else if (html.match(atPrevElHtmlRep)) {
            html = html.replace(atPrevElHtmlRep, newHtml)
          } else {
            if (html[html.length - 1] === '@') html = html.slice(0, html.length - 1)
            html += addhtml
          }
        } else {
          if (html[html.length - 1] === '@') html = html.slice(0, html.length - 1)
          html += addhtml
        }
        this.inputAt = false
      } else {
        html += addhtml
      }

      input.innerHTML = html
      // 定位光标到合适位置
      // if (this.inputAt) {
      //   setSelection(input, 0)
      // } else {
      // }
      setSelection(input)
    },
    showAtOpts() {
      this.atPrevEl = window.getSelection && window.getSelection().focusNode && window.getSelection().focusNode.previousElementSibling
      this.atOffset = window.getSelection && window.getSelection().focusOffset
      if (!this.atOffset && this.atOffset !== 0) this.atOffset = null
      this.showUsrs = true
    },
    keyup(event) {
      // 兼容部分浏览器 input 中的判断无效
      if (!this.inputAt && (event.key === '@' || event.keyCode === 50 || event.which === 50)) {
        this.inputAt = true
        this.showAtOpts()
      }
    },
    input(event) {
      const { input } = this.$refs
      // 如果输入了 @ 则选人
      this.inputAt = !!(input.innerText[input.innerText.length - 1] && event.data === '@')
      if (this.inputAt) this.showAtOpts()
    },
    blur() {
      const { input } = this.$refs
      if (!input.innerHTML) this.inputing = false
    },
    paste(event) {
      const { input } = this.$refs
      let pasteText = (event.clipboardData || window.clipboardData).getData(
        'text'
      )
      input.innerHTML += pasteText
    },
    submit() {
      const { input } = this.$refs

      let text = input.innerHTML

      // 收集 @ 项，顺便处理 at 文本内容
      const atElements = [...input.querySelectorAll('.at-item')]
      const usrs = atElements.map((el) => {
        text = text.replace(new RegExp(el.outerHTML + '(&nbsp;)?'), '')

        return {
          employeeId: el.getAttribute('data-userId'),
          name: el.getAttribute('data-name'),
        }
      })

      if (!text) {
        alert('请输入内容')
        return
      }

      // 重置
      this.init()

      this.$emit('on-submit', {
        content: text,
        usrs,
      })
    },
  },
  mounted() {
    this.init()
  },
}
</script>

<style lang="scss">
.w-comment-input {
  padding: 5px;
  background: #fff;
  border-radius: 4px;
  .textinput-wrap {
    position: relative;
    .textinput {
      height: 60px;
      padding: 5px 10px;
      background: #f5f5f5;
      line-height: 20px;
      overflow: auto;
      .at-item {
        color: $primaryColor;
      }
    }
    .placeholder {
      color: $placeholderColor;
    }
    .atdropdown {
      position: absolute;
      top: 100%;
      left: 0;
      border: 1px solid #999;
      background-color: #fff;
      z-index: 1;
      .item {
        padding: 5px 15px;
        cursor: pointer;
        &:hover {
          background-color: #f8f8f8;
        }
      }
    }
  }
  .toolbar {
    display: flex;
    justify-content: space-between;
  }

  .toolbar-left {
    display: flex;

    .item {
      padding: 5px;
      color: $placeholderColor;
      cursor: pointer;

      &:hover {
        color: $primaryColor;
      }

      &:first-child {
        padding-left: 0;
      }
    }
  }

  .toolbar-right {
    display: flex;
    align-items: center;
    .tips {
      color: $placeholderColor;
    }
    .submit-btn {
      margin-left: 15px;
    }
  }
}
</style>