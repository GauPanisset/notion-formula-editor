import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { ConstantNode } from 'mathjs'
import React from 'react'

import { Block } from '@/entities/block'
import { cn } from '@/shared/lib/shadcn'
import { Button } from '@/shared/ui/Button'
import { Checkbox } from '@/shared/ui/Checkbox'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/shared/ui/Command'
import { Input } from '@/shared/ui/Input'
import { Label } from '@/shared/ui/Label'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/Popover'
import { Separator } from '@/shared/ui/Separator'

import { getArgumentNaturalType } from '../../model/getArgumentNaturalType'
import { ArgumentType } from '../../model/type'
import { updateBlockArgument } from '../../model/updateBlockArgument'
import { ArgumentTypeIcon } from '../ArgumentTypeIcon'

type Props = {
  argumentIndex: number
  argumentTypes: ArgumentType[]
  placeholder: string
  variables?: { value: string; label: string }[]
  blockSetter: React.Dispatch<React.SetStateAction<Block>>
}

const ArgumentInput: React.FunctionComponent<Props> = ({
  argumentIndex,
  argumentTypes,
  placeholder,
  variables = [],
  blockSetter,
}) => {
  const formRef = React.useRef<HTMLFormElement>(null)

  const [open, setOpen] = React.useState(false)
  const [selectedVariable, setSelectedVariable] = React.useState('')
  const [directValue, setDirectValue] = React.useState('')

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const target = event.target as typeof event.target & {
      directValue?: { value: string }
      directValueChecked?: { checked: boolean }
    }

    const newDirectValue =
      target.directValueChecked?.checked !== undefined
        ? String(target.directValueChecked.checked)
        : target.directValue?.value ?? ''

    setDirectValue(newDirectValue)
    setSelectedVariable('')

    blockSetter(
      updateBlockArgument(argumentIndex, new ConstantNode(newDirectValue))
    )

    setOpen(false)
  }

  const handleSelectVariable = (clickedVariable: string) => {
    setDirectValue('')
    const newSelectedVariable =
      clickedVariable === selectedVariable ? '' : clickedVariable
    setSelectedVariable(newSelectedVariable)

    blockSetter(
      updateBlockArgument(
        argumentIndex,
        new ConstantNode(
          variables.find((variable) => variable.value === selectedVariable)
            ?.label ?? ''
        )
      )
    )

    setOpen(false)
  }

  const handleReset = () => {
    setDirectValue('')
    setSelectedVariable('')

    blockSetter(updateBlockArgument(argumentIndex, new ConstantNode('')))

    formRef?.current?.reset()
    /**
     * For some reason, the form reset event do not reset the checkbox state.
     * This is a workaround for that.
     */
    if (directValue === 'true') {
      formRef?.current?.getElementsByTagName('button').item(0)?.click()
    }
  }

  const currentArgument = selectedVariable
    ? variables.find((variable) => variable.value === selectedVariable)?.label
    : directValue

  const currentArgumentType =
    argumentTypes.length === 1
      ? argumentTypes[0]
      : currentArgument
      ? getArgumentNaturalType(currentArgument)
      : null

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] min-w-0 justify-between p-2"
        >
          <div className="flex flex-row items-center space-x-2">
            {currentArgumentType && (
              <ArgumentTypeIcon
                type={currentArgumentType}
                className=" text-muted-foreground"
              />
            )}
            <span className="truncate">{currentArgument || placeholder}</span>
          </div>

          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] space-y-4 p-4">
        <form
          className="flex w-full items-center space-x-2"
          ref={formRef}
          onSubmit={handleSubmit}
        >
          {argumentTypes.includes('string') ? (
            <Input
              defaultValue={directValue}
              name="directValue"
              placeholder="Type a value..."
            />
          ) : argumentTypes.includes('number') ? (
            <Input
              defaultValue={directValue}
              type="number"
              name="directValue"
              placeholder="Type a number..."
            />
          ) : (
            <div className="flex flex-1 items-center space-x-2">
              <Checkbox
                id="boolean"
                name="directValueChecked"
                defaultChecked={directValue === 'true'}
              />
              <Label htmlFor="boolean" className="flex-1">
                Check if <code>true</code>
              </Label>
            </div>
          )}
          <Button type="submit">Submit</Button>
        </form>

        {variables.length > 0 ? (
          <>
            <div className="mt-2 flex w-full flex-row items-center space-x-2 text-muted-foreground">
              <Separator className="flex-1" />
              <span className="text-xs">OR</span>
              <Separator className="flex-1" />
            </div>
            <Command className="overflow-visible pt-2">
              <CommandInput placeholder="Find a variable..." />
              <CommandEmpty>No variable found.</CommandEmpty>
              <CommandGroup heading="Variables">
                {variables.map((variable) => (
                  <CommandItem
                    value={variable.value}
                    key={variable.value}
                    onSelect={handleSelectVariable}
                  >
                    {variable.label}
                    <CheckIcon
                      className={cn(
                        'ml-auto h-4 w-4',
                        selectedVariable === variable.value
                          ? 'opacity-100'
                          : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </>
        ) : null}

        <Button
          className="h-fit border-0 p-0 text-muted-foreground hover:bg-transparent hover:text-accent-foreground"
          disabled={!directValue && !selectedVariable}
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

export default ArgumentInput
