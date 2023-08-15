import { MathNode } from 'mathjs'

type Block = {
  id: string
  formula?: string
  nodeArguments: (
    | {
        type: 'constant'
        value: boolean | number | string
      }
    | {
        type: 'variable'
        value: Block['id']
      }
  )[]
  output?: boolean | number | string | Error
  type: 'add' | 'concat' | 'equal' | 'if' | 'property'
  variableName?: string
}

type BlockConfig = {
  argumentTypes: ('boolean' | 'number' | 'string')[]
  description: string
  label: string
  /**
   * Used only to render the right argument inputs
   */
  nodeType: 'conditional' | 'function' | 'operator' | 'property'
  evaluateOutput: (
    args: (boolean | number | string)[]
  ) => boolean | number | string | Error | undefined
  factory: () => Block
  toMathNode: (args: (boolean | number | string | MathNode)[]) => MathNode
}

export type { Block, BlockConfig }
