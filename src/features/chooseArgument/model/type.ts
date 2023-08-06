import { blockConfig } from '@/entities/block'

type ArgumentType =
  (typeof blockConfig)[keyof typeof blockConfig]['argumentsTypes'][number]

export type { ArgumentType }
