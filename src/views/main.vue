<template>
  <div class="main-wrap">
    <el-container>
      <el-aside>
        <div class="logo">
          <img src="@/assets/logo.png" alt="logo" />
        </div>
        <el-menu
          :default-active="selectPath"
          :router="true"
          class="el-menu-vertical-demo"
          @select="onSelectChange">
          <el-menu-item index="/home">
            <i class="el-icon-menu"></i>
            <span slot="title">管理中心</span>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-tickets"></i>
              <span>示例</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/form/list">form示例</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="logout">
            <a href="javascript:;" @click="logoutVisible = true">退出</a>
          </div>
        </el-header>
        <el-main>
          <router-view/>
          <footers></footers>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog
      title="提示"
      :visible.sync="logoutVisible"
      width="400px" class="notice_dialog"
      :show-close="false"
      top="33vh"
      :close-on-click-modal="false"
    >
      <p>您确认要退出？</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onLogout">退出</el-button>
        <el-button @click="logoutVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Footers from '../components/footer'
export default {
  components: {
    Footers
  },
  data () {
    return {
      selectPath: '',
      logoutVisible: false
    }
  },
  beforeMount () {
    this.selectPath = sessionStorage.selectPath
  },
  methods: {
    onSelectChange (e) {
      sessionStorage.selectPath = e
      this.selectPath = e
    },
    onLogout () {
      this.$router.push('/')
      sessionStorage.clear()
    }
  }
}
</script>

<style lang="less">
.main-wrap {
  height: 100vh;
  .logo {
    img {
      width: 50px;
      margin: 10px auto;
    }
  }
  .el-aside {
    color: #333;
    background: #fff;
    width: 175px !important;
    overflow-x: hidden !important;
    .el-menu-vertical-demo {
      min-height: 830px;
    }
  }
  .el-container {
    height: 100%;
  }
  .el-main {
    background: #E9ECF3;
    .box_container {
      padding: 20px;
      background: #fff;
    }
  }
}
.el-menu-item.is-active {
  background: #ecf5ff;
}
.logout {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 16px;
  a {
    color: #333;
  }
}
</style>
