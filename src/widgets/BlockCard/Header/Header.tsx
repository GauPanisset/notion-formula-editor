import { ChevronDownIcon, QuestionMarkCircledIcon } from '@radix-ui/react-icons'

import { Block, blockConfig } from '@/entities/block'
import { RemoveBlockButton } from '@/features/removeBlock'
import { VariableNameInput } from '@/features/setVariableName'
import { Button } from '@/shared/ui/Button'
import { CardHeader, CardTitle } from '@/shared/ui/Card'
import { CollapsibleTrigger } from '@/shared/ui/Collapsible'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/ui/Tooltip'

type Props = {
  id: Block['id']
  type: Block['type']
  variableName: Block['variableName']
  blockSetter: (input: React.SetStateAction<Block>) => void
  blocksSetter: (input: React.SetStateAction<Block[]>) => void
}

const Header: React.FunctionComponent<Props> = ({
  id,
  type,
  variableName,
  blockSetter,
  blocksSetter,
}) => {
  const { description, label } = blockConfig[type]

  return (
    <CardHeader className="p-4">
      <CardTitle className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <CollapsibleTrigger asChild className="group">
            <Button variant="outline" size="icon" className="mr-8">
              <ChevronDownIcon className="h-4 w-4 transition-transform group-data-[state=closed]:-rotate-90" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
          <span className="mr-2">{label}</span>
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <QuestionMarkCircledIcon className="mr-8 h-4 w-4 text-muted-foreground" />
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
          <RemoveBlockButton blockId={id} blocksSetter={blocksSetter} />
        </div>
      </CardTitle>
    </CardHeader>
  )
}

export default Header
