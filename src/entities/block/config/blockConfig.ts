import { SymbolNode } from 'mathjs'

import { Block, BlockConfig } from '../model/types'

const blockConfig: Record<Block['type'], BlockConfig> = {
  add: {
    argumentTypes: ['number'],
    description: 'Adds two numbers and returns their sum.',
    label: 'Add',
    nodeType: 'function',
    nodeSymbol: new SymbolNode('add'),
  },
  concat: {
    argumentTypes: ['number', 'string'],
    description: 'Concatenates its arguments and returns the result.',
    label: 'Concat',
    nodeType: 'function',
    nodeSymbol: new SymbolNode('concat'),
  },
  if: {
    argumentTypes: ['boolean', 'number', 'string'],
    description: 'Switches between two options based on another value.',
    label: 'If',
    nodeType: 'conditional',
  },
}

export { blockConfig }
