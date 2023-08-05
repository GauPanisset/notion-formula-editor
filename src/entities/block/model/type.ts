import { FunctionNode } from 'mathjs'

type Block = {
  id: string
  functionNode: FunctionNode
  type: 'add' | 'concat'
}

export type { Block }
