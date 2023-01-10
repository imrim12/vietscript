import { MethodDefinition } from "./class/MethodDefinition";
import { PropertyDefinition } from "./class/PropertyDefinition";

export class ClassDeclaration {
  type: "ClassDeclaration";

  id: {
    type: "Identifier";
    name: string;
  };

  body: {
    type: "ClassBody";
    body: Array<MethodDefinition | PropertyDefinition>;
  };
}
