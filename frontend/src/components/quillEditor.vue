<template>
    
    <div >
        <!--  新增时输入 --><div><button @click="count++">nihao</button></div>
        <quill-editor style="width:300px"
            v-model="content" 
            ref="myQuillEditor" 
            :options="editorOption" 
            @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
            @change="onEditorChange($event)">
        </quill-editor>
        <!-- 从数据库读取展示 -->
        <div v-html="str" class="ql-editor" v-if="count">
            {{str}}
        </div>
    </div>
</template>
<script>
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
export default {
    components: {
        quillEditor
    },
    data() {
        return {
          count:0,
          content:`给定一个数组和滑动窗口的大小，找出所有滑动窗口里数值的最大值。
          例如，如果输入数组{2,3,4,2,6,2,5,1}及滑动窗口的大小3，那么一共存在6个滑动窗口，
          他们的最大值分别为{4,4,6,6,6,5}； 针对数组{2,3,4,2,6,2,5,1}的滑动窗口有以下6个：
          {[2,3,4],2,6,2,5,1}， {2,[3,4,2],6,2,5,1}，
          {2,3,[4,2,6],2,5,1}， {2,3,4,[2,6,2],5,1}，
          {2,3,4,2,[6,2,5],1}， {2,3,4,2,6,[2,5,1]}。`,
            str: '',
            editorOption: {}
        }
    },
    methods: {
        onEditorReady() { // 准备编辑器
 
        },
        onEditorBlur(){}, // 失去焦点事件
        onEditorFocus(){}, // 获得焦点事件
        onEditorChange(){}, // 内容改变事件
        // 转码
        escapeStringHTML(str) {
            str = str.replace(/&lt;/g,'<');
            str = str.replace(/&gt;/g,'>');
            return str;
        }
    },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill;
        },
    },
    mounted() {
        let content = '';
        this.str = this.escapeStringHTML(content);
    }
}
</script>
