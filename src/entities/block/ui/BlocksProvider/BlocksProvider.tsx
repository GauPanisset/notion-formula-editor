import React from 'react'

import { BlocksContext } from '../../model/blocksContext'
import { Block } from '../../model/type'

type Props = {
  children: React.ReactNode
}

const BlocksProvider: React.FunctionComponent<Props> = ({ children }) => {
  const [blocks, setBlocks] = React.useState<Block[]>([])

  const blocksContext = React.useMemo(() => ({ blocks, setBlocks }), [blocks])

  return (
    <BlocksContext.Provider value={blocksContext}>
      {children}
    </BlocksContext.Provider>
  )
}

export default BlocksProvider
