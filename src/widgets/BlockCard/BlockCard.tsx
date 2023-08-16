import React from 'react'

import { Block, useBlocksContext } from '@/entities/block'
import { Draggable, DragHandle } from '@/features/dragBlock'
import { Card } from '@/shared/ui/Card'
import { Collapsible, CollapsibleContent } from '@/shared/ui/Collapsible'

import { Content } from './Content'
import { Footer } from './Footer'
import { Header } from './Header'

type Props = Block

const BlockCard: React.FunctionComponent<Props> = ({
  id,
  formula,
  nodeArguments,
  output,
  type,
  variableName,
}) => {
  const { getBlocks, setBlocks: blocksSetter, setBlock } = useBlocksContext()

  const blocks = getBlocks()

  const blockSetter = React.useCallback(
    (input: React.SetStateAction<Block>) => setBlock(id, input),
    [id, setBlock]
  )

  return (
    <Draggable id={id}>
      <Card className="relative w-full shadow-none">
        <Collapsible defaultOpen={true}>
          <DragHandle id={id}>
            <Header
              id={id}
              type={type}
              variableName={variableName}
              blockSetter={blockSetter}
              blocksSetter={blocksSetter}
            />
          </DragHandle>

          <CollapsibleContent>
            <Content
              blocks={blocks}
              id={id}
              nodeArguments={nodeArguments}
              type={type}
              blockSetter={blockSetter}
            />
          </CollapsibleContent>
        </Collapsible>

        <Footer formula={formula} output={output} />
      </Card>
    </Draggable>
  )
}

export default BlockCard
