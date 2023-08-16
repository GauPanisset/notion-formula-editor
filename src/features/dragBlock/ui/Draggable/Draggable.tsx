import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { Block } from '@/entities/block'
import { cn } from '@/shared/lib/shadcn'

type Props = {
  children: React.ReactNode
  id: Block['id']
}

const Draggable: React.FunctionComponent<Props> = ({ children, id }) => {
  const { setNodeRef, transform, isDragging } = useSortable({
    id,
  })

  const style = {
    transform: CSS.Transform.toString(
      transform
        ? {
            ...transform,
            ...(isDragging
              ? { scaleX: 1.02, scaleY: 1.02 }
              : { scaleX: 1, scaleY: 1 }),
          }
        : null
    ),
  }

  return (
    <li
      className={cn(
        'w-full list-none transition-[box-shadow] rounded-xl',
        isDragging ? 'shadow-xl z-10' : 'shadow z-0'
      )}
      ref={setNodeRef}
      style={style}
    >
      {children}
    </li>
  )
}

export default Draggable
