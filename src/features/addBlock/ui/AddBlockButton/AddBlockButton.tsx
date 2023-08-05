import { PlusIcon } from '@radix-ui/react-icons'

import { Block, createBlock } from '@/entities/block'
import { Button } from '@/shared/ui/Button'

import { addBlock } from '../../model/addBlock'

type Props = {
  blocksSetter: React.Dispatch<React.SetStateAction<Block[]>>
}

const AddBlockButton: React.FunctionComponent<Props> = ({ blocksSetter }) => {
  const handleClick = () => {
    blocksSetter(addBlock('add'))
  }

  return (
    <Button onClick={handleClick}>
      <PlusIcon />
    </Button>
  )
}

export default AddBlockButton
