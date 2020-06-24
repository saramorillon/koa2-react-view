import { join } from 'path'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { _require } from '../require'

interface IReactRenderOptions {
  root: string
  ext: string
  filename: string
  props?: Record<string, unknown>
  layout?: string
}

export function renderComponent(options: IReactRenderOptions): string {
  const { root, ext, layout, filename, props } = options
  let path = join(root, `${filename}.${ext}`)
  let component = React.createElement(_require(path), props)
  if (layout) {
    path = join(root, `${layout}.${ext}`)
    component = React.createElement(_require(path), props, component)
  }
  return ReactDOMServer.renderToStaticMarkup(component)
}
