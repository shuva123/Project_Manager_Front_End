import { orderByPipe } from './OrderByPipe';

describe('orderByPipe', () => {
  it('create an instance orderByPipe', () => {
    const pipe = new orderByPipe();
    expect(pipe).toBeTruthy();
  });
});