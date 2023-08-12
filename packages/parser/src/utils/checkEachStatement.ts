export const checkEachStatement = (condition: () => boolean, funcs: Array<() => any>) => {
  while (condition()) {
    for (const callback of funcs) {
      condition() && callback();
    }
  }
};
