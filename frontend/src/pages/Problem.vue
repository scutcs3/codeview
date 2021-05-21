<template>
 
  <div>
    <!--class="problem"-->
    <el-header>
    <h3>{{id}} {{ title }}</h3>
    </el-header>
    <el-main>
    <p>{{ content }} </p>

    <el-collapse  >
      <p>示例</p>
      <p>???</p>
    </el-collapse>

    <div><button @click="show=!show" >提示</button></div> 
    <el-collapse>
      <div v-if="show" class="testshow">
        ?????????
      </div>
    </el-collapse>
    

    </el-main>


  </div>
  

</template>

<script>
import { getProblem } from "../api/problem.js";

export default {
  
  //name: "Problem",
  data() {
    return {
      show:false,
      
      title: "",
      content: "",
      id:""

    };
  },
  mounted() {
    const self = this;
    getProblem()
      .then((response) => JSON.parse(response.data))
      .then(function (json) {
        self.title = json[0].title;
        self.content = json[0].content;
        self.id=json[0].id;
        
      });

  },
  
  methods:
  {
    
    handleChange(val) {
        console.log(val);
      },
     
  }
 
};
</script>

<style scoped>
.el-header
{
    background-color: white;
    color: #333;
    text-align: left;
    line-height: 30px;

}
.el-main
{
  background-color: #F2F6FC;


}
.testshow
{
  background-color:white;
}
button{
            width: 100%;/*设置按钮宽度*/
            height: 30px;/*设置按钮高度*/
            color:black;/*字体颜色*/
            background-color:white;/*按钮背景颜色*/
            border-radius: 3px;/*让按钮变得圆滑一点*/
            border-width: 0;/*消去按钮丑的边框*/
            margin: 0;
            outline: none;/*取消轮廓*/
            font-family: KaiTi;/*字体设置为楷体*/
            font-size: 17px;/*设置字体大小*/
            text-align: left;/*字体居中*/
            cursor: pointer;/*设置鼠标箭头手势*/
        }

</style>