import { Block } from '@/entities/block'

const updateBlockArgument =
  (argumentIndex: number, newArgument: Block['nodeArguments'][number]) =>
  (previousBlock: Block): Block => {
    const newArguments = previousBlock.nodeArguments.map((argument, index) => {
      return argumentIndex === index ? newArgument : argument
    })

    return {
      ...previousBlock,
      nodeArguments: newArguments,
    }
  }

export { updateBlockArgument }
