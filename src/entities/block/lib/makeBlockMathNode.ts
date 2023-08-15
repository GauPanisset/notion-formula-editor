import { MathNode } from 'mathjs'

import { isDefined } from '@/shared/lib/isDefined'

import { blockConfig } from '../config/blockConfig'
import { Block } from '../model/types'

const makeBlockMathNode = (
  block: Block,
  blocksForArguments: Block[]
): MathNode | undefined => {
  if (block.nodeArguments.length === 0) return undefined

  const config = blockConfig[block.type]

  /**
   * Retrieve the block argument string values.
   */
  const args = block.nodeArguments.map((argument, index) => {
    const { type, value } = argument

    if (type === 'constant') {
      return value
    }
    const argumentBlock = blocksForArguments.find((block) => block.id === value)
    if (!argumentBlock)
      throw new Error(
        `Can not find any block with id: ${value} but set as argument`
      )

    const evaluatedValue = makeBlockMathNode(argumentBlock, blocksForArguments)

    return evaluatedValue
  })

  if (args.every((arg) => arg === undefined)) return undefined

  return config.toMathNode(args.filter(isDefined))
}

export { makeBlockMathNode }
