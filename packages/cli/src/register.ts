import * as nodeModule from 'node:module'

const register = (nodeModule as any).register as (
  specifier: string,
  parentURL: string | URL,
) => void

register('./loader.js', import.meta.url)
