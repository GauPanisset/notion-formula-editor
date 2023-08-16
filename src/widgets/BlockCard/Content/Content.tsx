import { Block, blockConfig } from '@/entities/block'
import {
  ConditionalArgumentInputs,
  InfiniteArgumentInputs,
  OperatorArgumentInputs,
  PropertyArgumentInputs,
  Variable,
} from '@/features/chooseArgument'
import { getNaturalType } from '@/shared/lib/getNaturalType'
import { CardContent } from '@/shared/ui/Card'

type Props = {
  blocks: Block[]
  id: Block['id']
  nodeArguments: Block['nodeArguments']
  type: Block['type']
  blockSetter: (input: React.SetStateAction<Block>) => void
}

const Content: React.FunctionComponent<Props> = ({
  blocks,
  id,
  nodeArguments,
  type,
  blockSetter,
}) => {
  const { argumentTypes, label, nodeType } = blockConfig[type]

  const variables = blocks.filter(
    (block) =>
      block.id !== id &&
      block.variableName &&
      /**
       * These two following lines unsure that the variables have a valid output.
       * Thus the `as Variable[]` is safe.
       */
      block.output &&
      !(block.output instanceof Error) &&
      argumentTypes.includes(getNaturalType(block.output).type) &&
      !block.nodeArguments.some((nodeArgument) => nodeArgument.value === id)
  ) as Variable[]

  return (
    <CardContent className="p-6 pt-0">
      <div className="flex flex-col space-y-4 border-t pt-6">
        {nodeType === 'conditional' ? (
          <ConditionalArgumentInputs
            argumentTypes={argumentTypes}
            blockSetter={blockSetter}
            nodeArguments={nodeArguments}
            variables={variables}
          />
        ) : null}
        {nodeType === 'function' ? (
          <InfiniteArgumentInputs
            argumentTypes={argumentTypes}
            blockSetter={blockSetter}
            nodeArguments={nodeArguments}
            variables={variables}
          />
        ) : null}
        {nodeType === 'operator' ? (
          <OperatorArgumentInputs
            argumentTypes={argumentTypes}
            blockSetter={blockSetter}
            label={label}
            nodeArguments={nodeArguments}
            variables={variables}
          />
        ) : null}
        {nodeType === 'property' ? (
          <PropertyArgumentInputs
            argumentTypes={argumentTypes}
            blockSetter={blockSetter}
            nodeArguments={nodeArguments}
          />
        ) : null}
      </div>
    </CardContent>
  )
}

export default Content
