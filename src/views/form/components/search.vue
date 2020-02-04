<template>
  <el-row :gutter="20">
    <el-col :span="5">
      <el-input class="common_input" size="mini" v-model="searchParams.searchText" placeholder="请输入搜索内容"></el-input>
    </el-col>
    <el-col :span="3">
      <el-button size="mini" type="primary" @click="onSearch">搜索</el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      searchParams: {}
    }
  },
  methods: {
    onSearch () {
      this.$emit('search', this.searchParams)
    }
  }
}
</script>

<style lang="less" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
  .common_input {
    // width: 230px;
  }
}
</style>
