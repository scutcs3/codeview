<template>
    <el-container>
        <el-header>在线编程笔试平台</el-header>
        <el-container>
            <el-aside width="300px">
                <Problem></Problem>
            </el-aside>
            <el-main>
                <Editor msg="编程部分"></Editor>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import Editor from "../components/Editor.vue";
import Problem from "../components/Problem.vue";
export default {
    name: "App",
    components: {
        Editor,
        Problem,
    },
};
</script>
<style scoped>

</style>
