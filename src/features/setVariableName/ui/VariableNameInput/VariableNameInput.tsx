import React from 'react'

import { Block } from '@/entities/block'
import { cn } from '@/shared/lib/shadcn'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/Popover'

import { updateBlockVariableName } from '../../model/updateBlockVariableName'

type Props = {
  variableName?: string
  blockSetter: React.Dispatch<React.SetStateAction<Block>>
}

const VariableNameInput: React.FunctionComponent<Props> = ({
  variableName,
  blockSetter,
}) => {
  const [open, setOpen] = React.useState(false)

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const target = event.target as typeof event.target & {
      variableName: { value: string }
    }

    blockSetter(updateBlockVariableName(target.variableName.value))
    setOpen(false)
  }

  const handleReset = () => {
    blockSetter(updateBlockVariableName(undefined))
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant={variableName ? 'secondary' : 'ghost'}
          aria-expanded={open}
          className="w-fit min-w-0 rounded-full border shadow-none"
        >
          <span
            className={cn(
              'truncate',
              variableName ? '' : 'text-muted-foreground'
            )}
          >
            {variableName ? variableName : 'Set variable name'}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] space-y-4 p-4">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Variable name</h4>
          <p className="text-sm text-muted-foreground">
            Use the output of this block as argument.
          </p>
        </div>

        <form
          className="flex w-full items-center space-x-2"
          onSubmit={handleSubmit}
        >
          <Input
            defaultValue={variableName}
            name="variableName"
            placeholder="Type a variable name..."
          />

          <Button type="submit">Submit</Button>
        </form>
        <Button
          className="h-fit border-0 p-0 text-muted-foreground hover:bg-transparent hover:text-accent-foreground"
          disabled={!variableName}
          size="sm"
          variant="ghost"
          onClick={handleReset}
        >
          Reset
        </Button>
      </PopoverContent>
    </Popover>
  )
}

export default VariableNameInput
