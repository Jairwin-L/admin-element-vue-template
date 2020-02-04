<template>
  <div class="login_container">
    <div class="login_main">
      <div class="login_title">简易管理平台简易模板</div>
      <el-form :model="loginForm" status-icon :rules="loginRules" ref="loginForm">
        <el-form-item prop="account">
          <el-input size="large" v-model="loginForm.account" autocomplete="off" placeholder="请输入用户账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input size="large" type="password" v-model="loginForm.password" autocomplete="off" placeholder="请输入用户密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="large" type="primary" @click="submitForm('loginForm')">登录</el-button>
        </el-form-item>
      </el-form>
      <p>任意输入即可登录</p>
    </div>
    <footers></footers>
  </div>
</template>

<script>
import Footers from '../components/footer'
export default {
  components: {
    Footers
  },
  data () {
    const account = (rule, value, callback) => {
      if (value === '') callback(new Error('请输入账号'))
      callback()
    }
    const password = (rule, value, callback) => {
      if (value === '') callback(new Error('请输入密码'))
      callback()
    }
    return {
      loginForm: {
        account: '',
        password: ''
      },
      loginRules: {
        account: [
          { validator: account, trigger: 'blur' }
        ],
        password: [
          { validator: password, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$router.push('/main')
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.login_container {
  width: 100%;
  height: 100vh;
  background: #c8d0dd no-repeat center 110px;
  background-size: 100%;
  display: flex;
  flex-direction: column;
  .login_main {
    width: 368px;
    margin: 70px auto 0;
    flex: 1 1;
    .login_title {
      font-size: 20px;
      font-weight: bold;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .el-button {
      width: 100%;
    }
  }
  @media (min-width: 768px) {
    background: #f0f2f5 url('../assets/login.svg') no-repeat center 110px;
    background-size: 100%;
  }
  footer {
    text-align: center;
    color: rgba(0,0,0,.45);
    font-size: 14px;
    margin-bottom: 24px;
    .footer-content {
      margin-bottom: 8px;
      > a {
        color: rgba(0,0,0,.45);
        margin-right: 40px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
