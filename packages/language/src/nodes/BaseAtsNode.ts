import { AtsNode } from "@davascript/shared";

export class BaseAtsNode<T = any> {
  public node: AtsNode;

  public value: T;
}
