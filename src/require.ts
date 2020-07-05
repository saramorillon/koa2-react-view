import pluginTransform from '@babel/plugin-transform-runtime'
import presetEnv from '@babel/preset-env'
import presetReact from '@babel/preset-react'

require('@babel/register')({
  presets: [presetReact, presetEnv],
  plugins: [pluginTransform],
})

export function _cleanCache(): void {
  Object.keys(require.cache).forEach(function (key) {
    delete require.cache[key]
  })
}

export function _require(path: string): any {
  return require(path).default
}
