export function _cleanCache(): void {
  Object.keys(require.cache).forEach(function (key) {
    delete require.cache[key]
  })
}

export function _require(path: string): any {
  return require(path).default
}
