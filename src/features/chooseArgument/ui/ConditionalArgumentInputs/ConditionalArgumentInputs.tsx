import { ArgumentInputProps } from '../../model/types'
import { ArgumentInput } from '../ArgumentInput'

const ConditionalArgumentInputs: React.FunctionComponent<
  Pick<ArgumentInputProps, 'argumentTypes' | 'blockSetter' | 'variables'>
> = ({ argumentTypes, blockSetter, variables }) => {
  return (
    <div className="flex flex-col space-y-4 border-t pt-6">
      <div>
        <span className="mr-4 text-sm">When</span>
        <ArgumentInput
          argumentTypes={argumentTypes}
          argumentIndex={0}
          placeholder="Condition"
          blockSetter={blockSetter}
          variables={variables}
        />
      </div>
      <div>
        <span className="mx-4 text-sm">then</span>
        <ArgumentInput
          argumentTypes={argumentTypes}
          argumentIndex={1}
          placeholder="True argument"
          blockSetter={blockSetter}
          variables={variables}
        />
      </div>
      <div>
        <span className="mx-4 text-sm">else</span>
        <ArgumentInput
          argumentTypes={argumentTypes}
          argumentIndex={2}
          placeholder="False argument"
          blockSetter={blockSetter}
          variables={variables}
        />
      </div>
    </div>
  )
}

export default ConditionalArgumentInputs
