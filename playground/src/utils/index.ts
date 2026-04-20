export function formatFunctionName(name: string): string {
  return `_${name.replace(/(\s)|(^\d+)|([^\sA-Z])/gi, (_, p1, p2, p3) => {
    if (p1)
      return '_'
    else if (p2)
      return `_${p2}`
    else return String(p3.codePointAt(0))
  })}`
}
