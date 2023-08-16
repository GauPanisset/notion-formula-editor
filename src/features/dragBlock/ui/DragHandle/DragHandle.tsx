import { useSortable } from '@dnd-kit/sortable'

import { Block } from '@/entities/block'

type Props = {
  children: React.ReactNode
  id: Block['id']
}

const DragHandle: React.FunctionComponent<Props> = ({ children, id }) => {
  const { attributes, listeners } = useSortable({ id })

  return (
    <div
      data-dnd="handle"
      className="cursor-grab"
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  )
}

export default DragHandle
