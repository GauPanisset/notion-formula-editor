import {
  CheckboxIcon,
  FrameIcon,
  LetterCaseCapitalizeIcon,
} from '@radix-ui/react-icons'

import { cn } from '@/shared/lib/shadcn'

import { ArgumentType } from '../../model/types'

type Props = {
  className: string
  type: ArgumentType
}

const ArgumentTypeIcon: React.FunctionComponent<Props> = ({
  className,
  type,
}) => {
  if (type === 'boolean') return <CheckboxIcon className={cn('', className)} />
  if (type === 'number')
    return <FrameIcon className={cn('-skew-x-12', className)} />
  if (type === 'string')
    return <LetterCaseCapitalizeIcon className={cn('', className)} />

  return null
}

export default ArgumentTypeIcon
