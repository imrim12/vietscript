import type { PropsWithChildren, ReactElement } from 'react'
import { Alert } from 'antd'

interface Props {
  projectID?: string
  havePermission?: boolean
  permissionMessage?: string
}

function AdminGuard({
  children,
  havePermission = true,
  permissionMessage = 'You don\'t have permission to view it',
}: PropsWithChildren<Props>): ReactElement {
  if (!havePermission) {
    return <Alert message={permissionMessage} type="error" />
  }
  return <>{children}</>
}

export default AdminGuard
