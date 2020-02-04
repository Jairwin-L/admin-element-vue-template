<template>
  <div>
    <div class="uploud-pic">
       <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="onAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <i v-if="!imgUrl" class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <div v-if="thumbnail" @click="onUploadModal">
        <img :src="thumbnail"/>
      </div>
    </div>
    <el-dialog
      title="图片上传"
      :visible.sync="uploadModal"
      :show-close="false"
      :close-on-click-modal="false"
      width="750px">
      <div class="image-box">
        <ul v-if="list">
          <li v-for="item in list.items" :key="item.id">
            <div class="checked" v-if="item.selected">
              <i class="el-icon-check"></i>
            </div>
            <img :src="item.url" :alt="item.name" @click="onSelected(item)"/>
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="uploadModal = false">取消</el-button>
        <el-button type="primary" @click="upload">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data () {
    return {
      list: null,
      uploadModal: false,
      thumbnail: '',
      imageUrl: '',
      pageParams: {
        page: 1,
        page_size: 10
      }
    }
  },
  props: ['images'],
  beforeMount () {
    setTimeout(() => {
      this.thumbnail = this.images
    }, 300)
  },
  methods: {
    onSelected (item) {
      this.imageUrl = item.url
    },
    onPage (e) {
      this.pageParams.page = e
    },
    onUploadModal () {
      this.uploadModal = !this.uploadModal
      const params = _.assign(this.searchParams)
      console.log(params)
    },
    upload () {
      this.thumbnail = this.imageUrl
      this.$emit('upload', this.thumbnail)
      this.uploadModal = false
    }
  }
}
</script>

<style lang="less" scoped>
.uploud-pic {
  width: 120px;
  height: 120px;
  img {
    width: 120px;
    height: 120px;
    border: 1px dashed #d9d9d9;
    cursor: pointer;
  }
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
  border: 1px dashed #d9d9d9;
  cursor: pointer;
}
.image-box {
  height: 450px;
  ul {
    display: flex;
    li {
      margin-right: 10px;
      .checked {
        position: absolute;
        left: 17;
        top: 107;
        width: 120px;
        height: 120px;
        background: rgba(10, 10, 10, 1);
      }
      img {
        width: 150px;
        cursor: pointer;
      }
    }
  }
}
</style>
