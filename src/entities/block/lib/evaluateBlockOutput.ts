import { blockConfig } from '../config/blockConfig'
import { Block } from '../model/types'
import { validateArgumentType } from './validateArgumentType'

const evaluateBlockOutput = (
  block: Block,
  blocksForArguments: Block[]
): boolean | number | string | undefined | Error => {
  if (block.nodeArguments.length === 0) return undefined

  const config = blockConfig[block.type]

  /**
   * Retrieve the block argument string values.
   */
  const args = block.nodeArguments.map((argument, index) => {
    const { type, value } = argument

    if (type === 'constant') {
      validateArgumentType(
        value,
        config.argumentTypes,
        `Argument n°${index + 1} type mismatch`
      )

      return value
    }
    const argumentBlock = blocksForArguments.find((block) => block.id === value)
    if (!argumentBlock)
      throw new Error(
        `Can not find any block with id: ${value} but set as argument`
      )

    const evaluatedValue = evaluateBlockOutput(
      argumentBlock,
      blocksForArguments
    )

    if (!(evaluatedValue instanceof Error) && evaluatedValue !== undefined) {
      validateArgumentType(
        evaluatedValue,
        config.argumentTypes,
        `Argument n°${index + 1} type mismatch`
      )

      return evaluatedValue
    }

    return ''
  })

  if (args.every((arg) => arg === '')) return undefined

  return config.evaluateOutput(args)
}

export { evaluateBlockOutput }
