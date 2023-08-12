import { ArgumentInputProps } from '../../model/types'
import { ArgumentInput } from '../ArgumentInput'

const OperatorArgumentInputs: React.FunctionComponent<
  Pick<ArgumentInputProps, 'argumentTypes' | 'blockSetter' | 'variables'> & {
    label: string
  }
> = ({ argumentTypes, blockSetter, label, variables }) => {
  return (
    <div className="flex flex-row items-center justify-center space-x-4 border-t pt-6">
      <span className="text-sm ">Does</span>
      <ArgumentInput
        argumentTypes={argumentTypes}
        argumentIndex={0}
        placeholder="First argument"
        blockSetter={blockSetter}
        variables={variables}
      />
      <span className="text-sm lowercase">{`${label}s`}</span>
      <ArgumentInput
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
