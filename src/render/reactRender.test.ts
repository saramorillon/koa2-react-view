import { Context } from 'koa'
import { _cleanCache } from '../require'
import { reactRender } from './reactRender'
import { renderComponent } from './renderComponent'

jest.mock('./renderComponent')
jest.mock('../require')

describe('reactRender', () => {
  beforeEach(jest.resetAllMocks)

  it('should not clean cache if cache option is true', () => {
    const ctx = ({} as any) as Context
    reactRender(ctx, { root: 'root', cache: true })('filename')
    expect(_cleanCache).not.toHaveBeenCalled()
  })

  it('should not clean cache if cache option is not provided', () => {
    const ctx = ({} as any) as Context
    reactRender(ctx, { root: 'root' })('filename')
    expect(_cleanCache).not.toHaveBeenCalled()
  })

  it('should clean cache if cache option is false', () => {
    const ctx = ({} as any) as Context
    reactRender(ctx, { root: 'root', cache: false })('filename')
    expect(_cleanCache).toHaveBeenCalled()
  })

  it('should use default ext if ext options is not provided', () => {
    const ctx = ({} as any) as Context
    reactRender(ctx, { root: 'root' })('filename', { prop: 'prop' })
    expect(renderComponent).toHaveBeenCalledWith({
      root: 'root',
      ext: 'jsx',
      filename: 'filename',
      props: { prop: 'prop' },
    })
  })

  it('should remove the . in the ext', () => {
    const ctx = ({} as any) as Context
    reactRender(ctx, { root: 'root', ext: '.ext' })('filename', { prop: 'prop' })
    expect(renderComponent).toHaveBeenCalledWith({
      root: 'root',
      ext: 'ext',
      filename: 'filename',
      props: { prop: 'prop' },
    })
  })

  it('should add ctx.state in the props', () => {
    const ctx = ({ state: 'state' } as any) as Context
    reactRender(ctx, { root: 'root' })('filename', { prop: 'prop' })
    expect(renderComponent).toHaveBeenCalledWith({
      root: 'root',
      ext: 'jsx',
      filename: 'filename',
      props: {
        __state: 'state',
        prop: 'prop',
      },
    })
  })
})
