import { v4 as uuidv4 } from 'uuid'

import { blockConfig } from '../config/blockConfig'
import { defaultArgument } from '../config/defaultArgument'
import { Block } from './types'

const createBlock = (type: Block['type']): Block => {
  return {
    id: uuidv4(),
    nodeArguments:
      blockConfig[type].nodeType === 'conditional'
        ? [defaultArgument, defaultArgument, defaultArgument]
        : [defaultArgument, defaultArgument],
    type,
  }
}

export { createBlock }
