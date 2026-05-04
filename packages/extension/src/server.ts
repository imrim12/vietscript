import type { Diagnostic, InitializeParams, InitializeResult } from 'vscode-languageserver/node'
import { VietScriptError, Parser as VjsParser } from '@vietscript/parser'
import { TextDocument } from 'vscode-languageserver-textdocument'

import {
  createConnection,
  DiagnosticSeverity,
  ProposedFeatures,
  TextDocuments,
  TextDocumentSyncKind,
} from 'vscode-languageserver/node'

const connection = createConnection(ProposedFeatures.all)
const documents = new TextDocuments(TextDocument)

interface Settings {
  enabled: boolean
}

const defaultSettings: Settings = { enabled: true }
let globalSettings: Settings = defaultSettings

connection.onInitialize((_params: InitializeParams): InitializeResult => {
  return {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
    },
  }
})

connection.onDidChangeConfiguration((change) => {
  const next = change.settings?.vietscript?.diagnostics
  if (next && typeof next.enabled === 'boolean') {
    globalSettings = { enabled: next.enabled }
  }
  for (const doc of documents.all()) validate(doc)
})

documents.onDidChangeContent((event) => {
  validate(event.document)
})

documents.onDidClose((event) => {
  connection.sendDiagnostics({ uri: event.document.uri, diagnostics: [] })
})

function validate(doc: TextDocument): void {
  if (!globalSettings.enabled) {
    connection.sendDiagnostics({ uri: doc.uri, diagnostics: [] })
    return
  }

  const diagnostics: Diagnostic[] = []
  const text = doc.getText()

  try {
    const parser = new VjsParser()
    parser.filename = doc.uri
    parser.parse(text)
  }
  catch (e) {
    if (e instanceof VietScriptError) {
      const line = (e.line ?? 1) - 1
      const column = (e.column ?? 1) - 1
      diagnostics.push({
        severity: DiagnosticSeverity.Error,
        source: 'vietscript',
        message: e.message,
        range: {
          start: { line, character: column },
          end: { line, character: column + 1 },
        },
      })
    }
    else if (e instanceof Error) {
      diagnostics.push({
        severity: DiagnosticSeverity.Error,
        source: 'vietscript',
        message: e.message,
        range: {
          start: { line: 0, character: 0 },
          end: { line: 0, character: 1 },
        },
      })
    }
  }

  connection.sendDiagnostics({ uri: doc.uri, diagnostics })
}

documents.listen(connection)
connection.listen()
