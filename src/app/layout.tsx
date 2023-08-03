import './globals.css'

import type { Metadata } from 'next'

const metadata: Metadata = {
  title: 'Notion formula builder',
}

type Props = {
  children: React.ReactNode
}

const RootLayout: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

export { metadata }
export default RootLayout
