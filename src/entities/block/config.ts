import { ConstantNode, FunctionNode, SymbolNode } from 'mathjs'

import { Block } from './model/type'

type BlockConfig = {
  functionNodeFactory: () => FunctionNode
  helperText: string
  label: string
  description: string
}

const config: Record<Block['type'], BlockConfig> = {
  add: {
    functionNodeFactory: () =>
      new FunctionNode(new SymbolNode('add'), [
        new ConstantNode(''),
        new ConstantNode(''),
      ]),
    helperText: '',
    label: 'Add',
    description: 'Adds two numbers and returns their sum.',
  },
  concat: {
    functionNodeFactory: () =>
      new FunctionNode(new SymbolNode('concat'), [
        new ConstantNode(''),
        new ConstantNode(''),
      ]),
    helperText: '',
    label: 'Concat',
    description: 'Concatenates its arguments and returns the result.',
  },
}

export { config }
