<template>
    <div class="box">
        <Codemirror style="font-size: 16px;" ref="CodemirrorRef" :modelValue="code" :style="{ height: '100%' }"
            :autofocus="true" :indent-with-tab="true" :tabSize="2" :extensions="extensions" @change="change">
        </Codemirror>
    </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { oneDark } from '@codemirror/theme-one-dark'
import { javascript } from '@codemirror/lang-javascript'
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { json } from "@codemirror/lang-json";
import { markdown } from "@codemirror/lang-markdown";
const extensions = [html(), oneDark]
const code = ref('')
const CodemirrorRef = ref(null)
const change = (e) => {
    console.log(e)
}
</script>
<style>
.box {
    width: 100%;
    height: 100vh;
}
</style>