import type { ReactElement } from 'react'
import type { ReactWithChild } from 'src/interface/app'

export default function DefaultLayout({ children }: ReactWithChild): ReactElement {
  return <>{children}</>
}
