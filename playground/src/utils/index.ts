export const formatFunctionName = (name: string) =>
  `_${name.replace(/(\s)|(^[0-9]+)|([^\sA-Za-z])/g, (_, p1, p2, p3) => {
    if (p1) return "_";
    else if (p2) return "_" + p2;
    else return String(p3.codePointAt(0));
  })}`;
