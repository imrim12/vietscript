import type * as monacoEditor from 'monaco-editor'

type MonacoNS = typeof monacoEditor
type CompletionItem = monacoEditor.languages.CompletionItem
type Range = monacoEditor.IRange

function genKeywords(keywords: string[], kind: CompletionItem['kind'], range: Range): CompletionItem[] {
  return keywords.map((keyword) => {
    return {
      label: keyword,
      kind,
      insertText: keyword,
      range,
    }
  })
}

export const KEYWORDS = [
  'khai báo',
  'hằng số',
  'hàm',
  'trường hợp',
  'trả về',
  'duyệt',
  'ngược lại',
  'nếu',
  'bắt lỗi',
  'tạo mới',
  'cuối cùng',
  'trả về',
  'tiếp tục',
  'lặp',
  'khi mà',
  'hàm',
  'mặc định',
  'báo lỗi',
  'xoá',
  'trong',
  'từ',
  'in ra',
]

export function createDependencyProposals(range: Range, monaco: MonacoNS): CompletionItem[] {
  return [
    ...genKeywords(KEYWORDS, monaco.languages.CompletionItemKind.Keyword, range),
    {
      label: 'chiều dài mảng',
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: 'chiều dài mảng',
      range,
    },
  ]
}
