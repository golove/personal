import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8000, // 你需要定义的端口号
    open: true, // open支持boolean/string类型，为true时打开默认浏览器，为string类型时，打开指定浏览器，具体查看官网即可
    proxy: { // 跨域请求代理 https://www.cnblogs.com/cckui/p/10331432.html
      '/api': {
        target: 'http://127.0.0.1:8888/', // 接口地址
        changeOrigin: true,
        ws: true,
       
      }
    }
 }
})
