import { Block } from '@/entities/block'

const removeBlock = (blockId: string) => (previousBlocks: Block[]) => {
  return previousBlocks.filter((block) => block.id !== blockId)
}

export { removeBlock }
