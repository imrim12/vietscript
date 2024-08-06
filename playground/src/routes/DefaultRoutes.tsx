import { Outlet } from 'react-router-dom'
import DefaultLayout from 'src/components/layouts/DefaultLayout'

function DefaultRoute() {
  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  )
}

export default DefaultRoute
