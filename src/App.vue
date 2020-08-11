<template>
  <a-layout id="app">
    <a-layout-header class="header">
      <img class="logo" src="/static/vue-logo.png" />
      <img class="logo" src="/static/antd-logo.svg" />
    </a-layout-header>
    <a-layout>
      <a-layout-sider class="aside" v-model="collapsed" :trigger="null" collapsible>
        <a-icon
          class="collapse-btn"
          :type="!collapsed ? 'menu-fold' : 'menu-unfold'"
          @click="collapsed = !collapsed"
        />
        <a-menu
          class="menu"
          mode="inline"
          :open-keys.sync="openKeys"
          :default-selected-keys="[menus[0].children[0].key]"
          @select="selectItem"
        >
          <a-sub-menu v-for="item in menus" :key="item.key">
            <div slot="title">
              <a-icon :type="item.iconType" />
              <span>{{item.name}}</span>
            </div>
            <a-menu-item v-for="childItem in item.children" :key="childItem.key">
              <span>{{childItem.name}}</span>
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-content class="content">
          <router-view class="content-view"></router-view>
        </a-layout-content>
        <a-layout-footer class="footer">Vue PC ©2020 Created by Peng</a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script>
import menus from './assets/js/menus'

export default {
  data() {
    return {
      collapsed: false,
      openKeys: [menus[0].key],
      menus,
    }
  },
  methods: {
    selectItem({ item, key, selectedKeys }) {
      this.$router.push({
        name: key
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  height: 100vh;

  .header {
    position: relative;
    padding: 0 20px;
    background-color: #00e079;
    box-shadow: 0 2px 8px #f0f1f2;
    z-index: 1;
    .logo {
      width: 45px;
    }
  }

  .aside {
    border-right: 1px solid $borderColor;
    background: #d2f0f4;
    overflow: hidden;
    .collapse-btn {
      width: 100%;
      padding: 10px 17px;
      font-size: 20px;
      cursor: pointer;
      &:hover {
        color: $primaryColor;
      }
    }
    .menu {
      border-right: none;
    }
    /deep/ .ant-menu {
      background: #d2f0f4;
    }
  }

  .content {
    background: #44cef6;
    .content-view {
      padding: 20px;
    }
  }

  .footer {
    border-top: 1px solid $borderColor;
    text-align: center;
    background: #75878a;
  }
}
</style>
