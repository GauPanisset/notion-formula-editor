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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/Card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/Tabs'

type Props = Block

const BlockCard: React.FunctionComponent<Props> = ({
  id,
  formula,
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
      argumentTypes.includes(getNaturalType(block.output).type) &&
      !block.nodeArguments.some((nodeArgument) => nodeArgument.value === id)
  ) as Variable[]

  const hasError = output instanceof Error

  return (
    <Card className="relative w-full">
      <div className="absolute right-3 top-3">
        <RemoveBlockButton blockId={id} blocksSetter={setBlocks} />
      </div>
      <CardHeader>
        <CardTitle>
          <span className="mr-4">{label}</span>
          <VariableNameInput
            variableName={variableName}
            blockSetter={blockSetter}
          />
        </CardTitle>
        <CardDescription>{description}</CardDescription>
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
        <Tabs
          defaultValue="output"
          className={cn(
            'h-full w-full rounded-lg border',
            hasError
              ? 'border-destructive/50 text-destructive dark:border-destructive bg-destructive/5'
              : 'bg-muted'
          )}
        >
          <TabsList className="grid w-full grid-cols-2 bg-transparent">
            <TabsTrigger disabled={hasError} value="output">
              Output
            </TabsTrigger>
            <TabsTrigger disabled={hasError} value="formula">
              Formula
            </TabsTrigger>
          </TabsList>
          <TabsContent value="output" className="m-1 mt-0 p-2 text-sm">
            {hasError ? (
              output.message
            ) : output !== undefined ? (
              String(output)
            ) : (
              <span className="text-muted-foreground">
                Set the arguments to see the output...
              </span>
            )}
          </TabsContent>
          <TabsContent value="formula" className="m-1 mt-0 p-2 text-sm">
            {hasError ? (
              output.message
            ) : formula !== undefined ? (
              formula
            ) : (
              <span className="text-muted-foreground">
                Set the arguments to see the formula...
              </span>
            )}
          </TabsContent>
        </Tabs>
      </CardFooter>
    </Card>
  )
}

export default BlockCard
