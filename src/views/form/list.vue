<template>
  <div>
    <div class="box_container">
      <search :searchParams="searchParams" @search="onSearch"/>
    </div>
    <el-button class="add_btn" size="mini" type="primary" @click="$router.push('add')">添加表单</el-button>
    <el-table
      class="box_container"
      v-if="list"
      :data="list">
      <el-table-column
        prop="name"
        label="姓名"
        align="center">
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄"
        align="center">
      </el-table-column>
      <el-table-column
        prop="phone"
        align="center"
        label="电话">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="180px"
      >
        <template slot-scope="scope">
          <div>
            <el-button plain size="mini" type="primary" icon="el-icon-edit" @click="$router.push(`edit/${scope.row.id}`)">编辑</el-button>
            <el-button plain size="mini" type="danger" icon="el-icon-delete" @click="onDel(scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="page_container">
      <el-pagination
        background
        @current-change="onPage"
        :current-page="pageIndex"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="dataTotal"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import Search from './components/search'
import * as DoubanAction from '@/api/douban'
import _ from 'lodash'
export default {
  components: {
    Search
  },
  data () {
    return {
      list: [
        {
          id: 1,
          name: 'Jairwin',
          age: '18',
          phone: '13300000000'
        },
        {
          id: 2,
          name: 'Jairwin',
          age: '19',
          phone: '13300000001'
        },
        {
          id: 3,
          name: 'Jairwin',
          age: '20',
          phone: '13300000002'
        }
      ],
      searchParams: {},
      pageIndex: 1,
      dataTotal: 10
    }
  },
  mount () {
    this.fetchList()
    this.fetchDouban()
  },
  methods: {
    onPage (e) {
      console.log(e)
    },
    onDel (item) {
      this.$confirm('确认删除此条数据？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        showClose: false,
        type: 'warning'
      }).then(() => {
        this.list.splice(item.id, 1)
        // this.fetchList()
        this.$message.success(`删除成功`)
      }).catch(() => {})
    },
    onSearch (params) {
      this.searchParams.searchText = params.searchText
      this.fetchList()
    },
    fetchList () {
      const params = _.assign(this.searchParams.searchText)
      if (!this.searchParams.searchText) return
      console.log(params)
      this.$message.success(`您输入的内容是：${this.searchParams.searchText}`)
    },
    fetchDouban () {
      DoubanAction.list().then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="less" scoped>
img {
  width: 50px;
  height: 50px;
  margin: 0 auto;
}
.add_btn {
  margin: 20px 0;
}
.page_container {
  display: flex;
  justify-content: center;
}
</style>
