<template>
  <div class="vue-bs-wrapper">
    <div ref="content" class="vue-bs-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import {addResizeListener, removeResizeListener} from '@/assets/js/dom'
  import { debounce } from 'vux'

  export default {
    name: 'vueBs',
    props: {
      pullDown: Boolean,
      pullUp: Boolean
    },
    data() {
      return {

      }
    },
    methods: {
      resize: debounce(function () {
        this.refresh()
      }, 500),
      // 下拉刷新后告诉组件已经完毕了，优化体验
      finishPullDown() {
        this.bs.finishPullDown()
      },
      // 上拉加载后告诉组件已经完毕了，优化体验
      finishPullUp() {
        this.bs.finishPullUp()
      },
      // 数据有变化之后，要刷新
      refresh() {
        this.bs.refresh()
      },
      init() {
        this.bs = new BScroll(this.$el, {
          // 滚动回调触发方式，0：不触发 scroll；2：触摸中滑动时触发；3：滚动过程中任何时间都触发
          probeType: 3,
          // 滚动条交互，不设置则不显示滚动条
          scrollbar: {
            fade: true, // 滚动完成后是否隐藏滚动条
            interactive: false // 滚动条是否可交互，如拖动滚动条
          },
          // 阻止冒泡，常用于内部还有子 better-scroll 容器的子配置
          stopPropagation: true,
          // 因为 bs 会阻止默认内部事件，所以这里需要指定哪些元素不阻止默认事件
          preventDefaultException: {
            tagName: /^(DIV|INPUT|TEXTAREA|BUTTON|SELECT|AUDIO)$/
          },
          // 是否支持下拉刷新
          pullDownRefresh: this.pullDown,
          // 是否支持上拉加载
          pullUpLoad: this.pullUp
        })
        
        // 下拉加载
        this.bs.on('pullingDown', event => {
          this.$emit('pull-down')
        })

        // 上拉加载
        this.bs.on('pullingUp', event => {
          this.$emit('pull-up')
        })

        addResizeListener(this.$refs.content, this.resize)
      }
    },
    beforeDestroy() {
      removeResizeListener(this.$refs.content, this.resize)
    },
    mounted() {
      this.init()
    }
  }
</script>

<style lang="scss">
  .vue-bs-wrapper {
    overflow: hidden;
  }

  .vue-bs-content {
    position: relative;
    z-index: 1;
  }
</style>