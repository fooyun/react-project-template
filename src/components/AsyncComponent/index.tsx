import React, { ComponentType, createElement, useEffect, useState } from 'react';

interface Module {
  default: ComponentType;
}

interface AsyncComponentProps {
  loader: () => Promise<Module | ComponentType>;
  loading?: React.ReactNode; // 加载时的占位提示
  loadingDelay?: number; // 如果在 loadingDelay 时间内返回，则不会显示 loading 占位提示，避免页面loading闪烁。
  loadingError?: React.ReactNode; // 加载异常时的占位提示
}

const Empty = () => <></>;

const AsyncComponent = (props: AsyncComponentProps) => {
  const {
    loader,
    loading = 'loading...',
    loadingDelay = 300,
    loadingError = 'error in loading',
  } = props;
  const [ready, setReady] = useState(false);
  const [component, setComponent] = useState<ComponentType>(() => Empty);
  const [loadingTip, setLoadingTip] = useState<React.ReactNode>(null);
  const errorComponent = () => <>{loadingError}</>;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingTip(loading);
    }, loadingDelay);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    loader()
      .then((raw) => {
        const fn = 'default' in raw ? raw.default : raw;
        setComponent(() => fn);
      })
      .catch(() => {
        setComponent(() => errorComponent);
      })
      .finally(() => {
        setReady(true);
      });
  }, [loader]);

  const content = createElement(component); // todo: 如果需要，这里可以给异步加载的组件传入初始 props

  return <>{ready ? content : loadingTip}</>;
};

export default AsyncComponent;
