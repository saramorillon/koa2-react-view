import { Context, Next } from 'koa'
import { IKoa2ReactOptions, reactRender } from './render/reactRender'

export function render(options: IKoa2ReactOptions) {
  return function (ctx: Context, next: Next): Promise<any> {
    if (!ctx.render) {
      ctx.render = reactRender(ctx, options)
    }
    return next()
  }
}
