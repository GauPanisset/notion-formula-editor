import { ArgumentInputProps } from '../../model/types'
import { ArgumentInput } from '../ArgumentInput'

const PropertyArgumentInputs: React.FunctionComponent<
  Pick<ArgumentInputProps, 'argumentTypes' | 'blockSetter'>
> = ({ argumentTypes, blockSetter }) => {
  return (
    <div className="flex flex-col space-y-4 border-t pt-6">
      <div>
        <span className="mr-4 text-sm">Property name</span>
        <ArgumentInput
          argumentTypes={['string']}
          argumentIndex={0}
          placeholder="Property name"
          blockSetter={blockSetter}
        />
      </div>
      <div>
        <span className="mr-4 text-sm">Property value</span>
        <ArgumentInput
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
