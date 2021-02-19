<template>
  <div id="app">
    <div class="app-header">
      <div>Vue</div>
      <div class="theme-select">
        <div class="theme-option blu" @click="changeTheme('blu')"></div>
        <div class="theme-option pur" @click="changeTheme('pur')"></div>
      </div>
    </div>
    <div class="app-body">
      <div class="app-side">
        <template v-for="item in menus" >
          <div 
            class="menu-item menu-title" 
            :key="item.key">
            {{item.name}}
          </div>
          <div 
            class="menu-item menu-child"
            v-for="childItem in item.children" 
            :key="childItem.key + 'item'"
            :class="{active: childItem.key === $route.name}"
            @click="clickItem(childItem)">
            {{ childItem.name }}
          </div>
        </template>
      </div>
      <router-view class="app-view"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        {
          iconType: 'appstore',
          key: 'components',
          name: '组件',
          children: [
            {
              key: 'comment',
              name: '评论'
            }
          ]
        },
        {
          iconType: 'sketch',
          key: 'directives',
          name: '指令',
          children: [
            {
              key: 'drClick',
              name: '防重复点击'
            }
          ]
        }
      ]
    }
  },
  methods: {
    changeTheme(type) {
      document.documentElement.setAttribute('data-theme', type)
    },
    clickItem(item) {
      if (this.$route.name === item.key) return
      this.$router.push({
        name: item.key
      })
    }
  }
}
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.app-header {
  display: flex;
  justify-content: space-between;
  height: 55px;
  padding: 0 20px;
  @include primaryBgColor;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  font-size: 30px;
  color: #fff;
  z-index: 1;
  line-height: 55px;
  flex-shrink: 0;
  .theme-select {
    display: flex;
    align-items: center;
  }
  .theme-option {
    width: 10px;
    height: 10px;
    border: 3px solid #fff;
    border-radius: 50%;
    transition: all .2s linear;
    cursor: pointer;
    + .theme-option {
      margin-left: 10px;
    }
    &.blu {
      background: $primaryColor;
    }
    &.pur {
      background: $purPrimaryColor;
    }
    &:hover {
      transform: scale(1.2);
    }
  }
}

.app-body {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.app-side {
  border-right: 1px solid #e1e1e1;
  flex-shrink: 0;
  overflow: auto;

  .menu-item {
    height: 40px;
    padding: 0 20px;
    line-height: 40px;
  }

  .menu-title {
    font-weight: bold;
  }

  .menu-child {
    padding: 0 30px;
    border-right: 2px solid transparent;
    cursor: pointer;
    &.active,
    &:hover {
      @include primaryColor;
      @include primaryBdColor;
      border-right: 2px solid;
      background-color: #e7f1ff;
    }
  }
}

.app-view {
  flex: 1;
  padding: 20px;
  overflow: auto;
}
</style>
