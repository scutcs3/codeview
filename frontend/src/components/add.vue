<template>
    <div>
        <button @click="add">添加题目</button><br>
    <div v-if="count"><h3>{{title1}}</h3></div>
    <div v-if="count">{{content1}}</div>
    <button style="position:absolute;bottom:0;left:50px">发送</button>
    </div>
</template>
<script>
export default {
    name:'timu',
    data:function(){
        return {
            count:0,
            title1:'滑动窗口的最大值',
            content1:`给定一个数组和滑动窗口的大小，找出所有滑动窗口里数值的最大值。
      例如，如果输入数组{2,3,4,2,6,2,5,1}及滑动窗口的大小3，那么一共存在6个滑动窗口，
      他们的最大值分别为{4,4,6,6,6,5}； 针对数组{2,3,4,2,6,2,5,1}的滑动窗口有以下6个：
       {[2,3,4],2,6,2,5,1}， {2,[3,4,2],6,2,5,1}，
        {2,3,[4,2,6],2,5,1}， {2,3,4,[2,6,2],5,1}，
        {2,3,4,2,[6,2,5],1}， {2,3,4,2,6,[2,5,1]}。`
        }
    
    },
    methods:{
        add:function(){
            this.count=1
        }
    }
}

</script>
<style scoped>
        button{
            width: 200px;/*设置按钮宽度*/
            height: 30px;/*设置按钮高度*/
            color:white;/*字体颜色*/
            background-color:cornflowerblue;/*按钮背景颜色*/
            border-radius: 3px;/*让按钮变得圆滑一点*/
            border-width: 0;/*消去按钮丑的边框*/
            margin: 0;
            outline: none;/*取消轮廓*/
            font-family: KaiTi;/*字体设置为楷体*/
            font-size: 17px;/*设置字体大小*/
            text-align: center;/*字体居中*/
            cursor: pointer;/*设置鼠标箭头手势*/
        }
        button:hover{/*鼠标移动时的颜色变化*/
            background-color: rgb(15, 247, 65);
        }
        
    </style>