module.exports = {
  // 当production 模式下baseUrl为 ./ 否则（test或者development）为/
  baseUrl: process.env.NODE_ENV === 'production'
    ? './' : '/'
}
