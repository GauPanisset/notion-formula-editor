import {
  ConditionalNode,
  ConstantNode,
  FunctionNode,
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
    evaluateOutput: (args) => {
      return String(
        new FunctionNode(
          new SymbolNode('add'),
          args.map((arg) => new ConstantNode(arg))
        )
          .compile()
          .evaluate()
      )
    },
    factory: () => ({
      id: uuidv4(),
      nodeArguments: [defaultArgument, defaultArgument],
      type: 'add',
    }),
    label: 'Add',
    nodeType: 'function',
  },
  concat: {
    argumentTypes: ['number', 'string'],
    description: 'Concatenates its arguments and returns the result.',
    evaluateOutput: (args) => {
      return String(
        new FunctionNode(
          new SymbolNode('concat'),
          args.map((arg) => new ConstantNode(arg))
        )
          .compile()
          .evaluate()
      )
    },
    factory: () => ({
      id: uuidv4(),
      nodeArguments: [defaultArgument, defaultArgument],
      type: 'concat',
    }),
    label: 'Concat',
    nodeType: 'function',
  },
  equal: {
    argumentTypes: ['boolean', 'number', 'string'],
    description:
      'Returns true if its arguments are equal, and false otherwise.',
    evaluateOutput: (args) => {
      if (getNaturalType(args[0]) === 'string')
        return String(args[0] === args[1])
      return String(
        new OperatorNode(
          '==',
          'equal',
          args.map((arg) => new ConstantNode(arg))
        )
          .compile()
          .evaluate()
      )
    },
    factory: () => ({
      id: uuidv4(),
      nodeArguments: [defaultArgument, defaultArgument],
      type: 'concat',
    }),
    label: 'Equal',
    nodeType: 'operator',
  },
  if: {
    argumentTypes: ['boolean', 'number', 'string'],
    description: 'Switches between two options based on another value.',
    evaluateOutput: (args) => {
      if (!args[0]) return undefined

      let condition: MathNode = new ConstantNode(args[0])
      try {
        /**
         * Check if the parsed expression is valid before parsing.
         */
        parse(args[0]).compile().evaluate()
        condition = parse(args[0])
      } catch {}

      return new ConditionalNode(
        condition,
        new ConstantNode(args[1]),
        new ConstantNode(args[2])
      )
        .compile()
        .evaluate()
    },
    factory: () => ({
      id: uuidv4(),
      nodeArguments: [defaultArgument, defaultArgument, defaultArgument],
      type: 'concat',
    }),
    label: 'If',
    nodeType: 'conditional',
  },
}

export { blockConfig }
