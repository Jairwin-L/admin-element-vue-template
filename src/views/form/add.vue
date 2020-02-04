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
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="个人签名">
        <el-input type="textarea" v-model="ruleForm.signature"></el-input>
      </el-form-item>
      <el-form-item label="照片">
        <img v-if="imgUrl" :src="imgUrl" class="avatar" @click="onDel">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="onAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <i v-if="!imgUrl" class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="个人签名">
        <quill-editor ref="rich_editor" v-model="ruleForm.content"></quill-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as Util from '@/util'
export default {
  data () {
    return {
      ruleForm: {},
      rules: {
        id: [
          { required: true, message: '请填写用户唯一编号', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请填写姓名', trigger: 'blur' }
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
      ],
      add_fields: [],
      province_list: [],
      city_list: [],
      more_list: [],
      areaProps: {},
      area_list: [],
      area_options: [],
      imgUrl: ''
    }
  },
  methods: {
    onDel () {
      this.imgUrl = ''
    },
    onAvatarSuccess (res, file) {
      this.imgUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    onProvince (e) {
      console.log(e)
    },
    addFields () {
      const params = {
        n: '',
        v: ''
      }
      this.add_fields.push(params)
    },
    onDelFields (item) {
      this.add_fields.splice(item, 1)
    },
    onDelMore (item) {
      this.more_list.splice(item, 1)
    },
    onUpload (item) {
      this.ruleForm.avatar = item
    },
    wechatUpload (item) {
      this.ruleForm.wechat = item
    },
    onMoreUpload (item) {
      this.ruleForm.avatar = item
      this.more_list.push(item)
    },
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!Util.isPhone(this.ruleForm.phone)) {
            this.$message.warning('请输入有效手机号')
            return
          }
          this.ruleForm.additional = this.add_fields
          this.ruleForm.images = this.more_list
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
  width: 1000px;
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
  img {
    width: 100px;
    height: 100px;
  }
}
</style>
