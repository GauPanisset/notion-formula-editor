import { PlusIcon } from '@radix-ui/react-icons'

import { Button } from '@/shared/ui/Button'

type Props = {
  onAdd: () => void
}

const AddBlockButton: React.FunctionComponent<Props> = ({ onAdd }) => {
  return (
    <Button onClick={onAdd}>
      <PlusIcon />
    </Button>
  )
}

export default AddBlockButton
