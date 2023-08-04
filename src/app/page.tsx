'use client'

import React from 'react'
import { v4 as uuidv4 } from 'uuid'

import { Block } from '@/entities/block'
import { AddBlockButton } from '@/features/addBlock'
import { BlockCard, ResultFooter } from '@/widgets'

const Home: React.FunctionComponent = () => {
  const [blocks, setBlocks] = React.useState<Block[]>([])

  const handleAddBlock = () => {
    setBlocks((previousBlocks) => [
      ...previousBlocks,
      { id: uuidv4(), name: 'add', args: ['', ''] },
    ])
  }

  const handleRemoveBlock = (blockId: string) => {
    setBlocks((previousBlocks) =>
      previousBlocks.filter((block) => block.id !== blockId)
    )
  }

  const makeArgsUpdateHandler =
    (blockIndex: number) => (newArgs: Block['args']) => {
      setBlocks((previousBlocks) =>
        previousBlocks.map((block, index) =>
          blockIndex === index ? { ...block, args: newArgs } : block
        )
      )
    }

  return (
    <main className="m-auto flex h-full max-w-[640px] flex-col p-4">
      <div className="flex w-full flex-1 flex-col items-center space-y-4 overflow-scroll">
        {blocks.map((block, index) => (
          <BlockCard
            key={block.id}
            {...block}
            onRemove={handleRemoveBlock}
            onUpdateArgs={makeArgsUpdateHandler(index)}
          />
        ))}
        <AddBlockButton onAdd={handleAddBlock} />
      </div>

      <ResultFooter />
    </main>
  )
}

export default Home
