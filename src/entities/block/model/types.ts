type Block = {
  id: string
  nodeArguments: { type: 'directValue' | 'variable'; value: string }[]
  output?: string | Error
  type: 'add' | 'concat' | 'equal' | 'if' | 'property'
  variableName?: string
}

type BlockConfig = {
  argumentTypes: ('boolean' | 'number' | 'string')[]
  description: string
  evaluateOutput: (args: string[]) => string | Error | undefined
  factory: () => Block
  label: string
  /**
   * Used only to render the right argument inputs
   */
  nodeType: 'conditional' | 'function' | 'operator' | 'property'
}

export type { Block, BlockConfig }
