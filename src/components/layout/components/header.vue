<template>
  <Header class="base-header">
    <!-- <Menu mode="horizontal" theme="dark" width="auto" :active-name="currentPath.split('/')[1]" ref="menuHead"> -->
    <Menu mode="horizontal" theme="dark" width="auto" :active-name="currentPath.split('/')[1]" ref="menuHead">
      <div class="layout-logo"><img src="static/imgs/logo.png" alt="Paris" width="51" height="51">
      <span class="header-logoText">综合业务管理子系统</span> </div>
      <Icon @click="changeStateCollapsed" :class="rotateIcon" type="md-menu" size="24"></Icon>
      <div class="layout-nav">
        <MenuItem v-bind:name="levelOneMenu.menuId" v-for="levelOneMenu in levelOneMenus" :to="levelOneMenu.url" :key="levelOneMenu.menuId">
         {{levelOneMenu.name}}
        </MenuItem>
      </div>
      <div class="user-out">
        <Dropdown @on-click="handleClick" placement="bottom-start">
          <a href="javascript:void(0)" style="color:white">
            <Avatar icon="ios-person" /> <span style="padding-left:10px">{{name}}</span>
          <Icon :size="18" type="md-arrow-dropdown"></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem name="logout">退出登录</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </Menu>
  </Header>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      isCollapsed: false,
      MenuText: '综合业务',
      name: '用户'
    }
  },
  created () {

  },
  mounted () {
    // this.menuList()
  },
  computed: {
    ...mapGetters([
      // 'name',
      'levelOneMenus',
      'currentPath'
    ]),
    rotateIcon () {
      return ['menu-icon', this.isCollapsed ? 'rotate-icon' : '']
    }
  },
  methods: {
    changeStateCollapsed () {
      this.isCollapsed = !this.isCollapsed
      this.$emit('change-side')
    },
    handleClick (name) {
      switch (name) {
        case 'logout':
          console.log('logout')
          break
        default:
          break
      }
    }
  }
}
</script>
<style>
.base-header .ivu-menu-dark{
  background: #031c55;
}
.base-header.ivu-layout-header {
    background: #031c55 none repeat scroll 0 0;
    height: 62px;
    line-height: 62px;
    padding: 0 20px;
}
.base-header .ivu-menu-item-active {
  background-color: #0A39AF;
}
.base-header .ivu-btn-primary {
    background-color: #FFF;
    border-color: 1px solid #dddee1;
    color: #031c55;
}
.dropdown-button {
    background-color: #FFF;
    border-color: 1px solid #dddee1;
    color: #031c55;
}
.menu-icon {
  transition: all 0.3s;
  font-size: 24px;
  margin: 0px 20px;
  color: white;
  float: left;
  position: relative;
  top: 19px;
  height: 23px;
}
.rotate-icon {
  transform: rotate(-90deg);
}
.layout-logo {
  width: 16em;
  height: 30px;
  background:#031c55;
  border-radius: 3px;
  float: left;
  position: unset;
  top: 15px;
}
.layout-nav {
  margin: 0 auto;
  float: left;
  margin-left: 0px;
}
.user-out {
  float: right;
  color: white;
}

.header-logoText {
    color: #fff;
    font-size: 20px;
    font-weight: 700;
    position: absolute;
    z-index: 1000;
}

</style>
