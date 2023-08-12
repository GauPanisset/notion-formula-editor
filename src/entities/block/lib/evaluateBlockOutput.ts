import {
  ConditionalNode,
  ConstantNode,
  FunctionNode,
  MathNode,
  parse,
} from 'mathjs'

import { blockConfig } from '../config/blockConfig'
import { Block } from '../model/types'
import { validateArgumentType } from './validateArgumentType'

const evaluateBlockOutput = (
  block: Block,
  blocksForArguments: Block[]
): string | undefined | Error => {
  if (block.nodeArguments.length === 0) return undefined

  const { argumentTypes, nodeType, nodeSymbol } = blockConfig[block.type]

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

  /**
   * Create the MathNode to evaluate the output.
   */
  if (nodeType === 'conditional') {
    if (!args[0]) return undefined

    let condition: MathNode = new ConstantNode(args[0])
    try {
      /**
       * Check if the parsed expression is valid.
       */
      parse(args[0]).compile().evaluate()
      condition = parse(args[0])
    } catch {}

    return new ConditionalNode(
      condition,
      new ConstantNode(args[1]),
      new ConstantNode(args[2])
    )
      .compile()
      .evaluate()
  }
  if (nodeType === 'function') {
    return new FunctionNode(
      nodeSymbol,
      args.map((arg) => new ConstantNode(arg))
    )
      .compile()
      .evaluate()
  }

  return undefined
}

export { evaluateBlockOutput }
