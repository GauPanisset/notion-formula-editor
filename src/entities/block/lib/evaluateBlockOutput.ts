import { blockConfig } from '../config/blockConfig'
import { Block } from '../model/types'
import { validateArgumentType } from './validateArgumentType'

const evaluateBlockOutput = (
  block: Block,
  blocksForArguments: Block[]
): string | undefined | Error => {
  if (block.nodeArguments.length === 0) return undefined

  const { argumentTypes, evaluateOutput } = blockConfig[block.type]

  /**
   * Retrieve the block argument string values.
   */
  const args = block.nodeArguments.map((argument, index) => {
    const { type, value } = argument

    if (type === 'directValue') {
      validateArgumentType(
        value,
        argumentTypes,
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

    if (typeof evaluatedValue === 'string') {
      validateArgumentType(
        evaluatedValue,
        argumentTypes,
        `Argument n°${index + 1} type mismatch`
      )

      return evaluatedValue
    }

    return ''
  })

  if (args.every((arg) => arg === '')) return undefined

  return evaluateOutput(args)
}

export { evaluateBlockOutput }
