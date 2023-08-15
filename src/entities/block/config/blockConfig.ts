import {
  ConditionalNode,
  ConstantNode,
  FunctionNode,
  isNode,
  MathNode,
  OperatorNode,
  parse,
  SymbolNode,
} from 'mathjs'
import { v4 as uuidv4 } from 'uuid'

import { getNaturalType } from '@/shared/lib/getNaturalType'

import { defaultArgument } from '../config/defaultArgument'
import { Block, BlockConfig } from '../model/types'

const blockConfig: Record<Block['type'], BlockConfig> = {
  add: {
    argumentTypes: ['number'],
    description: 'Adds two numbers and returns their sum.',
    label: 'Add',
    nodeType: 'function',
    evaluateOutput(args) {
      return Number(this.toMathNode(args).compile().evaluate())
    },
    factory() {
      return {
        id: uuidv4(),
        nodeArguments: [defaultArgument, defaultArgument],
        type: 'add',
      }
    },
    toMathNode(args) {
      return new FunctionNode(
        new SymbolNode('add'),
        args.map((arg) => {
          if (isNode(arg)) return arg

          let typedArg: number = 0
          if (arg && typeof arg === 'string') {
            typedArg = Number.parseFloat(arg)
          } else if (typeof arg === 'number') {
            typedArg = arg
          } else if (typeof arg === 'boolean') {
            throw new Error(
              `Can't use 'boolean' argument in 'add' Block: ${arg}`
            )
          }
          return new ConstantNode(typedArg)
        })
      )
    },
  },
  concat: {
    argumentTypes: ['number', 'string'],
    description: 'Concatenates its arguments and returns the result.',
    label: 'Concat',
    nodeType: 'function',
    evaluateOutput(args) {
      return String(this.toMathNode(args).compile().evaluate())
    },
    factory() {
      return {
        id: uuidv4(),
        nodeArguments: [defaultArgument, defaultArgument],
        type: 'concat',
      }
    },
    toMathNode(args) {
      return new FunctionNode(
        new SymbolNode('concat'),
        args.map((arg) => {
          if (isNode(arg)) {
            const evaluatedArg = arg.compile().evaluate()
            const { type } = getNaturalType(evaluatedArg)
            return type === 'string'
              ? arg
              : new FunctionNode(new SymbolNode('format'), [arg])
          }
          if (typeof arg === 'string') {
            return new ConstantNode(arg)
          }
          return new ConstantNode(String(arg))
        })
      )
    },
  },
  equal: {
    argumentTypes: ['boolean', 'number', 'string'],
    description:
      'Returns true if its arguments are equal, and false otherwise.',
    label: 'Equal',
    nodeType: 'operator',
    evaluateOutput(args) {
      if (args[1] !== '' && typeof args[0] !== typeof args[1])
        throw new Error(`Type mismatch ${args[1]} is not a ${typeof args[0]}.`)

      return args[0] === args[1]
    },
    factory() {
      return {
        id: uuidv4(),
        nodeArguments: [defaultArgument, defaultArgument],
        type: 'equal',
      }
    },
    toMathNode(args) {
      return new OperatorNode(
        '==',
        'equal',
        args.map((arg) => {
          if (isNode(arg)) {
            return arg
          }
          if (typeof arg === 'boolean') {
            return new SymbolNode(String(arg))
          }
          return new ConstantNode(arg)
        })
      )
    },
  },
  if: {
    argumentTypes: ['boolean', 'number', 'string'],
    description: 'Switches between two options based on another value.',
    label: 'If',
    nodeType: 'conditional',
    evaluateOutput(args) {
      if (args[0] === '') return undefined

      const { value } = getNaturalType(
        this.toMathNode(args).compile().evaluate()
      )

      return value
    },
    factory() {
      return {
        id: uuidv4(),
        nodeArguments: [defaultArgument, defaultArgument, defaultArgument],
        type: 'if',
      }
    },
    toMathNode(args) {
      let condition: MathNode = new ConstantNode('')

      if (isNode(args[0])) condition = args[0]
      else {
        try {
          /**
           * Check if the parsed expression is valid before parsing.
           */
          parse(String(args[0])).compile().evaluate()
          condition = parse(String(args[0]))
        } catch {}
      }

      let trueExpression: MathNode = new ConstantNode('')
      if (isNode(args[1])) trueExpression = args[1]
      else if (typeof args[1] === 'boolean')
        trueExpression = new SymbolNode(String(args[1]))
      else {
        trueExpression = new ConstantNode(args[1])
      }

      let falseExpression: MathNode = new ConstantNode('')
      if (isNode(args[2])) falseExpression = args[2]
      else if (typeof args[2] === 'boolean')
        falseExpression = new SymbolNode(String(args[2]))
      else {
        falseExpression = new ConstantNode(args[2])
      }

      return new ConditionalNode(condition, trueExpression, falseExpression)
    },
  },
  property: {
    argumentTypes: ['boolean', 'number', 'string'],
    description: 'Returns the value of the property for each entry.',
    label: 'Property',
    nodeType: 'property',
    evaluateOutput(args) {
      if (!args[0]) return undefined

      const { value } = getNaturalType(args[1])

      return value
    },
    factory() {
      return {
        id: uuidv4(),
        nodeArguments: [defaultArgument, defaultArgument],
        type: 'property',
      }
    },
    toMathNode(args) {
      if (typeof args[0] !== 'string') {
        throw new Error(
          `The first argument of Property block must be a 'string'`
        )
      }

      return new FunctionNode(new SymbolNode('Prop'), [
        new ConstantNode(args[0]),
      ])
    },
  },
}

export { blockConfig }
