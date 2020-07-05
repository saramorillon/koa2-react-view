import { Context } from 'koa'
import render from '.'
import { toJestMock } from '../mocks/toJestMock'
import { reactRender } from './render/reactRender'

jest.mock('react')
jest.mock('react-dom/server')
jest.mock('./render/reactRender')

describe('render', () => {
  beforeEach(jest.resetAllMocks)

  it('should add render function to ctx', () => {
    toJestMock(reactRender).mockReturnValue('mockReactRender')
    const ctx = ({} as any) as Context
    render({ root: 'root' })(ctx, jest.fn())
    expect(ctx.render).toBe('mockReactRender')
    expect(reactRender).toHaveBeenCalledWith(ctx, { root: 'root' })
  })

  it('should not mutate current ctx.render function', () => {
    const ctx = ({ render: 'renderFunction' } as any) as Context
    render({ root: 'root' })(ctx, jest.fn())
    expect(ctx.render).toBe('renderFunction')
    expect(reactRender).not.toHaveBeenCalled()
  })

  it('should call next function', () => {
    const ctx = ({ render: 'renderFunction' } as any) as Context
    const next = jest.fn()
    render({ root: 'root' })(ctx, next)
    expect(next).toHaveBeenCalled()
  })
})
