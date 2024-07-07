import request from '@/util/request';

export const fetchGoods = () => {
  return request('/api/v1/goods');
};
