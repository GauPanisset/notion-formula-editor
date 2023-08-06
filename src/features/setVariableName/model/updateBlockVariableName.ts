import { Block } from '@/entities/block'

const updateBlockVariableName =
  (newVariableName?: string) => (previousBlock: Block) => {
    return { ...previousBlock, variableName: newVariableName }
  }

export { updateBlockVariableName }
