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
    <div class="operates">
      <div class="operates-left">
        <span class="item" @click="showAtOpts">@</span>
      </div>
      <div class="operates-right">
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
      this.showUsrs = false
      this.inputing = true

      let data = [key]

      // 这里后面的 </span>&nbsp; 结尾是为了能让光标能正常定位到末尾，不然像钉钉内部会有兼容问题
      const addhtml = data
        .map(
          (item) =>
            `<span class="at-item" data-userId="${item}" data-name="${item}" onclick="return false;" contenteditable="false">@${item}</span>&nbsp;`
        )
        .join('')
      let html = input.innerHTML

      // 如果是输入 @ 弹出的选人，则清除之前最后一个位置的 @
      if (this.inputAt) {
        html = html.slice(0, html.length - 1)
        this.inputAt = false
      }

      html += addhtml
      input.innerHTML = html

      // 定位光标到最后一个位置
      setSelection(input)
    },
    showAtOpts() {
      this.showUsrs = true
    },
    input(event) {
      const { input } = this.$refs
      // 如果输入了 @ 则选人
      const lastChIsAt =
        input.innerText[input.innerText.length - 1] && event.data === '@'
      if (lastChIsAt) {
        this.inputAt = true
        this.showAtOpts()
      }
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
  .operates {
    display: flex;
    justify-content: space-between;
  }

  .operates-left {
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

  .operates-right {
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