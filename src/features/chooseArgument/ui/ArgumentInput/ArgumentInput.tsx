import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import React from 'react'

import { Block, defaultArgument } from '@/entities/block'
import { getNaturalType } from '@/shared/lib/getNaturalType'
import { cn } from '@/shared/lib/shadcn'
import { Button } from '@/shared/ui/Button'
import { Checkbox } from '@/shared/ui/Checkbox'
import { Input } from '@/shared/ui/Input'
import { Label } from '@/shared/ui/Label'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/Popover'
import { Separator } from '@/shared/ui/Separator'

import { getArgumentType } from '../../lib/getArgumentType'
import { ArgumentInputProps } from '../../model/types'
import { updateBlockArgument } from '../../model/updateBlockArgument'
import { ArgumentTypeIcon } from '../ArgumentTypeIcon'

const ArgumentInput: React.FunctionComponent<ArgumentInputProps> = ({
  argument,
  argumentIndex,
  argumentTypes,
  placeholder,
  variables = [],
  blockSetter,
}) => {
  const formRef = React.useRef<HTMLFormElement>(null)

  const [open, setOpen] = React.useState(false)
  const [selectedVariableId, setSelectedVariableId] = React.useState<
    Block['id']
  >(argument?.type === 'variable' ? argument.value : '')
  const [directValue, setDirectValue] = React.useState<
    boolean | number | string
  >(argument?.type === 'constant' ? argument.value : '')

  const inputType = argumentTypes.includes('string')
    ? 'string'
    : argumentTypes.includes('number')
    ? 'number'
    : 'boolean'

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const target = event.target as typeof event.target & {
      directValue?: { value: string }
      directValueChecked?: { checked: boolean }
    }

    const newDirectValue = getNaturalType(
      target.directValueChecked?.checked !== undefined
        ? target.directValueChecked.checked
        : target.directValue?.value ?? ''
    ).value

    setDirectValue(newDirectValue)
    setSelectedVariableId('')

    blockSetter(
      updateBlockArgument(argumentIndex, {
        type: 'constant',
        value: newDirectValue,
      })
    )

    setOpen(false)
  }

  const handleSelectVariable = (clickedVariableId: string) => {
    setDirectValue('')
    setSelectedVariableId(clickedVariableId)

    blockSetter(
      updateBlockArgument(argumentIndex, {
        type: 'variable',
        value: clickedVariableId,
      })
    )

    setOpen(false)
  }

  const handleReset = () => {
    setDirectValue('')
    setSelectedVariableId('')

    blockSetter(updateBlockArgument(argumentIndex, defaultArgument))

    formRef?.current?.reset()
    /**
     * For some reason, the form reset event do not reset the checkbox state.
     * This is a workaround for that.
     */
    if (directValue === 'true') {
      formRef?.current?.getElementsByTagName('button').item(0)?.click()
    }
  }

  const selectedVariable = variables.find(
    (variable) => variable.id === selectedVariableId
  )

  const currentArgument = selectedVariable
    ? selectedVariable.output
    : directValue

  const currentArgumentType =
    argumentTypes.length === 1
      ? argumentTypes[0]
      : currentArgument !== ''
      ? getArgumentType(currentArgument, Boolean(selectedVariable))
      : null

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          aria-expanded={open}
          className="w-[200px] min-w-0 p-2"
        >
          <div className="flex w-full flex-row items-center space-x-2">
            {currentArgumentType && (
              <ArgumentTypeIcon
                type={currentArgumentType}
                className="text-muted-foreground"
              />
            )}
            <div className="flex min-w-0 flex-1 justify-start truncate">
              {selectedVariable ? (
                <>
                  <span className="truncate">{`${selectedVariable.variableName}`}</span>
                  &nbsp;
                  <span className="whitespace-nowrap text-muted-foreground">{`= ${selectedVariable.output}`}</span>
                </>
              ) : (
                <span className="truncate">
                  {currentArgument !== ''
                    ? String(currentArgument)
                    : placeholder}
                </span>
              )}
            </div>
            <CaretSortIcon className="ml-2 h-4 w-4 text-muted-foreground" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex max-h-[50vh] w-[300px] flex-col space-y-4 p-4">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">{placeholder}</h4>
          <p className="text-sm text-muted-foreground">Set the argument.</p>
        </div>
        <form
          className="flex w-full items-center space-x-2"
          ref={formRef}
          onSubmit={handleSubmit}
        >
          {inputType === 'string' ? (
            <Input
              defaultValue={String(directValue)}
              name="directValue"
              placeholder="Type a value..."
            />
          ) : inputType === 'number' ? (
            <Input
              defaultValue={String(directValue)}
              type="number"
              step="any"
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
              <span className="text-xs">or choose a variable</span>
              <Separator className="flex-1" />
            </div>
            <div className="overflow-scroll">
              {variables.map((variable) => (
                <Button
                  className="w-full"
                  variant={
                    selectedVariableId === variable.id ? 'secondary' : 'ghost'
                  }
                  key={variable.id}
                  onClick={() => handleSelectVariable(variable.id)}
                >
                  <div className="flex w-full flex-row items-center space-x-2">
                    <ArgumentTypeIcon
                      type={getNaturalType(variable.output).type}
                      className="text-muted-foreground"
                    />
                    <div className="flex min-w-0 flex-1 justify-start truncate">
                      <span className="truncate">{`${variable.variableName}`}</span>
                      &nbsp;
                      <span className="whitespace-nowrap text-muted-foreground">{`= ${variable.output}`}</span>
                    </div>
                    <CheckIcon
                      className={cn(
                        'ml-auto h-4 w-4',
                        selectedVariableId === variable.id
                          ? 'opacity-100'
                          : 'opacity-0'
                      )}
                    />
                  </div>
                </Button>
              ))}
            </div>
          </>
        ) : null}

        <Button
          className="h-fit self-start border-0 p-0 text-muted-foreground hover:bg-transparent hover:text-accent-foreground"
          disabled={!directValue && !selectedVariableId}
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
