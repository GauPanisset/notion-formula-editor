import { Block } from './model/type'

type BlockConfig = {
  helperText: string
  label: string
  description: string
}

const config: Record<Block['name'], BlockConfig> = {
  add: {
    helperText: '',
    label: 'Add',
    description: 'Adds two numbers and returns their sum.',
  },
  concat: {
    helperText: '',
    label: 'Concat',
    description: 'Concatenates its arguments and returns the result.',
  },
}

export { config }
