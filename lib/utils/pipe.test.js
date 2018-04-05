const pipe = require('./pipe');

describe('pipe', () => {
  it('transforms data by piping through a list of functions', () => {
    const data = 'DATA';
    const fn1 = jest.fn().mockReturnValue('fn1 result');
    const fn2 = jest.fn().mockReturnValue('fn2 result');
    const fn3 = jest.fn().mockReturnValue('fn3 result');
    const result = pipe(
      fn1,
      fn2,
      fn3,
    )(data);

    expect(fn1).toBeCalledWith(data);
    expect(fn2).toBeCalledWith('fn1 result');
    expect(fn3).toBeCalledWith('fn2 result');
    expect(result).toEqual('fn3 result');
  });
});
