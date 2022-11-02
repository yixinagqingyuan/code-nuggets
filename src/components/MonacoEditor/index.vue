<template>
    <div class="edit-container" ref="editContainer">
        <div class="edit-header">
            <el-select v-model="language" size="small">
                <el-option v-for="item in languageArr" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </div>
        <div class="edit-main" ref="editorEl"></div>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, computed, nextTick, onUnmounted } from 'vue'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import ResizeObserver from 'resize-observer-polyfill'
let editor = null // 编辑器实例
const language = ref('vue2')
const editorEl = ref(null)// 编辑器dom 
const editContainer = ref(null)// 编辑器容器dom
const timer = ref(null)// 防止卡顿的定时器
const languageArr = [
    {
        value: 'vue2',
        label: 'vue2'
    },
    {
        value: 'vue3',
        label: 'vue3'
    },
]
// 先处理vue语言
const languageVal = computed(() => {
    return language.value == 'vue3' || language.value == 'vue2' ? 'html' : language.value
})
// 初始化编辑器
const createEditor = async () => {
    if (!editor) {
        editor = monaco.editor.create(editorEl.value, {
            minimap: {
                enabled: false // 关闭小地图
            },
            language: languageVal.value, //语言支持自行查阅demo
            wordWrap: 'on', // 代码超出换行
            theme: 'vs-dark', // 主题
            fontSize: 16,
            fontFamily: 'MonoLisa, monospace',
            // autoIndent: 'fu', //自动布局
            contextmenu: false, // 不显示右键菜单
            fixedOverflowWidgets: true, // 让语法提示层能溢出容器
        })
        // 监听编辑事件
        editor.onDidChangeModelContent(() => {
            console.log(editor.getValue())
        })
        // 监听失焦事件
        editor.onDidBlurEditorText(() => {
            console.log(editor.getValue())
        })
    }
}

const resize = () => {
    // 100ms内只执行一次，优化卡顿问题
    if (timer.value) {
        return
    }
    timer.value = setTimeout(() => {
        nextTick(() => {
            if (!editContainer.value) {
                return
            }
            console.log(editor)
            editor && editor.layout()
            timer.value = null
        })
    }, 100)
}
const resizeObserver = new ResizeObserver(entries => {
    console.log(entries)
    resize()
})
onMounted(() => {
    // 监听dom大小变化
    createEditor()
    resizeObserver.observe(editContainer.value)
})
// 即将解除挂载
onUnmounted(() => {
    resizeObserver.unobserve(editContainer.value)
})
</script>
<style scoped lang="scss">
.edit-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    width: 100%;

    .edit-header {
        height: 40px;
        background: #21252b;
        line-height: 40px;
        padding: 0 10px;
    }

    .edit-main {
        flex: 1;
        width: 100%;
        overflow: hidden;
    }
}
</style>