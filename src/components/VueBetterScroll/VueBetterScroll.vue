<template>
  <div class="vue-bs-wrapper">
    <div ref="content" class="vue-bs-content">
      <slot></slot>
      <loading class="pull-up-slot" v-if="pullUp && startPullUp"></loading>
    </div>

    <div class="pull-down-slot" v-if="pullDown">
      <img class="icon" 
        :class="{rotate: !downImgStyle && pullDowning}" 
        :src="`${$rootPath}/static/favicon.ico`" 
        :style="downImgStyle">
      <span class="text" v-show="!pullDowning">刷新成功</span>
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
        pullDowning: false,
        downImgStyle: null,
        startPullUp: false
      }
    },
    methods: {
      resize: debounce(function () {
        this.refresh()
      }, 500),
      // 下拉刷新后告诉组件已经完毕了，优化体验
      finishPullDown() {
        this.pullDowning = false
        this.downImgStyle = null
        setTimeout(() => {
          this.bs.finishPullDown()
        }, 500)
      },
      // 上拉加载后告诉组件已经完毕了，优化体验
      finishPullUp() {
        this.startPullUp = false
        this.bs.finishPullUp()
      },
      // 数据有变化之后，要刷新
      refresh() {
        this.bs.refresh()
      },
      init() {
        let stop = 80

        this.bs = new BScroll(this.$el, {
          // 滚动回调触发方式，0：不触发 scroll；2：触摸中滑动时触发；3：滚动过程中任何时间都触发
          probeType: 3,
          // 阻止冒泡，常用于内部还有子 better-scroll 容器的子配置
          stopPropagation: true,
          // 因为 bs 会阻止默认内部事件，所以这里需要指定哪些元素不阻止默认事件
          preventDefaultException: {
            tagName: /^(DIV|SPAN|IMG|INPUT|TEXTAREA|BUTTON|SELECT|AUDIO)$/
          },
          // 是否支持下拉刷新
          pullDownRefresh: this.pullDown ? {
            stop
          } : false,
          // 是否支持上拉加载
          pullUpLoad: this.pullUp ? {
            threshold: 20
          } : false
        })

        // 下拉加载
        if (this.pullDown) {
          this.bs.on('scroll', position => {
            if (position.y > 0) {
              if (this.emitPullDown) {
                this.downImgStyle = null
                return
              }
              
              this.pullDowning = true
              this.downImgStyle = {
                top: `${position.y / 3}px`,
                transform: `rotate(${position.y}deg) `
              }
            } else {
              this.pullDowning = false
              this.downImgStyle = null
            }
          })

          this.bs.on('scrollEnd', () => {
            this.emitPullDown = false
          })
          
          this.bs.on('pullingDown', event => {
            this.downImgStyle = null
            this.emitPullDown = true
            this.$emit('pull-down')
          })
        }

        // 上拉加载
        if (this.pullUp) {
          this.bs.on('pullingUp', event => {
            this.startPullUp = true
            this.$emit('pull-up')
          })
        }

        addResizeListener(this.$refs.content, this.resize)
      }
    },
    beforeDestroy() {
      removeResizeListener(this.$refs.content, this.resize)
      this.bs.destroy()
    },
    mounted() {
      this.init()
    }
  }
</script>

<style lang="scss">
  .vue-bs-wrapper {
    position: relative;
    overflow: hidden;

    @keyframes rotate {
      from {
        transform: rotate(0);
      }
      to {
        transform: rotate(360deg);
      }
    }

    .pull-down-slot {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      display: flex;
      height: 80px;
      justify-content: center;
      align-items: center;
      font-size: 24px;
      color: #999;

      .icon {
        position: relative;
        width: 40px;
        height: 40px;
        margin-right: 10px;

        &.rotate {
          animation: rotate 3s linear infinite;
        }
      }
    }
    .pull-up-slot {
      padding: 20px 0 !important;
      /deep/ .loading-icon {
        width: 60px !important;
        height: 60px !important;
      }
    }
  }

  .vue-bs-content {
    position: relative;
    z-index: 1;
  }
</style>
