import { Block } from '@/entities/block'

import { ArgumentInputProps } from '../../model/types'
import { ArgumentInput } from '../ArgumentInput'

type Props = Pick<
  ArgumentInputProps,
  'argumentTypes' | 'blockSetter' | 'variables'
> & {
  label: string
  nodeArguments: Block['nodeArguments']
}

const OperatorArgumentInputs: React.FunctionComponent<Props> = ({
  argumentTypes,
  blockSetter,
  label,
  nodeArguments,
  variables,
}) => {
  return (
    <div className="flex flex-row items-center justify-center space-x-4">
      <span className="text-sm ">Does</span>
      <ArgumentInput
        argument={nodeArguments[0]}
        argumentTypes={argumentTypes}
        argumentIndex={0}
        placeholder="First argument"
        blockSetter={blockSetter}
        variables={variables}
      />
      <span className="text-sm lowercase">{label}</span>
      <ArgumentInput
        argument={nodeArguments[1]}
        argumentTypes={argumentTypes}
        argumentIndex={1}
        placeholder="Second argument"
        blockSetter={blockSetter}
        variables={variables}
      />
      <span className="text-sm">?</span>
    </div>
  )
}

export default OperatorArgumentInputs
