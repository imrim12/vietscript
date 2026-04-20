import type { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'
import DefaultLayout from 'src/components/layouts/DefaultLayout'

function DefaultRoute(): ReactElement {
  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  )
}

export default DefaultRoute
