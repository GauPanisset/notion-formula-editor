import { Block } from '@/entities/block'

const updateBlockArgument =
  (argumentIndex: number, newArgument: Block['functionNode']['args'][number]) =>
  (previousBlock: Block) => {
    const newBlock = { ...previousBlock }
    newBlock.functionNode.args = newBlock.functionNode.args.map(
      (argument, index) => {
        return argumentIndex === index ? newArgument : argument
      }
    )
    return newBlock
  }

export { updateBlockArgument }
