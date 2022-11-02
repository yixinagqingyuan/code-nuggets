

<template>
    <div class="code-container">
        <div class="header">
        </div>
        <splitpanes class="theme">
            <pane>
                <MonacoEditor></MonacoEditor>
            </pane>
            <pane>
                <Sandbox></Sandbox>
            </pane>
        </splitpanes>
    </div>

</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import MonacoEditor from '@/components/MonacoEditor/index.vue'
import Sandbox from '@/components/sandbox/index.vue'
// onMounted(() => {
//     createSandbox({
//         el: '#sanbox-container',
//     })
// })
</script>

<style scoped lang="scss">
.code-container {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;

    .header {
        height: 64px;
        border-bottom: 1px solid #2f3742;
    }

    .theme {
        flex: 1;
        background: #282c34;

        :deep(.splitpanes__splitter) {
            width: 3px;
        }

    }
}
</style>
