const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(proxy(['/api/**', '/gateway/**', '/user/**'], {
    target: 'https://i18n.qunhequnhe.com/',
    changeOrigin: true
  }));
};