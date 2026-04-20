import { readFileSync } from 'node:fs'

import { compile } from './compile.js'

export default {
  name: 'vietscript',
  setup(build: {
    onLoad: (
      opts: { filter: RegExp },
      callback: (args: { path: string }) => { contents: string, loader: string },
    ) => void
  }) {
    build.onLoad({ filter: /\.vjs$/ }, (args) => {
      const source = readFileSync(args.path, 'utf8')
      const { code } = compile(source, args.path)
      return { contents: code, loader: 'js' }
    })
  },
}
