import { Block, blockConfig } from '@/entities/block'
import { Extends } from '@/shared/lib/types'

type Variable = Omit<Block, 'output'> & {
  output: Extends<Block['output'], string>
}

type ArgumentType =
  (typeof blockConfig)[keyof typeof blockConfig]['argumentTypes'][number]

type ArgumentInputProps = {
  argument?: Block['nodeArguments'][number]
  argumentIndex: number
  argumentTypes: ArgumentType[]
  placeholder: string
  variables?: Variable[]
  blockSetter: React.Dispatch<React.SetStateAction<Block>>
}

export type { ArgumentInputProps, ArgumentType, Variable }
