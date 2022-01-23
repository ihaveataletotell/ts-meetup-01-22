import * as FileSystem from "fs";
import * as TypeScript from "typescript";

export interface DictionaryData {
  [key: string]: string | number | boolean;
}

type SupportedNodeTypes =
  | TypeScript.BinaryExpression
  | TypeScript.StringLiteral
  | TypeScript.NumericLiteral
  | TypeScript.TrueLiteral
  | TypeScript.FalseLiteral;

type UnsupportedKinds = Exclude<TypeScript.SyntaxKind, SupportedNodeTypes['kind']>;

type UnsupportedNodeTypes =
  TypeScript.PrimaryExpression & { kind: UnsupportedKinds };

const getNodeText = (node: TypeScript.Node): string | number | boolean => {
  const value = node as
    | SupportedNodeTypes
    | UnsupportedNodeTypes;

  switch (value.kind) {
    case TypeScript.SyntaxKind.TrueKeyword:
      return true;

    case TypeScript.SyntaxKind.FalseKeyword:
      return false;

    case TypeScript.SyntaxKind.BinaryExpression:
      return <string>getNodeText(value.left) + <string>getNodeText(value.right);

    case TypeScript.SyntaxKind.StringLiteral:
      return value.text;

    case TypeScript.SyntaxKind.NumericLiteral:
      return Number(value.text);

    default:
      console.log('unsupported node with kind:', TypeScript.SyntaxKind[value.kind])
      return '';
  } /* switch */
}

const readFromFile = (filePath: string): DictionaryData | undefined => {
  if (!FileSystem.existsSync(filePath)) throw new Error('file path does not exist ' + filePath);

  const fileData = FileSystem.readFileSync(filePath).toString();
  const fileScript = TypeScript.createSourceFile('', fileData, TypeScript.ScriptTarget.ES5);
  const result: DictionaryData = {};

  fileScript.forEachChild((node): void => {
    if (node.kind !== TypeScript.SyntaxKind.VariableStatement) return;
    const asserted = node as TypeScript.VariableStatement;

    asserted.declarationList.declarations.forEach((x: TypeScript.VariableDeclaration) => {
      if (!x.initializer) return;
      if (x.name.kind !== TypeScript.SyntaxKind.Identifier) return;

      const key = String(x.name.escapedText)
      result[key] = getNodeText(x.initializer);
    });
  });

  return result;
};

export default readFromFile;
