import type { Parser } from '@parser/parser'
import { Identifier } from '@parser/nodes/identifier/Identifier'
import { Literal } from '@parser/nodes/literals/Literal'
import { Keyword } from '@vietscript/shared'

import { ParameterList } from '../declarations/ParameterList'

import { LabelledStatement } from '../statements/LabelledStatement'

import { ArrayExpression } from './ArrayExpression'
import { ArrowFunctionExpression } from './ArrowFunctionExpression'
import { AssignmentExpression } from './AssignmentExpression'
import { AwaitExpression } from './AwaitExpression'
import { BinaryExpression } from './BinaryExpression'
import { CallExpression } from './CallExpression'
import { ConditionalExpression } from './ConditionalExpression'
import { FunctionExpression } from './FunctionExpression'
import { LogicalExpression } from './LogicalExpression'
import { MemberExpression } from './MemberExpression'
import { NewExpression } from './NewExpression'
import { ObjectExpression } from './ObjectExpression'
import { TaggedTemplateExpression } from './TaggedTemplateExpression'
import { ThisExpression } from './ThisExpression'
import { UnaryExpression } from './UnaryExpression'
import { UpdateExpression } from './UpdateExpression'
import { YieldExpression } from './YieldExpression'

function applyPostfixImpl(self: any, parser: Parser) {
  while (true) {
    const t = parser.lookahead?.type as string
    if (t === '.' || t === '[' || t === '?.') {
      const snapshot = { ...self }
      for (const key of Object.keys(self)) delete self[key]
      Object.assign(self, new MemberExpression(parser, snapshot))
      continue
    }
    if (t === '(') {
      const snapshot = { ...self }
      for (const key of Object.keys(self)) delete self[key]
      Object.assign(self, new CallExpression(parser, snapshot))
      continue
    }
    if (t === '??' || t === '||' || t === '&&') {
      const snapshot = { ...self }
      for (const key of Object.keys(self)) delete self[key]
      Object.assign(self, new LogicalExpression(parser, snapshot as any))
      continue
    }
    break
  }
}

export class Expression {
  [key: string]: any;

  constructor(parser: Parser) {
    switch (parser.lookahead?.type as string) {
      case Keyword.ASYNC:
      case Keyword.FUNCTION: {
        Object.assign(this, new FunctionExpression(parser))
        break
      }
      case '[': {
        Object.assign(this, new ArrayExpression(parser))
        applyPostfixImpl(this, parser)
        break
      }
      case '(': {
        parser.eat('(')
        const arrowParams = new ParameterList(parser, ')').parameters
        parser.eat(')')
        Object.assign(this, new ArrowFunctionExpression(parser, arrowParams))
        break
      }
      case '{': {
        Object.assign(this, new ObjectExpression(parser))
        applyPostfixImpl(this, parser)
        break
      }
      case Keyword.NUMBER:
      case Keyword.STRING:
      case 'TemplateLiteral':
      case 'RegExpLiteral':
      case Keyword.BOOLEAN:
      case Keyword.NAN:
      case Keyword.INFINITY:
      case Keyword.NULL:
      case Keyword.UNDEFINED: {
        Object.assign(this, new Literal(parser))
        break
      }
      case '++':
      case '--': {
        Object.assign(this, new UpdateExpression(parser))
        break
      }
      case Keyword.DELETE:
      case Keyword.VOID:
      case Keyword.TYPEOF:
      case '+':
      case '-':
      case '~':
      case '!': {
        Object.assign(this, new UnaryExpression(parser))
        break
      }
      case Keyword.AWAIT: {
        Object.assign(this, new AwaitExpression(parser))
        break
      }
      case Keyword.YIELD: {
        Object.assign(this, new YieldExpression(parser))
        break
      }
      case Keyword.NEW: {
        Object.assign(this, new NewExpression(parser))
        break
      }
      case Keyword.IMPORT: {
        parser.eat(Keyword.IMPORT)
        if ((parser.lookahead?.type as string) === '(') {
          const importNode = { type: 'Import' }
          Object.assign(this, new CallExpression(parser, importNode as any))
        }
        break
      }
      case Keyword.SUPER: {
        parser.eat(Keyword.SUPER)
        const superNode = { type: 'Super' }
        if ((parser.lookahead?.type as string) === '(') {
          Object.assign(this, new CallExpression(parser, superNode as any))
        }
        else if ((parser.lookahead?.type as string) === '.') {
          Object.assign(this, new MemberExpression(parser, superNode as any))
        }
        else {
          Object.assign(this, superNode)
        }
        break
      }
      case Keyword.THIS: {
        Object.assign(this, new ThisExpression(parser))

        if (
          parser.lookahead?.type === '.'
          || parser.lookahead?.type === '['
          || parser.lookahead?.type === '?.'
        ) {
          const member = new MemberExpression(parser, { ...this } as Expression)
          Object.assign(this, member)
        }

        switch (parser.lookahead?.type as string) {
          case '=':
          case '+=':
          case '-=':
          case '*=':
          case '/=':
          case '%=':
          case '**=':
          case '&=':
          case '|=':
          case '^=':
          case '<<=':
          case '>>=':
          case '>>>=':
          case '&&=':
          case '||=':
          case '??=': {
            Object.assign(this, new AssignmentExpression(parser, { ...this } as Expression))
            break
          }
          case '(': {
            Object.assign(this, new CallExpression(parser, { ...this } as Expression))
            break
          }
          case '++':
          case '--': {
            const op = parser.lookahead?.value as string
            parser.eat(op)
            const snapshot = { ...this } as Expression
            for (const key of Object.keys(this)) delete (this as any)[key]
            Object.assign(this, {
              type: 'UpdateExpression',
              operator: op,
              argument: snapshot,
              prefix: false,
            })
            break
          }
        }
        break
      }
      case Keyword.IDENTIFIER: {
        const identifier = new Identifier(parser)

        if ((parser.lookahead?.type as string) === '=>') {
          Object.assign(this, new ArrowFunctionExpression(parser, [identifier]))
          break
        }

        if ((parser.lookahead?.type as string) === 'TemplateLiteral') {
          Object.assign(this, new TaggedTemplateExpression(parser, identifier))
          break
        }

        if ((parser.lookahead?.type as string) === '++' || (parser.lookahead?.type as string) === '--') {
          const op = parser.lookahead?.value as string
          parser.eat(op)
          Object.assign(this, {
            type: 'UpdateExpression',
            operator: op,
            argument: identifier,
            prefix: false,
          })
          break
        }

        switch (parser.lookahead?.type as string) {
          case '+':
          case '-':
          case '*':
          case '/':
          case '%':
          case '**':
          case '&':
          case '|':
          case '^':
          case '>':
          case '>>':
          case '>>>':
          case '<':
          case '<<':
          case '>=':
          case '<=':
          case '==':
          case '===':
          case '!=':
          case '!==':
          case Keyword.INSTANCEOF:
          case Keyword.IN: {
            Object.assign(this, new BinaryExpression(parser, identifier))
            break
          }
          case '=':
          case '+=':
          case '-=':
          case '*=':
          case '/=':
          case '%=':
          case '**=':
          case '&=':
          case '|=':
          case '^=':
          case '<<=':
          case '>>=':
          case '>>>=':
          case '&&=':
          case '||=':
          case '??=': {
            Object.assign(this, new AssignmentExpression(parser, identifier))
            break
          }
          case '??':
          case '||':
          case '&&': {
            Object.assign(this, new LogicalExpression(parser, identifier))
            break
          }
          case '?': {
            Object.assign(this, new ConditionalExpression(parser, identifier))
            break
          }
          case ':': {
            if (parser.ternaryDepth > 0) {
              Object.assign(this, identifier)
            }
            else {
              Object.assign(this, new LabelledStatement(parser, identifier))
            }
            break
          }
          case '(': {
            Object.assign(this, new CallExpression(parser, identifier))
            applyPostfixImpl(this, parser)
            break
          }
          case '[':
          case '.':
          case '?.': {
            const memberExpression = new MemberExpression(parser, identifier)

            switch (parser.lookahead?.type as string) {
              case '=':
              case '+=':
              case '-=':
              case '*=':
              case '/=':
              case '%=':
              case '**=':
              case '&=':
              case '|=':
              case '^=':
              case '<<=':
              case '>>=':
              case '>>>=':
              case '&&=':
              case '||=':
              case '??=': {
                Object.assign(this, new AssignmentExpression(parser, memberExpression))
                break
              }
              case '(': {
                Object.assign(this, new CallExpression(parser, memberExpression))
                break
              }
              default: {
                Object.assign(this, memberExpression)
                applyPostfixImpl(this, parser)
                break
              }
            }
            break
          }
          default: {
            Object.assign(this, identifier)
            break
          }
        }

        break
      }
    }
  }
}
