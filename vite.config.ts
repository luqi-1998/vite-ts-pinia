import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
    ],
    css: {
        preprocessorOptions: {
            less: {
                modifyVars: {
                    hack: `true; @import (reference) "${path.resolve("src/assets/style/base.less")}";`,
                },
                javascriptEnabled: true,
            },
        },
    },
    resolve: {
        //设置别名
        alias: {
            '@': path.resolve(__dirname, 'src')
        },
        extensions: [".js", ".json", ".ts", ".vue"] // 使用路径别名时想要省略的后缀名
    },
    server: {
        proxy: {
            // 选项写法
            "/api": {
                target: "http://127.0.0.1:7878", // 所要代理的目标地址
                rewrite: (path) => path.replace(/^\/api/, ""), // 重写传过来的path路径，比如 `/apis/index/1?id=10&name=zs`（注意:path路径最前面有斜杠（/），因此，正则匹配的时候不要忘了是斜杠（/）开头的；选项的 key 也是斜杠（/）开头的）
                changeOrigin: true // true/false, 默认值:false - 将主机报头的来源更改为目标URL
            }
        }
    }
})
