import React from 'react'

import { assertNotNull } from '@/shared/lib/assertNotNull'

import { Block } from './types'

type BlocksContextType = {
  getBlock: (blockId: string) => Block | undefined
  getBlocks: () => Block[]
  setBlock: (blockId: string, input: React.SetStateAction<Block>) => void
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>
}

const BlocksContext = React.createContext<BlocksContextType | null>(null)

const useBlocksContext = () => assertNotNull(React.useContext(BlocksContext))

export { BlocksContext, useBlocksContext }
