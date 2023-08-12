import React from 'react'

import { evaluateBlockOutput } from '../../lib/evaluateBlockOutput'
import { BlocksContext } from '../../model/blocksContext'
import { Block } from '../../model/types'

type Props = {
  children: React.ReactNode
}

const BlocksProvider: React.FunctionComponent<Props> = ({ children }) => {
  const [blocks, reactSetBlocks] = React.useState<Block[]>([])

  const getBlock = React.useCallback(
    (blockId: string) => blocks.find((block) => block.id === blockId),
    [blocks]
  )

  const getBlocks = React.useCallback(() => blocks, [blocks])

  const setBlocks: React.Dispatch<React.SetStateAction<Block[]>> =
    React.useCallback((input) => {
      reactSetBlocks((previousBlocks) => {
        const newBlocks =
          typeof input === 'function' ? input(previousBlocks) : input

        /**
         * Update `output` field of each blocks.
         */
        return newBlocks.map((block) => {
          let output: Block['output'] = undefined
          try {
            output = evaluateBlockOutput(block, newBlocks)
          } catch (error) {
            if (error instanceof Error) output = error
          }

          return {
            ...block,
            output,
          }
        })
      })
    }, [])

  const setBlock = React.useCallback(
    (blockId: string, input: React.SetStateAction<Block>) => {
      setBlocks((previousBlocks) => {
        const newBlocks = previousBlocks.map((block) => {
          const newBlock = typeof input === 'function' ? input(block) : input

          return block.id === blockId ? newBlock : block
        })
        return newBlocks
      })
    },
    [setBlocks]
  )

  const blocksContext = React.useMemo(
    () => ({
      getBlock,
      getBlocks,
      setBlock,
      setBlocks,
    }),
    [getBlock, getBlocks, setBlock, setBlocks]
  )

  return (
    <BlocksContext.Provider value={blocksContext}>
      {children}
    </BlocksContext.Provider>
  )
}

export default BlocksProvider
