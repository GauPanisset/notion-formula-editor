import React from 'react'

import { Block, blockConfig, useBlocksContext } from '@/entities/block'
import {
  ConditionalArgumentInputs,
  InfiniteArgumentInputs,
  OperatorArgumentInputs,
  Variable,
} from '@/features/chooseArgument'
import { PropertyArgumentInputs } from '@/features/chooseArgument/ui/PropertyArgumentInputs'
import { RemoveBlockButton } from '@/features/removeBlock'
import { VariableNameInput } from '@/features/setVariableName'
import { getNaturalType } from '@/shared/lib/getNaturalType'
import { cn } from '@/shared/lib/shadcn'
import { Alert, AlertDescription, AlertTitle } from '@/shared/ui/Alert'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/Card'

type Props = Block

const BlockCard: React.FunctionComponent<Props> = ({
  id,
  output,
  type,
  variableName,
}) => {
  const { argumentTypes, description, label, nodeType } = blockConfig[type]
  const { getBlocks, setBlocks, setBlock } = useBlocksContext()

  const blocks = getBlocks()

  const blockSetter = React.useCallback(
    (input: React.SetStateAction<Block>) => setBlock(id, input),
    [id, setBlock]
  )

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
      argumentTypes.includes(getNaturalType(block.output)) &&
      !block.nodeArguments.some((nodeArgument) => nodeArgument.value === id)
  ) as Variable[]

  const hasError = output instanceof Error

  return (
    <Card className="relative w-full">
      <div className="absolute right-3 top-3">
        <RemoveBlockButton blockId={id} blocksSetter={setBlocks} />
      </div>
      <CardHeader>
        <CardTitle>{label}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <VariableNameInput
          variableName={variableName}
          blockSetter={blockSetter}
        />
      </CardHeader>
      <CardContent>
        {nodeType === 'conditional' ? (
          <ConditionalArgumentInputs
            argumentTypes={argumentTypes}
            blockSetter={blockSetter}
            variables={variables}
          />
        ) : null}
        {nodeType === 'function' ? (
          <InfiniteArgumentInputs
            argumentTypes={argumentTypes}
            blockSetter={blockSetter}
            variables={variables}
          />
        ) : null}
        {nodeType === 'operator' ? (
          <OperatorArgumentInputs
            argumentTypes={argumentTypes}
            blockSetter={blockSetter}
            label={label}
            variables={variables}
          />
        ) : null}
        {nodeType === 'property' ? (
          <PropertyArgumentInputs
            argumentTypes={argumentTypes}
            blockSetter={blockSetter}
          />
        ) : null}
      </CardContent>
      <CardFooter>
        <Alert
          variant={hasError ? 'destructive' : 'default'}
          className={cn('', hasError ? 'bg-destructive/5' : 'bg-muted')}
        >
          <AlertTitle>Output:</AlertTitle>
          <AlertDescription>
            {hasError ? (
              output.message
            ) : output !== undefined ? (
              output
            ) : (
              <span className="text-muted-foreground">
                Set the argument to see an output...
              </span>
            )}
          </AlertDescription>
        </Alert>
      </CardFooter>
    </Card>
  )
}

export default BlockCard
