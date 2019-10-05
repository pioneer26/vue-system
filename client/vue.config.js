const path = require('path')
const debug = process.env.NODE_ENV !== 'production'
module.exports = {
  baseUrl: '/', // 根域上下文目录
  outputDir: 'dist', // 构建输出目录
  assetsDir: 'assets', // 静态资源目录 (js, css, img, fonts)
  lintOnSave: false, // 是否开启eslint保存检测，有效值：ture | false | 'error'
  runtimeCompiler: true, // 运行时版本是否需要编译
  transpileDependencies: [], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
  productionSourceMap: true, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
  configureWebpack: config =>{
    if (debug) {
      config.devtool ='cheap-module-eval-source-map';
    } else {
      // Object.assign(config, { // 开发生产共同配置
      //     resolve: {
      //         alias: {
      //             '@': path.resolve(__dirname, './src'),
      //             '@c': path.resolve(__dirname, './src/components'),
      //             'vue$': 'vue/dist/vue.esm.js'
      //         }
      //     }
      // })
    }
  },
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
    https: false,
    hotOnly: false,
    // 配置跨域
    proxy: { 
      '/api': {
          target: 'http://localhost:8000/api/',
          ws: true,
          changOrigin: true,
          pathRewrite: {
              '^/api': ''
          }
      }
    },
    before: app => { }
}
}