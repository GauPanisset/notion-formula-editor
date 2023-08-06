import { v4 as uuidv4 } from 'uuid'

import { Block } from './type'

const createBlock = (type: Block['type']): Block => {
  return {
    id: uuidv4(),
    nodeArguments: [
      { type: 'directValue', value: '' },
      { type: 'directValue', value: '' },
    ],
    type,
  }
}

export { createBlock }
