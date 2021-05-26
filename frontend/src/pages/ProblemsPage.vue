<template>
  
  <div class="problems">
    <el-button @click="createDialogVisible = true">添加题目</el-button>
    
    <el-dialog title="添加题目" v-model="createDialogVisible" width="60%">
      <el-form :model="createPro">
        <el-form-item label="题目名">
          <el-input v-model="createPro.Pro_title"></el-input>
        </el-form-item>
        <el-form-item label="题目描述">
          <el-input v-model="createPro.Pro_detail"></el-input>
        </el-form-item>
        <el-form-item label="题目提示">
          <el-input v-model="createPro.Pro_help"></el-input>
        </el-form-item>
        

      </el-form>
       <template #footer>
        <span class="dialog-footer">
          <el-button @click="createDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="newproblem"
            >确 定</el-button
          >
        </span>
      </template>


      
    </el-dialog>






    <el-table
      :data="tableData"
      highlight-current-row
      border
      style="width: 100%"
    >
      <el-table-column prop="id" label="序号" width="60"> </el-table-column>
      <el-table-column prop="title" label="题目" v-slot="{ row }">
        
        <router-link @click="updateData()" :to="{ name: 'problem', params: { id: row.id } }">
          {{ row.title }}      
        </router-link>
      </el-table-column>
      <el-table-column prop="updated_at" label="更新时间" width="200">
      </el-table-column>
    </el-table>


    <div class="pages">
      <el-pagination
        class="fy"
        layout="sizes, prev, pager, next, total"
        v-model="dictCurrentPage"
        :pager-count="9"
        background
        :total="dictTotal"
        :page-size="30"
        :page-sizes="[30, 50, 100]"
      >
      </el-pagination>
    </div>
    
  </div>




</template>









<script>
import { getProblems } from "../api/problem.js";
//import ProblemPage from "../pages/ProblemPage.vue"
export default {
  name: "ProblemsPage",
  data() {
    return {
      createDialogVisible: false,
      createPro: {
        Pro_title: "",
        Pro_detail: "",
        Pro_help:"",
      },




      tableData: [],
      currentPage: 1,
      dictTotal: 200,
      dictCurrentPage: 1,
      dictPageSize: 30,
    };
  },
  components:{
    //ProblemPage
  },

  mounted() {
    
    const self = this;
    getProblems()
     .then(function (response) {
        return JSON.parse(response.data);
      })
      .then(function (json) {
        for (let problem of json) {
            self.tableData.push({
            id: problem.id,
            title: problem.title,
            updated_at: (problem.updated_at),
          });
        }
      });
  },
  methods:
  {
    
     



    newproblem()
    {
      var date=new Date;
      
      this.createDialogVisible = false;
      //alert(this.createPro.Pro_title+" "+this.createPro.Pro_detail),
      this.dictTotal=this.dictTotal+1
      this.tableData.push({
        id:this.dictTotal,
        title:this.createPro.Pro_title,
        updated_at:(date.getFullYear()+"-"+(date.getMonth() + 1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds())
            
        });
        
      //getProblems(this.tableData)
      
      
      
      

    },
    updateData:function()
    {
      alert(this.row.id)
      this.$router.push({ name: 'problem', params: { id: this.row.id } });
      //this.$router.go(0);  
      
    }
    

  },
};
</script>

<style scoped>
.pages {
  margin: 2rem auto;
  text-align: center;
}
</style>