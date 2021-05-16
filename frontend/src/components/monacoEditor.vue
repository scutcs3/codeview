<template>
    <div
        ref="container"
        class="monaco-editor"
        :style="`height: ${height}px`"
    ></div>
</template>

<script>
import * as monaco from "monaco-editor";
export default {
    name: "monacoEditor",
    props: {
        opts: {
            type: Object,
            default() {
                return {};
            },
        },
        height: {
            type: Number,
            default: 500,
        },
    },
    data() {
        return {
            // 主要配置
            defaultOpts: {
                value: "", // 编辑器的值
                theme: "vs", // 编辑器主题：vs, hc-black, or vs-dark
                roundedSelection: false, // 右侧不显示编辑器预览框
                autoIndent: true, // 自动缩进
                automaticLayout: true,
                foldingStrategy: "indentation", // 代码可分小段折叠
                minimap: {
                    enabled: false, // 不要小地图
                },
            },
        };
    },
    watch: {
        opts: {
            handler() {
                this.init();
            },
            deep: true,
        },
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            // 初始化container的内容，销毁之前生成的编辑器
            this.$refs.container.innerHTML = "";

            this.editorOptions = Object.assign(this.defaultOpts, this.opts);
            // 生成编辑器对象
            this.monacoEditor = monaco.editor.create(
                this.$refs.container,
                this.editorOptions
            );
            // 编辑器内容发生改变时触发
            this.monacoEditor.onDidChangeModelContent(() => {
                this.$emit("change", this.monacoEditor.getValue());
            });
        },
        // 供父组件调用手动获取值
        getVal() {
            return this.monacoEditor.getValue();
        },
    },
};
</script>
