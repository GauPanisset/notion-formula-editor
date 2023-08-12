import { SymbolNode } from 'mathjs'

type Block = {
  id: string
  nodeArguments: { type: 'directValue' | 'variable'; value: string }[]
  output?: string | Error
  type: 'add' | 'concat' | 'if'
  variableName?: string
}

type BlockConfig = {
  argumentTypes: ('boolean' | 'number' | 'string')[]
  description: string
  label: string
  nodeType: 'conditional' | 'function'
  /**
   * TODO Try to abstract this field since only 'function' nodes use it.
   */
  nodeSymbol?: SymbolNode
}

export type { Block, BlockConfig }
