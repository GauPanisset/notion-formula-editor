import { Block } from '@/entities/block'
import { cn } from '@/shared/lib/shadcn'
import { CardFooter } from '@/shared/ui/Card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/Tabs'

type Props = {
  formula: Block['formula']
  output: Block['output']
}

const Footer: React.FunctionComponent<Props> = ({ formula, output }) => {
  const hasError = output instanceof Error

  return (
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
  )
}

export default Footer
