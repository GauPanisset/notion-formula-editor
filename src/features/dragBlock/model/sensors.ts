import { PointerSensor as DnDKitPointerSensor } from '@dnd-kit/core'

const isInteractiveElement = (element: HTMLElement | null) => {
  const interactiveElements = [
    'button',
    'input',
    'textarea',
    'select',
    'option',
  ]

  let currentElement = element

  while (currentElement) {
    if (interactiveElements.includes(currentElement?.tagName?.toLowerCase())) {
      return true
    } else if (currentElement?.dataset?.dnd === 'handle') {
      return false
    }
    currentElement = currentElement.parentElement
  }

  return false
}

/**
 * Create sensor disabling DnD on interactive elements and their descendant nodes.
 * From https://github.com/clauderic/dnd-kit/issues/477#issuecomment-985194908
 */
class PointerSensor extends DnDKitPointerSensor {
  static activators = [
    {
      eventName: 'onPointerDown' as const,
      handler: ({ nativeEvent: event }: React.PointerEvent) => {
        if (
          !event.isPrimary ||
          event.button !== 0 ||
          isInteractiveElement(event.target as HTMLElement)
        ) {
          return false
        }

        return true
      },
    },
  ]
}

export { PointerSensor }
