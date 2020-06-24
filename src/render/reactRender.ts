import { Context } from 'koa'
import { _cleanCache } from '../require'
import { renderComponent } from './renderComponent'

export interface IKoa2ReactOptions {
  root: string
  ext?: string
  cache?: boolean
  layout?: string
}

export function reactRender(ctx: Context, options: IKoa2ReactOptions) {
  return function (filename: string, props?: Record<string, unknown>): void {
    const { root, cache = true, layout } = options
    if (!cache) {
      _cleanCache()
    }
    ctx.type = 'html'
    const ext = (options.ext || 'jsx').replace(/^\./, '')
    ctx.body = renderComponent({ root, ext, layout, filename, props: { __state: ctx.state, ...props } })
  }
}
