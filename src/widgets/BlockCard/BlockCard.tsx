import { PlusIcon } from '@radix-ui/react-icons'

import { Block, blockConfig } from '@/entities/block'
import { ArgumentInput } from '@/features/chooseArgument'
import { RemoveBlockButton } from '@/features/removeBlock'
import { Alert, AlertDescription, AlertTitle } from '@/shared/ui/alert'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/Card'

type Props = Block & {
  onRemove: (blockId: string) => void
  onUpdateArgs: (newArgs: Block['args']) => void
}

const BlockCard: React.FunctionComponent<Props> = ({
  id,
  name,
  args,
  onRemove,
  onUpdateArgs,
}) => {
  const config = blockConfig[name]

  const handleRemove = () => {
    onRemove(id)
  }

  const makeArgumentUpdateHandler =
    (argIndex: number) => (newArgument: Block['args'][number]) => {
      onUpdateArgs(
        args.map((argument, index) =>
          argIndex === index ? newArgument : argument
        )
      )
    }

  return (
    <Card className="relative w-full">
      <div className="absolute right-3 top-3">
        <RemoveBlockButton onRemove={handleRemove} />
      </div>
      <CardHeader>
        <CardTitle>{config.label}</CardTitle>
        <CardDescription>{config.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row items-center justify-center space-x-4 border-t pt-6">
          <ArgumentInput
            placeholder="First argument"
            onChange={makeArgumentUpdateHandler(0)}
          />
          <PlusIcon className="h-4 w-4" />
          <ArgumentInput
            placeholder="Second argument"
            onChange={makeArgumentUpdateHandler(1)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Alert className="bg-muted">
          <AlertTitle>Output:</AlertTitle>
          <AlertDescription>
            {args.join('') ? (
              args.join('')
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
