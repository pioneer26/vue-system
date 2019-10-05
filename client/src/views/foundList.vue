<template>
  <div class="fillcontain">
    <div class="top-other">
      <el-form :inline="true" ref="add_data" :model="searchData">
        <el-form-item label="按照时间筛选">
          <el-date-picker
            v-model="searchData.startTimevalue"
            type="datetime"
            size="mini"
            placeholder="选择开始时间">
          </el-date-picker>
          <span style="margin:0 10px;color:#999;">--</span> 
          <el-date-picker
            v-model="searchData.endTimevalue"
            type="datetime"
            size="mini"
            placeholder="选择结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="handleScreen()">筛选</el-button>
        </el-form-item>
        <el-form-item class="btnRight">
          <el-button type="primary" size="small" @click="handleAdd()">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table_container">
      <el-table
        :data="allTableData"
        max-height="450"
        border
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          align='center'
          width="50">
        </el-table-column>
        <el-table-column
          prop="date"
          label="创建日期"
          align='center'
          width="230">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          label="收支类型"
          align='center'
          width="100">
        </el-table-column>
        <el-table-column
          prop="describe"
          label="收支描述"
          align='center'
          width="100">
        </el-table-column>
        <el-table-column
          prop="income"
          label="收入"
          align='center'
          width="80">
          <template slot-scope="scope">
            <span style="color:#00D053;">{{ scope.row.income }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="expend"
          label="支出"
          align='center'
          width="80">
          <template slot-scope="scope">
            <span style="color:#F56767;">{{ scope.row.expend }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="cash"
          label="账户现金"
          align='center'
          width="100">
          <template slot-scope="scope">
            <span style="color:#4db3ff;">{{ scope.row.cash }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          align='center'
          width="100">
        </el-table-column>
        <el-table-column 
          label="操作"
          prop="operation"
          align="center"
          fixed="right"
          width="180">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="warning" 
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger" 
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <el-col :span="24">
          <div class="pag">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="pag.currentPage"
              :page-sizes="pag.numberPage"
              :page-size="pag.numberBars"
              :layout="pag.layout"
              :total="pag.total">
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
    <DialogFound :dialog="dialog" :formData="formData" @update="getprofile()"></DialogFound>
  </div>
</template>
<script>
import DialogFound from '../components/DialogFound';
export default {
  name: 'foundList',
  components: {
    DialogFound
  },
  data() {
    return {
      searchData: {
        startTimevalue: '',
        endTimevalue: ''
      },
      pag: {
        currentPage: 1,//当前页
        total: 0,//总数
        numberBars: 5,//一页显示的条数
        numberPage: [5,10,15],//显示的页数
        layout: "total, sizes, prev, pager, next, jumper"//翻页属性
      },
      tableData: [],
      allTableData: [],
      dialog: {
        show: false,
        title: '',
        option: 'edit'//默认是修改
      },
       formData: {
        type: '',
        describe: '',
        income: '',
        expend: '',
        cash: '',
        remark: '',
        id: ''
      }
    }
  },
  created() {
    this.getprofile();
  },
  methods:{
    getprofile(){
      this.$http.get('/api/file')
      .then(res => {
        // console.log(res);
        this.allTableData = res.data;
        //设置分页数据
        this.setpag();
      })
      .catch(error => {
        console.log(error);
      })
    },
    handleAdd() {
      //添加
      this.dialog = {
        show: true,
        title: '添加资金信息',
        option: 'add'
      };
      this.formData = {
        type: '',
        describe: '',
        income: '',
        expend: '',
        cash: '',
        remark: '',
        id: ''
      }
    },
    handleEdit(index, row) {
      //编辑
      this.dialog = {
        show: true,
        title: '修改资金信息',
        option: 'edit'
      };
      this.formData = {
        type: row.type,
        describe: row.describe,
        income: row.income,
        expend: row.expend,
        cash: row.cash,
        remark: row.remark,
        id: row._id
      }
    },
    handleDelete(index, row) {
      //删除
      alert('删除');
      this.$http.delete(`/api/file/delete/${row._id}`)
      // .then(res => {
      //   this.$confirm('确认关闭？')
      //     .then(_ => {
      //       this.$message("删除成功");
      //       this.getprofile();
      //     })
      //     .catch(_ => {});
      // })
    },
    setpag() {
      //分页属性设置
      this.pag.total = this.allTableData.length;
      this.pag.numberBars = 5;
      this.pag.currentPage = 1;
      //设置默认的分页数据
      // console.log(this.allTableData);
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.pag.numberBars;
      })
    },
    handleSizeChange(page_size) {
      // debugger
      //切换size
      this.pag.currentPage = 1;
      this.pag.numberBars = page_size;
      console.log(this.pag.numberBars);
      this.tableData = this.allTableData.filter((item, index) => {
        return index < page_size;
      })
    },
    handleCurrentChange(page) {
      //获取当前页
      let sPage = this.pag.currentPage;
    }
  }
}
</script> 
<style scoped>
.fillcontain {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnRight {
  float: right;
}
.pag{
  text-align: right;
  margin-top: 30px;
}
</style>
