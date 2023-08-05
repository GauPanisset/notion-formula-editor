import { Block, blockConfig } from '@/entities/block'

const updateBlockArgument =
  (argumentIndex: number, newArgument: Block['functionNode']['args'][number]) =>
  (previousBlock: Block) => {
    const newArguments = previousBlock.functionNode.args.map(
      (argument, index) => {
        return argumentIndex === index ? newArgument : argument
      }
    )

    const newBlock = {
      ...previousBlock,
      functionNode:
        blockConfig[previousBlock.type].functionNodeFactory(newArguments),
    }
    return newBlock
  }

export { updateBlockArgument }
