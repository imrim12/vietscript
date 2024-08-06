import { Alert } from 'antd'
import type { PropsWithChildren } from 'react'

interface Props {
  projectID?: string
  havePermission?: boolean
  permissionMessage?: string
}

function AdminGuard({
  children,
  havePermission = true,
  permissionMessage = "You don't have permission to view it"
}: PropsWithChildren<Props>) {
  if (!havePermission) {
    return <Alert message={permissionMessage} type='error' />
  }
  return <>{children}</>
}

export default AdminGuard
