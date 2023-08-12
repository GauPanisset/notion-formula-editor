'use client'

import React from 'react'

import { useBlocksContext } from '@/entities/block'
import { BlocksProvider } from '@/entities/block'
import { ChooseBlockSheet } from '@/features/addBlock'
import { BlockCard, ResultFooter } from '@/widgets'

const Home: React.FunctionComponent = () => {
  const { getBlocks, setBlocks } = useBlocksContext()

  const blocks = getBlocks()

  return (
    <main className="m-auto flex h-full max-w-[640px] flex-col p-4">
      <div className="flex w-full flex-1 flex-col items-center space-y-4 overflow-scroll">
        {blocks.map((block) => (
          <BlockCard key={block.id} {...block} />
        ))}
        <ChooseBlockSheet blocksSetter={setBlocks} />
      </div>

      <ResultFooter />
    </main>
  )
}

const HomeWithBlocksProvider: React.FunctionComponent = (props) => (
  <BlocksProvider>
    <Home {...props} />
  </BlocksProvider>
)

export default HomeWithBlocksProvider
