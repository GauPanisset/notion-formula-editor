import { ArgumentInputProps } from '../../model/types'
import { ArgumentInput } from '../ArgumentInput'

const InfiniteArgumentInputs: React.FunctionComponent<
  Pick<ArgumentInputProps, 'argumentTypes' | 'blockSetter' | 'variables'>
> = ({ argumentTypes, blockSetter, variables }) => {
  return (
    <div className="flex flex-row items-center justify-center space-x-4 border-t pt-6">
      <ArgumentInput
        argumentTypes={argumentTypes}
        argumentIndex={0}
        placeholder="First argument"
        blockSetter={blockSetter}
        variables={variables}
      />
      <span className="text-sm">and</span>
      <ArgumentInput
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
