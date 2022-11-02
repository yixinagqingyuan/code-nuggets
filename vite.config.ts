import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from "path";
import monacoEditorPlugin from 'vite-plugin-monaco-editor';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    monacoEditorPlugin.default({}),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      components: path.resolve(__dirname, "src/components"),
      styles: path.resolve(__dirname, "src/styles"),
      plugins: path.resolve(__dirname, "src/plugins"),
      views: path.resolve(__dirname, "src/views"),
      packages: path.resolve(__dirname, "src/packages"),
      utils: path.resolve(__dirname, "src/utils"),
      apis: path.resolve(__dirname, "src/apis"),
      dirs: path.resolve(__dirname, "src/directives"),
      hooks: path.resolve(__dirname, "src/hooks"),
    },
  },
})
