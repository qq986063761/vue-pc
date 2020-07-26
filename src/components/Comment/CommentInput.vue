<template>
  <div class="w-comment-input">
    <div class="textinput-wrap">
      <div ref="input" 
        class="textinput" 
        contenteditable 
        v-show="inputing" 
        @blur="blur" 
        @input="input" 
        @paste.prevent="paste" 
        @keydown.ctrl.enter="submit">
      </div>
      <div class="textinput placeholder" contenteditable v-show="!inputing" @focus="placeholderFocus">请输入评论</div>
      <a-dropdown v-model="showUsrs">
        <div></div>
        <a-menu slot="overlay">
          <a-menu-item :key="item" v-for="item in atUsrs" @click="clickAtItem">
            {{item}}
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CommentInput',
    data() {
      return {
        // 是否在输入中
        inputing: false,
        showUsrs: false,
        atUsrs: ['用户1', '用户2', '用户3']
      }
    },
    methods: {
      init() {
        const {input} = this.$refs
        input.innerHTML = ''
        this.inputing = false
      },
      placeholderFocus() {
        const {input} = this.$refs

        this.inputing = true
        setTimeout(() => input.focus(), 50)
      },
      clickAtItem({key}) {
        const {input} = this.$refs
        this.showUsrs = false

        let data = [key]

        // 这里后面的 </span>&nbsp; 结尾是为了能让光标能正常定位到末尾，不然像钉钉内部会有兼容问题
        const addhtml = data.map(item => `<span class="at-item" data-userId="${item}" data-name="${item}" onclick="return false;" contenteditable="false">@${item}</span>&nbsp;`).join('')
        let html = input.innerHTML

        // 如果是输入 @ 弹出的选人，则清除之前最后一个位置的 @
        if (this.inputAt) {
          html = html.slice(0, html.length - 1)
          this.inputAt = false
        }

        html += addhtml
        input.innerHTML = html

        // 定位光标到最后一个位置
        // dom.setSelection(input)
      },
      input() {
        const {input} = this.$refs
        // 如果输入了 @ 则选人
        if (input.innerText[input.innerText.length - 1] === '@') {
          this.inputAt = true
          this.showUsrs = true
        }
      },
      blur() {
        const {input} = this.$refs
        if (!input.innerHTML) this.inputing = false
      },
      paste(event) {
        const {input} = this.$refs
        let pasteText = (event.clipboardData || window.clipboardData).getData('text')
        input.innerHTML += pasteText
      },
      submit() {
        const {input} = this.$refs
        const text = input.innerHTML.replace(/<span class="at-item".+<\/span>&nbsp;/g, '')

        if (!text) {
          this.$message.warning(this.$t('placeholder.enterComments'))
          return
        }

        const atElements = [...input.querySelectorAll('.at-item')]
        const usrs = atElements.map(el => ({
          employeeId: el.getAttribute('data-userId'),
          name: el.getAttribute('data-name')
        }))

        // 重置
        this.init()

        this.$emit('on-submit', {
          content: text,
          usrs
        })
      }
    },
    mounted() {
      this.init()
    }
  }
</script>

<style lang="scss">
  .w-comment-input {
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
        &.placeholder {
          color: #c5c5c5;
        }
      }
    }
  }
</style>