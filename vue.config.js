// 覆盖 webpack 配置
module.exports = {
  // 路径配置
  outputDir: 'dist/pc',
  publicPath: './',
  // sourcemap
  productionSourceMap: false,
  chainWebpack: config => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: ['./src/assets/css/theme/var.scss']
        })
        .end()
    })
  }
}