<template>
  <div class="box_container">
    <el-button size="mini" type="primary" class="el-icon-plus" @click="onUpload">上传图片</el-button>
    <div class="image-box">
      <ul v-if="list">
        <li v-for="item in list.items" :key="item.id">
          <img :src="item.url" :alt="item.name"/>
          <a href="javascript:;" @click="onDel(item.id)">删除</a>
        </li>
      </ul>
    </div>
    <el-pagination
      v-if="list"
      @current-change="onPage"
      :page-size="pageParams.page_size"
      :current-page="list.page"
      layout="prev, pager, next, jumper"
      :total="list.total">
    </el-pagination>
    <el-dialog
      title="图片上传"
      :visible.sync="uploadModal"
      :show-close="false"
      :close-on-click-modal="false"
      width="30%">
      <el-upload
        name="file"
        class="avatar-uploader"
        action="/oss/upload/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="uploadModal = false">取消</el-button>
        <el-button type="primary" @click="okUpload">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as UploadAction from '@/api/upload'
import _ from 'lodash'
export default {
  data () {
    return {
      list: null,
      uploadModal: false,
      imageUrl: '',
      pageParams: {
        page: 1,
        page_size: 10
      }
    }
  },
  beforeMount () {
    this.fetchList()
  },
  methods: {
    onPage (e) {
      console.log(e)
      this.pageParams.page = e
      this.fetchList()
    },
    onUpload () {
      this.uploadModal = true
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      console.log(this.imageUrl)
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
    onDel (id) {
      this.$confirm('确认删除该图片？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        showClose: false,
        type: 'warning'
      }).then(() => {
        UploadAction.destory({ source_id: id }).then(() => {
          this.fetchList()
          this.$message.success('图片删除成功')
        }).catch(err => this.$message.error(err))
      }).catch(() => {})
    },
    okUpload () {
      this.uploadModal = false
      this.fetchList()
      this.imageUrl = ''
    },
    fetchList () {
      const params = _.assign(this.searchParams)
      UploadAction.list(params).then(data => { this.list = data }).catch(err => this.$message.error(err))
    }
  }
}
</script>

<style lang="less" scoped>
.image-box {
  height: 600px;
  margin: 10px auto;
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
.avatar-uploader {
  width: 120px;
  height: 120px;
  border: 1px dashed #d9d9d9;
  .el-upload {
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
}
</style>
