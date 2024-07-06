import { getTime } from './time';

test('get time test', () => {
  const time = getTime();
  expect(typeof time).toBe('string');
});
