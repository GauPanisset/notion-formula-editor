import React from 'react'

import { assertNotNull } from '@/shared/lib/assertNotNull'

import { Block } from './type'

type BlocksContextType = {
  blocks: Block[]
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>
}

const BlocksContext = React.createContext<BlocksContextType | null>(null)

const useBlocksContext = () => assertNotNull(React.useContext(BlocksContext))

export { BlocksContext, useBlocksContext }
