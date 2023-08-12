import { Block, blockConfig } from '@/entities/block'

const addBlock = (type: Block['type']) => (previousBlocks: Block[]) => {
  return [...previousBlocks, blockConfig[type].factory()]
}

export { addBlock }
