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
    <html lang="en" className="h-full">
      <body className="h-full">{children}</body>
    </html>
  )
}

export { metadata }
export default RootLayout
