import { Block } from '@/entities/block'

import { ArgumentInputProps } from '../../model/types'
import { ArgumentInput } from '../ArgumentInput'

type Props = Pick<
  ArgumentInputProps,
  'argumentTypes' | 'blockSetter' | 'variables'
> & { nodeArguments: Block['nodeArguments'] }

const ConditionalArgumentInputs: React.FunctionComponent<Props> = ({
  argumentTypes,
  blockSetter,
  nodeArguments,
  variables,
}) => {
  return (
    <div className="flex flex-col space-y-4">
      <div>
        <span className="mr-4 text-sm">When</span>
        <ArgumentInput
          argument={nodeArguments[0]}
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
          argument={nodeArguments[1]}
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
          argument={nodeArguments[2]}
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
