import { PlusIcon } from '@radix-ui/react-icons'
import React from 'react'

import { Block, blockConfig, useBlocksContext } from '@/entities/block'
import { ArgumentInput } from '@/features/chooseArgument'
import { RemoveBlockButton } from '@/features/removeBlock'
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
  type,
  functionNode,
}) => {
  const config = blockConfig[type]
  const { setBlocks } = useBlocksContext()

  const blockSetter: React.Dispatch<React.SetStateAction<Block>> =
    React.useMemo(
      () => (blockOrFunction) => {
        setBlocks((previousBlocks) => {
          const newBlocks = previousBlocks.map((block) => {
            const newBlock =
              typeof blockOrFunction === 'function'
                ? blockOrFunction(block)
                : blockOrFunction

            return block.id === id ? newBlock : block
          })
          return newBlocks
        })
      },
      [id, setBlocks]
    )

  const output = functionNode?.compile()?.evaluate()

  return (
    <Card className="relative w-full">
      <div className="absolute right-3 top-3">
        <RemoveBlockButton blockId={id} blocksSetter={setBlocks} />
      </div>
      <CardHeader>
        <CardTitle>{config.label}</CardTitle>
        <CardDescription>{config.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row items-center justify-center space-x-4 border-t pt-6">
          <ArgumentInput
            argumentTypes={config.argumentsTypes}
            argumentIndex={0}
            placeholder="First argument"
            blockSetter={blockSetter}
          />
          <PlusIcon className="h-4 w-4" />
          <ArgumentInput
            argumentTypes={config.argumentsTypes}
            argumentIndex={1}
            placeholder="Second argument"
            blockSetter={blockSetter}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Alert className="bg-muted">
          <AlertTitle>Output:</AlertTitle>
          <AlertDescription>
            {output ? (
              output
            ) : (
              <span className="text-muted-foreground">No input yet...</span>
            )}
          </AlertDescription>
        </Alert>
      </CardFooter>
    </Card>
  )
}

export default BlockCard
