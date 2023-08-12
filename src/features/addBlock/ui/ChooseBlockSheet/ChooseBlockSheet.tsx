import { PlusIcon } from '@radix-ui/react-icons'
import React from 'react'

import { Block, blockConfig } from '@/entities/block'
import { Button } from '@/shared/ui/Button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/shared/ui/Card'
import { Separator } from '@/shared/ui/Separator'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/Sheet'

import { addBlock } from '../../model/addBlock'

type Props = {
  blocksSetter: React.Dispatch<React.SetStateAction<Block[]>>
}

const ChooseBlockSheet: React.FunctionComponent<Props> = ({ blocksSetter }) => {
  const handleChooseBlock = (clickedType: Block['type']) => {
    blocksSetter(addBlock(clickedType))
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <PlusIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Add a new block</SheetTitle>
          <SheetDescription>
            Choose the type of block you want to add.
          </SheetDescription>
        </SheetHeader>
        <Separator className="my-6" />
        <div className="grid grid-cols-3	gap-6">
          {Object.keys(blockConfig).map((_blockType) => {
            const blockType = _blockType as Block['type']
            const { description, label } = blockConfig[blockType]

            return (
              <SheetClose asChild key={blockType}>
                <Button
                  className="h-fit cursor-pointer auto-cols-auto p-0"
                  variant="outline"
                  onClick={() => handleChooseBlock(blockType)}
                >
                  <Card className="border-none bg-transparent text-left shadow-none">
                    <CardHeader>
                      <CardTitle>{label}</CardTitle>
                      <CardDescription>{description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Button>
              </SheetClose>
            )
          })}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default ChooseBlockSheet
