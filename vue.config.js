const { ESBuildPlugin } = require('esbuild-loader')

// 覆盖 webpack 配置
module.exports = {
  // 路径配置
  outputDir: 'dist/pc',
  publicPath: './',
  // sourcemap
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      new ESBuildPlugin()
    ]
  },
  chainWebpack: config => {
    // esbuild 配置
    config.module
      .rule('js')
      .test('/.js$/')
      .use('esbuild-loader')
      .loader('esbuild-loader')
      .end()

    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: ['./src/assets/var.scss']
        })
        .end()
    })
  }
}