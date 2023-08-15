import { CaretSortIcon, QuestionMarkCircledIcon } from '@radix-ui/react-icons'
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
import { Button } from '@/shared/ui/Button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/Card'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/shared/ui/Collapsible'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/Tabs'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/ui/Tooltip'

type Props = Block

const BlockCard: React.FunctionComponent<Props> = ({
  id,
  formula,
  nodeArguments,
  output,
  type,
  variableName,
}) => {
  const [isOpen, setIsOpen] = React.useState(true)
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
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="p-4">
          <CardTitle className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center">
              <span className="mr-2">{label}</span>
              <TooltipProvider delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <QuestionMarkCircledIcon className="mr-4 h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <VariableNameInput
                variableName={variableName}
                blockSetter={blockSetter}
              />
            </div>
            <div className="flex flex-row items-center space-x-4">
              <CollapsibleTrigger asChild>
                <Button variant="outline" size="icon">
                  <CaretSortIcon className="h-4 w-4" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
              <RemoveBlockButton blockId={id} blocksSetter={setBlocks} />
            </div>
          </CardTitle>
        </CardHeader>

        <CollapsibleContent>
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
        </CollapsibleContent>
      </Collapsible>

      <CardFooter className="p-4 pt-0">
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
