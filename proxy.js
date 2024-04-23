const { createProxyMiddleware } = require('http-proxy-middleware');

const proxy = createProxyMiddleware({
  target: 'https://gidas-api.vercel.app',
  ws: true,
  changeOrigin: true,
});

module.exports = function (app) {
  app.use('/socket.io', proxy);
};
