import React from 'react';
import AsyncComponent from '@/components/AsyncComponent';

export const dynamicWrapper = (loader: any): React.ReactNode => {
  // 非函数，原样返回
  if (typeof loader !== 'function') {
    return loader;
  }
  // 同步方法，返回执行结果
  if (loader.toString().indexOf('.then(') < 0) {
    return loader();
  }
  // 异步方法，异步加载组件
  return <AsyncComponent loader={loader} />;
};

export default {
  dynamicWrapper,
};
