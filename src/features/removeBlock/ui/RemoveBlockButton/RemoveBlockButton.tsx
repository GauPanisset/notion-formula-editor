import { Cross2Icon } from '@radix-ui/react-icons'
import { SetStateAction } from 'react'

import { Block } from '@/entities/block'
import { Button } from '@/shared/ui/Button'

import { removeBlock } from '../../model/removeBlock'

type Props = {
  blockId: Block['id']
  blocksSetter: (blocks: SetStateAction<Block[]>) => void
}

const RemoveBlockButton: React.FunctionComponent<Props> = ({
  blockId,
  blocksSetter,
}) => {
  const handleClick = () => {
    blocksSetter(removeBlock(blockId))
  }

  return (
    <Button onClick={handleClick} variant="outline" size="icon">
      <Cross2Icon className="h-4 w-4" />
    </Button>
  )
}

export default RemoveBlockButton
