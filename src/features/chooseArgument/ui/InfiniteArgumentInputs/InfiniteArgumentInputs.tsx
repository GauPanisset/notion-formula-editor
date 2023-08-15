import { Block } from '@/entities/block'

import { ArgumentInputProps } from '../../model/types'
import { ArgumentInput } from '../ArgumentInput'

type Props = Pick<
  ArgumentInputProps,
  'argumentTypes' | 'blockSetter' | 'variables'
> & { nodeArguments: Block['nodeArguments'] }

const InfiniteArgumentInputs: React.FunctionComponent<Props> = ({
  argumentTypes,
  blockSetter,
  nodeArguments,
  variables,
}) => {
  return (
    <div className="flex flex-row items-center justify-center space-x-4">
      <ArgumentInput
        argument={nodeArguments[0]}
        argumentTypes={argumentTypes}
        argumentIndex={0}
        placeholder="First argument"
        blockSetter={blockSetter}
        variables={variables}
      />
      <span className="text-sm">and</span>
      <ArgumentInput
        argument={nodeArguments[1]}
        argumentTypes={argumentTypes}
        argumentIndex={1}
        placeholder="Second argument"
        blockSetter={blockSetter}
        variables={variables}
      />
    </div>
  )
}

export default InfiniteArgumentInputs
