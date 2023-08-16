import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from '@dnd-kit/modifiers'
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import React from 'react'

import { PointerSensor } from '../../model/sensors'

type Props<Item extends UniqueIdentifier | { id: UniqueIdentifier }> = {
  children: React.ReactNode
  items: Item[]
  itemsSetter: React.Dispatch<React.SetStateAction<Item[]>>
}

const Droppable = <T extends UniqueIdentifier | { id: UniqueIdentifier }>({
  children,
  items,
  itemsSetter,
}: Props<T>) => {
  const [activeId, setActiveId] = React.useState<UniqueIdentifier | null>(null)

  const sensors = useSensors(useSensor(PointerSensor))

  const getIndex = (id: UniqueIdentifier) => {
    return items.findIndex(
      (item) => (typeof item === 'object' ? item.id : item) === id
    )
  }

  const handleDragStart = ({ active }: DragStartEvent) => {
    if (!active) {
      return
    }
    setActiveId(active.id)
  }

  const handleDragEnd = ({ over }: DragEndEvent) => {
    if (over) {
      const overIndex = getIndex(over.id)
      const activeIndex = activeId ? getIndex(activeId) : -1

      if (activeIndex !== overIndex) {
        itemsSetter((previousItems) =>
          arrayMove(previousItems, activeIndex, overIndex)
        )
      }
    }
  }

  return (
    <DndContext
      modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  )
}

export default Droppable
