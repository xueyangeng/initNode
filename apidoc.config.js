let url = 'http://127.0.0.1:3333';
if (process.env.NODE_ENV === 'test') {
  url = 'http://192.168.100.16:8360';
}
if (process.env.NODE_ENV === 'prod') {
  url = 'http://192.168.100.16:8360';
}

module.exports = {
  name: 'ttd.server',
  version: '0.0.0',
  description: 'ttd biz server',
  apidoc: {
    title: 'ttd biz server',
    url,
  },
};
