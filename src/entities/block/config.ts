import { ConstantNode, FunctionNode, MathNode, SymbolNode } from 'mathjs'

import { Block } from './model/type'

type BlockConfig = {
  argumentsTypes: ('boolean' | 'number' | 'string')[]
  functionNodeFactory: (args?: MathNode[]) => FunctionNode
  helperText: string
  label: string
  description: string
}

const config: Record<Block['type'], BlockConfig> = {
  add: {
    argumentsTypes: ['number'],
    functionNodeFactory: (
      args = [new ConstantNode(''), new ConstantNode('')]
    ) => new FunctionNode(new SymbolNode('add'), args),
    helperText: '',
    label: 'Add',
    description: 'Adds two numbers and returns their sum.',
  },
  concat: {
    argumentsTypes: ['number', 'string'],
    functionNodeFactory: (
      args = [new ConstantNode(''), new ConstantNode('')]
    ) => new FunctionNode(new SymbolNode('concat'), args),
    helperText: '',
    label: 'Concat',
    description: 'Concatenates its arguments and returns the result.',
  },
}

export { config }
