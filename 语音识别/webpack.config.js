const fs = require('fs')
const path = require('path')

const process = require('process');
const cwd = process.cwd();

module.exports = {
  mode: 'development',
  devServer: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, './key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, './cert.pem')),
    },
    contentBase: cwd,
    compress: true,
    host: '0.0.0.0',
    port: 9000,
    proxy: {
      '/server_api': 'http://vop.baidu.com',
    }
  },
}