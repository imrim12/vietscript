import type * as vscode from 'vscode'
import type { LanguageClientOptions, ServerOptions } from 'vscode-languageclient/node'
import * as path from 'node:path'

import {
  LanguageClient,
  TransportKind,
} from 'vscode-languageclient/node'

let client: LanguageClient | undefined

export function activate(context: vscode.ExtensionContext): void {
  const serverModule = context.asAbsolutePath(path.join('dist', 'server.js'))

  const serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: { execArgv: ['--nolazy', '--inspect=6009'] },
    },
  }

  const clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: 'file', language: 'vietscript' }],
    synchronize: {
      configurationSection: 'vietscript',
    },
  }

  client = new LanguageClient(
    'vietscriptLanguageServer',
    'VietScript Language Server',
    serverOptions,
    clientOptions,
  )

  client.start()
  context.subscriptions.push({ dispose: () => client?.stop() })
}

export function deactivate(): Thenable<void> | undefined {
  return client?.stop()
}
