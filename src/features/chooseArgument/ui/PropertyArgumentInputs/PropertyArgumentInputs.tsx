import { Block } from '@/entities/block'

import { ArgumentInputProps } from '../../model/types'
import { ArgumentInput } from '../ArgumentInput'

type Props = Pick<ArgumentInputProps, 'argumentTypes' | 'blockSetter'> & {
  nodeArguments: Block['nodeArguments']
}

const PropertyArgumentInputs: React.FunctionComponent<Props> = ({
  argumentTypes,
  blockSetter,
  nodeArguments,
}) => {
  return (
    <div className="flex flex-col space-y-4">
      <div>
        <span className="mr-4 text-sm">Property name</span>
        <ArgumentInput
          argument={nodeArguments[0]}
          argumentTypes={['string']}
          argumentIndex={0}
          placeholder="Property name"
          blockSetter={blockSetter}
        />
      </div>
      <div>
        <span className="mr-4 text-sm">Property value</span>
        <ArgumentInput
          argument={nodeArguments[1]}
          argumentTypes={argumentTypes}
          argumentIndex={1}
          placeholder="Property value"
          blockSetter={blockSetter}
        />
      </div>
    </div>
  )
}

export default PropertyArgumentInputs
