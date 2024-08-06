const genKeywords = (keywords: string[], kind: any, range: any) => {
  return keywords.map((keyword) => {
    return {
      label: keyword,
      kind,
      insertText: keyword,
      range: range
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
  'in ra'
]

export function createDependencyProposals(range: any, monaco: any) {
  return [
    ...genKeywords(KEYWORDS, monaco.languages.CompletionItemKind.Keyword, range),
    {
      label: 'chiều dài mảng',
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: 'chiều dài mảng',
      range
    }
  ]
}
