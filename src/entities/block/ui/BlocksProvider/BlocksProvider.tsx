import { ConstantNode } from 'mathjs'
import React from 'react'

import { config } from '../../config'
import { validateArgumentType } from '../../lib/validateArgumentType'
import { BlocksContext } from '../../model/blocksContext'
import { Block } from '../../model/type'

type Props = {
  children: React.ReactNode
}

const BlocksProvider: React.FunctionComponent<Props> = ({ children }) => {
  const [blocks, setBlocks] = React.useState<Block[]>([])

  const makeBlockSetter = React.useCallback(
    (blockId: string): React.Dispatch<React.SetStateAction<Block>> =>
      (blockOrFunction) => {
        setBlocks((previousBlocks) => {
          const newBlocks = previousBlocks.map((block) => {
            const newBlock =
              typeof blockOrFunction === 'function'
                ? blockOrFunction(block)
                : blockOrFunction

            return block.id === blockId ? newBlock : block
          })
          return newBlocks
        })
      },
    []
  )

  const evaluateBlockOutput = React.useCallback(
    (block: Pick<Block, 'nodeArguments' | 'type'>): any => {
      if (block.nodeArguments.length === 0) return null

      const { argumentsTypes, nodeFactory } = config[block.type]

      const args = block.nodeArguments.map((argument, index) => {
        const { type, value } = argument

        if (type === 'directValue') {
          validateArgumentType(
            value,
            argumentsTypes,
            `Argument n°${index + 1} type mismatch`
          )
          return new ConstantNode(value)
        }

        const argumentBlock = blocks.find((block) => block.id === value)
        if (!argumentBlock)
          throw new Error(
            `Can not find any block with id: ${value} but set as argument`
          )

        const evaluatedValue = String(evaluateBlockOutput(argumentBlock))

        validateArgumentType(
          evaluatedValue,
          argumentsTypes,
          `Argument n°${index + 1} type mismatch`
        )

        return new ConstantNode(evaluatedValue ?? '')
      })

      return nodeFactory(args).compile().evaluate()
    },
    [blocks]
  )

  const blocksContext = React.useMemo(
    () => ({
      blocks,
      setBlocks,
      makeBlockSetter,
      evaluateBlockOutput,
    }),
    [blocks, evaluateBlockOutput, makeBlockSetter]
  )

  return (
    <BlocksContext.Provider value={blocksContext}>
      {children}
    </BlocksContext.Provider>
  )
}

export default BlocksProvider
