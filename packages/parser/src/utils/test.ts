export default function toPlainObject(object: unknown): unknown {
  return JSON.parse(JSON.stringify(object))
}
