import { Executor } from "./executor";
import { Parser } from "./parser";

const parser = new Parser();

const executor = new Executor();

export default parser;

export { executor };
export { Tokenizer } from "./tokenizer";
export { Parser } from "./parser";

if (typeof window !== "undefined") {
  customElements.define(
    "vi-script",
    class extends HTMLElement {
      constructor() {
        super();
      }

      connectedCallback() {
        setTimeout(() => {
          const script = this.childNodes.item(0).textContent?.trim();

          this.innerHTML = "";

          if (script) {
            executor.execute(script);
          }
        });
      }
    },
  );

  // @ts-ignore
  window.VietScript = { parser, executor };
}
