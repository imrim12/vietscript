import parser from "vietscript";

export default function (source: string) {
  const form = parser.parse(source);

  return `export default ${JSON.stringify(form)}`;
}
