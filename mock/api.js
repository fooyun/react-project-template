const mockjs = require('mockjs');

const proxy = {
  // 搜索
  'GET /api/v1/goods': (req, res) => {
    res.send(
      mockjs.mock({
        code: '200',
        data: {
          'goods|2-5': [
            {
              name: '@title(1)',
              price: '@int(1, 10000)',
            },
          ],
        },
        success: true,
      })
    );
  },
};

module.exports = proxy;
