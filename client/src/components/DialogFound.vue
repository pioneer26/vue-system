<template>
  <div class="dialogFound">
    <el-dialog 
    :title="dialog.title" 
    :visible.sync="dialog.show"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :momdel-append-to-body="false">
     <div class="myform">
       <el-form
       ref="myform"
       :model="formData"
       :rules="form_rules"
       label-width="120px"
       style="margin:10px;width:auto;"
       >
        <el-form-item label="收支类型">
          <el-select v-model="formData.type" label="收支类型">
           <el-option
              v-for="(formtype, index) in format_type_list" 
            :key="index"
            :value="formtype"
            :label="formtype"
           ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="describe" label="收支描述">
          <el-input type="describe" v-model="formData.describe"></el-input>
        </el-form-item>
        <el-form-item prop="income" label="收入">
          <el-input type="income" v-model="formData.income"></el-input>
        </el-form-item>
        <el-form-item prop="expend" label="支出">
          <el-input type="cash" v-model="formData.expend"></el-input>
        </el-form-item>
        <el-form-item prop="cash" label="账户现金">
          <el-input type="cash" v-model="formData.cash"></el-input>
        </el-form-item>
        <el-form-item prop="" label="备注">
          <el-input type="textarea" v-model="formData.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialog.show = false">取消</el-button>
          <el-button type="primary" @click="onsubmit('myform')">提交</el-button>
        </el-form-item>
       </el-form>
     </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'dialogFound',
  props: {
    dialog: Object,
    formData: Object
  },
  data() {
    return {
      format_type_list: [
        "提现",
        "提现手续费",
        "充值",
        "优惠券",
        "充值礼券",
        "转账"
      ],
      form_rules: {
        describe: [{ required: true, message: '收支描述不能为空', trigger: 'blur' }],      
        income: [{ required: true, message: '收入不能为空', trigger: 'blur' }],
        expend: [{ required: true, message: '支出不能为空', trigger: 'blur' }],
        cash: [{ required: true, message: '账户不能为空', trigger: 'blur' }]
      }
    };
  },
  methods: {
    onsubmit(myform) {
      //判断是添加还是编辑
      const url = this.dialog.option == 'add' ? 'add' : `edit/${ this.formData.id }`;
      this.$refs[myform].validate(valid => {
        if(valid){
          this.$http.post(`/api/file/${url}`, this.formData)
          .then(res => {
            this.$message({
              message: '信息更新成功',
              type: 'success',
            })
            this.dialog.show = false;
            this.$emit('update');
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>

</style>
