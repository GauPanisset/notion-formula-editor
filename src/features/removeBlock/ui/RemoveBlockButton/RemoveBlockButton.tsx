import { Cross2Icon } from '@radix-ui/react-icons'

import { Button } from '@/shared/ui/Button'

type Props = {
  onRemove: () => void
}

const RemoveBlockButton: React.FunctionComponent<Props> = ({ onRemove }) => {
  return (
    <Button onClick={onRemove} variant="outline" size="icon">
      <Cross2Icon className="h-4 w-4" />
    </Button>
  )
}

export default RemoveBlockButton
