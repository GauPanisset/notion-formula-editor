import { PlusIcon } from '@radix-ui/react-icons'
import React from 'react'

import { Block, blockConfig, useBlocksContext } from '@/entities/block'
import { ArgumentInput } from '@/features/chooseArgument'
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
  nodeArguments,
  type,
  variableName,
}) => {
  const { argumentsTypes, description, label } = blockConfig[type]
  const { blocks, setBlocks, makeBlockSetter, evaluateBlockOutput } =
    useBlocksContext()

  const blockSetter = React.useMemo(
    () => makeBlockSetter(id),
    [id, makeBlockSetter]
  )

  const variables = blocks.filter(
    (block) =>
      block.id !== id &&
      block.variableName &&
      argumentsTypes.includes(getNaturalType(evaluateBlockOutput(block))) &&
      !block.nodeArguments.some((nodeArgument) => nodeArgument.value === id)
  )

  const output = React.useMemo(() => {
    try {
      return evaluateBlockOutput({ nodeArguments, type })
    } catch (error) {
      return error
    }
  }, [nodeArguments, type, evaluateBlockOutput])

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
        <div className="flex flex-row items-center justify-center space-x-4 border-t pt-6">
          <ArgumentInput
            argumentTypes={argumentsTypes}
            argumentIndex={0}
            placeholder="First argument"
            blockSetter={blockSetter}
            variables={variables}
          />
          <PlusIcon className="h-4 w-4" />
          <ArgumentInput
            argumentTypes={argumentsTypes}
            argumentIndex={1}
            placeholder="Second argument"
            blockSetter={blockSetter}
            variables={variables}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Alert
          variant={output instanceof Error ? 'destructive' : 'default'}
          className={cn(
            '',
            output instanceof Error ? 'bg-destructive/5' : 'bg-muted'
          )}
        >
          <AlertTitle>Output:</AlertTitle>
          <AlertDescription>
            {output ? (
              output instanceof Error ? (
                output.message
              ) : (
                output
              )
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
