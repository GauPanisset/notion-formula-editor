import { Block, defaultArgument } from '@/entities/block'

const removeBlock = (blockId: string) => (previousBlocks: Block[]) => {
  return previousBlocks.reduce((newBlocks, block) => {
    if (block.id !== blockId) {
      return [
        ...newBlocks,
        {
          ...block,
          nodeArguments: block.nodeArguments.reduce(
            (newArguments, argument) => {
              if (
                !(argument.type === 'variable' && argument.value === blockId)
              ) {
                return [...newArguments, argument]
              }
              return [...newArguments, defaultArgument]
            },
            [] as Block['nodeArguments']
          ),
        },
      ]
    }
    return newBlocks
  }, [] as Block[])
}

export { removeBlock }
