<template>
    <div id="codeEditBox"></div>
</template>
<script lang="ts" setup>
import { json } from '../assets/themes/OneDarkPro'
import html from '../assets/grammars/html.tmLanguage.json'
import css from '../assets/grammars/css.tmLanguage.json'
import js from '../assets/grammars/JavaScript.tmLanguage.json'
import * as monaco from 'monaco-editor'
import { loadWASM } from 'onigasm'
import { onMounted, ref } from 'vue'
import { Registry } from 'monaco-textmate'
import { wireTmGrammars } from 'monaco-editor-textmate'

const map = {
    'text.html.basic': html,
    'source.css': css,
    'source.js': js,
}
const editor = ref(null)
let hasGetWorkUrl = false
const language = ref("html")
const initEditor = () => {
    // 初始化编辑器，确保dom已经渲染
    editor.value = monaco.editor.create(document.getElementById('codeEditBox'), {
        value: ``, //编辑器初始显示文字
        minimap: {
            enabled: false // 关闭小地图
        },
        language: language.value, //语言支持自行查阅demo
        theme: 'OneDarkPro', //编辑器主题
        selectOnLineNumbers: true,//显示行号
        roundedSelection: false,
        cursorStyle: 'line', //光标样式
        automaticLayout: true, //自动布局
        glyphMargin: true, //字形边缘
        useTabStops: false,
        fontSize: 18, //字体大小
        autoIndent: 'full', //自动布局
        // quickSuggestionsDelay: 100, //代码提示延时
        fontFamily: 'MonoLisa, monospace',
        contextmenu: false, // 不显示右键菜单
        fixedOverflowWidgets: true, // 让语法提示层能溢出容器
    });

}
onMounted(async () => {
    await loadWASM(`/onigasm/onigasm.wasm`)
    window.MonacoEnvironment = {
        getWorkerUrl: function (moduleId, label) {
            hasGetWorkUrl = true
            if (label === 'json') {
                return 'monaco/json.worker.bundle.js'
            }
            if (label === 'css' || label === 'scss' || label === 'less') {
                return 'monaco/css.worker.bundle.js'
            }
            if (label === 'html' || label === 'handlebars' || label === 'razor') {
                return 'monaco/html.worker.bundle.js'
            }
            if (label === 'typescript' || label === 'javascript') {
                return 'monaco/ts.worker.bundle.js'
            }
            return 'monaco/editor.worker.bundle.js'
        }
    }
    monaco.editor.defineTheme('OneDarkPro', json)
    monaco.editor.setTheme('OneDarkPro')
    initEditor()
    const grammars = new Map()
    grammars.set('html', 'text.html.basic')
    const registry = new Registry({
        getGrammarDefinition: (scopeName: string) => {
            return new Promise((resolve) => {
                resolve({
                    format: 'json',
                    content: map[scopeName]
                })
            })
        }
    })
    monaco.languages.register({ id: 'html' })
    // 这里为了防止worker还没加载完就执行，所以加了个延时
    let loop = () => {
        if (hasGetWorkUrl) {
            Promise.resolve().then(async () => {
                await wireTmGrammars(monaco, registry, grammars, editor.value)
            })
        } else {
            setTimeout(() => {
                loop()
            }, 100)
        }
    }
    loop()
    // Promise.resolve().then(async () => {
    //     await wireTmGrammars(monaco, registry, grammars, editor.value)
    // })
})
</script>
<style>
#codeEditBox {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    height: 100vh;
    padding: 0;
    overflow: hidden;
    margin-bottom: 15px;
}
</style>