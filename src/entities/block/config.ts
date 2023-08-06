import { FunctionNode, MathNode, SymbolNode } from 'mathjs'

import { Block } from './model/type'

type BlockConfig = {
  argumentsTypes: ('boolean' | 'number' | 'string')[]
  description: string
  label: string
  nodeFactory: (args?: MathNode[]) => FunctionNode
}

const config: Record<Block['type'], BlockConfig> = {
  add: {
    argumentsTypes: ['number'],
    description: 'Adds two numbers and returns their sum.',
    label: 'Add',
    nodeFactory: (args = []) => new FunctionNode(new SymbolNode('add'), args),
  },
  concat: {
    argumentsTypes: ['number', 'string'],
    description: 'Concatenates its arguments and returns the result.',
    label: 'Concat',
    nodeFactory: (args = []) =>
      new FunctionNode(new SymbolNode('concat'), args),
  },
}

export { config }
