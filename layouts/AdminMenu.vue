<template>
  <div :style="vuexMenu.collapsed ? 'width:80px' : 'width:260px'" class="layout-side">
    <a-layout-sider width="260" :collapsed="vuexMenu.collapsed">
      <div class="logo">
        <nuxt-link to="/admin" class="d-flex justify-content-center align-items-center">
          <img src="@/assets/images/logo.png" alt="">
          <h1 v-if="!vuexMenu.collapsed" class="m-2">NuxtJs Ant Design</h1>
        </nuxt-link>
      </div>
      <a-menu
        v-model="vuexMenu.selectedKeys"
        :open-keys="vuexMenu.openKeys"
        mode="inline"
        theme="dark"
        :inline-indent="15"
        :inline-collapsed="vuexMenu.collapsed"
        @openChange="onMenuChange"
        @select="onMenuSelect"
      >
        <a-sub-menu
          v-for="(subMenu, index) in vuexMenu.list"
          :key="`sub${index}`"
        >
            <span slot="title">
              <a-icon :type="subMenu.icon"/>
              <span>{{subMenu.title}}</span>
            </span>
          <template v-for="(item, i) in subMenu.children">
            <a-menu-item
              v-if="!Object.prototype.hasOwnProperty.call(item, 'children')"
              :key="'/admin/'+subMenu.path + '/' + item.path"
            >
              <nuxt-link :to="'/admin/'+subMenu.path + '/' + item.path">
                {{item.title}}
              </nuxt-link>
            </a-menu-item>
            <a-sub-menu v-else :key="`sub${index}-menu${i}`" :title="item.title">
              <a-menu-item
                v-for="itemTow in item.children"
                :key="'/admin/'+subMenu.path + '/' + item.path + '/' + itemTow.path">
                <nuxt-link :to="'/admin/'+subMenu.path + '/' + item.path + '/' + itemTow.path">
                  {{itemTow.title}}
                </nuxt-link>
              </a-menu-item>
            </a-sub-menu>
          </template>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
  </div>
</template>

<script>
  export default {
    name: 'AdminMenu',
    data () {
      return {
        vuexMenu: {
          collapsed: false,
          selectedKeys: [],
          openKeys: [],
          list: []
        }
      }
    },
    watch: {
      vuex_menu: {
        handler () {
          Object.assign(this.vuexMenu, this.vuex_menu)
        },
        deep: true
      }
    },
    mounted () {
      Object.assign(this.vuexMenu, this.vuex_menu)
      this.$nextTick(() => {
        // http://manos.malihu.gr/repository/custom-scrollbar/demo/examples/complete_examples.html
        $('.ant-layout-sider-children').mCustomScrollbar({
          theme: 'minimal',
          scrollInertia: 300,
          axis: 'y'
        })
      })
    },
    methods: {
      onMenuSelect ({ selectedKeys }) {
        this.$vuexAdmin('vuex_menu.selectedKeys', selectedKeys)
      },
      onMenuChange (openKeys) {
        this.$vuexAdmin('vuex_menu.openKeys', openKeys)
      }
    }
  }
</script>

<style scoped lang="scss">
  .logo {
    height: 64px;
    background: #000;
    padding: 16px 14px;

    a {
      height: 32px;
      display: inline-block;

      img {
        width: 26px;
        height: 26px;
      }

      h1 {
        display: inline-block;
        margin: 0 0 0 12px;
        font-size: 18px;
        color: #ffffff;
      }
    }
  }

  .layout-side {
    height: 100vh;
    -webkit-transition: all 0.3s ease 0s;
    -moz-transition: all 0.3s ease 0s;
    -ms-transition: all 0.3s ease 0s;
    transition: all 0.3s ease 0s;
    flex-shrink: 0;
    flex-grow: 0;
  }

  ::v-deep .ant-layout-sider {
    position: fixed;
    height: 100vh;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 9999;
  }
</style>
