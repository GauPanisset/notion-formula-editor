type Block = {
  id: string
  nodeArguments: { type: 'directValue' | 'variable'; value: string }[]
  type: 'add' | 'concat'
  variableName?: string
}

export type { Block }
