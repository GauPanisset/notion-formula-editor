'use client'

import React from 'react'

import { BlocksProvider, useBlocksContext } from '@/entities/block'
import { ChooseBlockSheet } from '@/features/addBlock'
import { Droppable } from '@/features/dragBlock'
import { BlockCard } from '@/widgets'

const Home: React.FunctionComponent = () => {
  const { getBlocks, setBlocks } = useBlocksContext()

  const blocks = getBlocks()

  return (
    <main className="m-auto flex h-full max-w-[640px] flex-col">
      <div className="flex w-full flex-1 flex-col items-center space-y-4 overflow-scroll px-8 py-4">
        <Droppable items={blocks} itemsSetter={setBlocks}>
          {blocks.map((block) => (
            <BlockCard key={block.id} {...block} />
          ))}
        </Droppable>

        <ChooseBlockSheet blocksSetter={setBlocks} />
      </div>
    </main>
  )
}

const HomeWithBlocksProvider: React.FunctionComponent = (props) => (
  <BlocksProvider>
    <Home {...props} />
  </BlocksProvider>
)

export default HomeWithBlocksProvider
