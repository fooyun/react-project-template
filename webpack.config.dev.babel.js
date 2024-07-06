import path from 'path';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import bodyParser from 'body-parser';
import MockData from './mock';

const resolve = (dir) => path.resolve(__dirname, dir);
const isMock = () => process.env.DATA_MODE !== 'api';

export default {
  mode: 'development',
  entry: [resolve('./src/index.tsx')],
  output: {
    path: resolve('dist'),
    filename: 'main.js',
    // publicPath: '/static/',
    clean: true,
  },
  devtool: 'source-map',
  devServer: {
    static: resolve('dist'),
    host: '127.0.0.1',
    port: 8080, // 端口号
    open: true,
    hot: true,
    client: {
      overlay: {
        errors: true,
      },
    },
    setupMiddlewares: (middlewares, devServer) => {
      // 返回模拟请求数据
      if (isMock()) {
        const { app } = devServer;
        Object.keys(MockData).forEach((key) => {
          const [type, url] = key.split(/\s+/);
          const method = type.toLowerCase();
          app.use(url, bodyParser.json());
          app[method](url, MockData[key]);
        });
      }

      return middlewares;
    },
    proxy: [
      {
        context: ['/api'],
        target: 'http://127.0.0.1:6001/',
        secure: false,
        changeOrigin: true,
      },
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              esModule: false, // 决定导入 css module 的写法
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf)$/,
        type: 'asset',
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: resolve('./src/index.html'),
      filename: 'index.html',
      hash: true,
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': resolve('./src'),
    },
  },
};
