import { Block, createBlock } from '@/entities/block'

const addBlock = (type: Block['type']) => (previousBlocks: Block[]) => {
  return [...previousBlocks, createBlock(type)]
}

export { addBlock }
