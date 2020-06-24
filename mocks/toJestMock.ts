export function toJestMock(fn: (...args: any[]) => any): jest.Mock {
  return fn as jest.Mock
}
