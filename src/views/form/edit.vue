<template>
  <div class="box_container" v-if="ruleForm">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo_ruleForm">
      <el-form-item label="用户编号" prop="id">
        <el-select v-model="ruleForm.id" placeholder="请选择">
          <el-option
            v-for="item in demoList"
            :key="item.id"
            :label="item.englishName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="姓名" prop="englishName">
        <el-input v-model="ruleForm.englishName"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="头像链接地址">
        <upload @upload="onUpload" :images="ruleForm.avatar"/>
      </el-form-item>
      <el-form-item label="个人签名">
        <el-input type="textarea" v-model="ruleForm.signature"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as Util from '@/util'
import Upload from '@/components/upload'
export default {
  components: {
    'upload': Upload
  },
  data () {
    return {
      ruleForm: {
        id: 1,
        englishName: 'Jairwin',
        age: '18',
        phone: '13300000000'
      },
      rules: {
        id: [
          { required: true, message: '请填写用户唯一编号', trigger: 'blur' }
        ],
        englishName: [
          { required: true, message: '请填写英文名字', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请填写联系电话', trigger: 'blur' }
        ]
      },
      demoList: [
        {
          id: 1,
          englishName: 'Jairwin'
        },
        {
          id: 2,
          englishName: 'Bob'
        },
        {
          id: 3,
          englishName: 'YZW'
        }
      ]
    }
  },
  methods: {
    onUpload (item) {
      this.ruleForm.avatar = item
    },
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!Util.isPhone(this.ruleForm.phone)) {
            this.$message.warning('请输入有效手机号')
            return
          }
          console.log(this.ruleForm)
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.demo_ruleForm {
  width: 350px;
  .el-icon-close {
    cursor: pointer;
  }
  .add-input {
    margin-right: 10px;
    margin-bottom: 10px;
  }
  ul {
    display: flex;
    li {
      margin-right: 10px;
      img {
        width: 150px;
      }
    }
  }
}
</style>
