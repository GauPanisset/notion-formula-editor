import { v4 as uuidv4 } from 'uuid'

import { config } from '../config'
import { Block } from './type'

const createBlock = (type: Block['type']): Block => {
  return {
    id: uuidv4(),
    type,
    functionNode: config[type].functionNodeFactory(),
  }
}

export { createBlock }
