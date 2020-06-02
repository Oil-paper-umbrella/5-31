const devServer = {
  // host: 'localhost',
  host: "127.0.0.1",
  port: 8083, // 端口号
  https: false, // https:{type:Boolean}
  open: true, //配置自动启动浏览器  http://172.11.11.22:8888/rest/XX/
  hotOnly: true, // 热更新
  proxy: {
    '/api': {
      target: 'http://39.100.12.28:8080', //API服务器的地址
      ws: false, //代理websockets
      changeOrigin: true, // 虚拟的站点需要更管origin
      pathRewrite: { //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
        '^/api': '/'
      }
    }
  },
  //proxy: 'http://39.100.12.28:8080',    配置跨域处理,只有一个代理
  // proxy: {
  //   '/dianyeAutho/rest/JsonData/FourModual': {
  //     target: 'http://39.100.12.28:8080', // 需要请求的地址
  //     changeOrigin: true, // 是否跨域
  //     pathRewrite: { // 重写target中的请求地址，也就是说，在请求的时候，url用'/login'增加为'http://211.69.26.108:8000/login'
  //       '^/dianyeAutho/rest/JsonData/FourModual': '/dianyeAutho/rest/JsonData/FourModual '
  //     }
  //   },
  // },
  historyApiFallback: {
    rewrites: [{
        from: /\/index/,
        to: '/index.html'
      },
      {
        from: /\/login/,
        to: '/login.html'
      },
      {
        from: /\/whole/,
        to: '/whole.html'
      }
    ]
  }
}
module.exports = devServer;