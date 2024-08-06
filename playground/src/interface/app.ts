import { UploadProps } from 'antd'
import { iteratee } from 'lodash'

export interface ReactWithChild {
  children?: React.ReactNode
}

export type Dictionary<T> = Record<string, T>

export type ValidValue<T> = Exclude<T, null | undefined | 0 | '' | false>

export const BooleanFilter = <T>(x: T): x is ValidValue<T> => Boolean(x)
export type LazyLoadElement = () => Promise<{ default: React.ComponentType }>

export interface Route {
  path: string
  element: LazyLoadElement
  children?: Route[]
}

export interface UploadRef extends UploadProps {
  onReset: () => void
  imageUrl: string | null
  setImageUrl: (url: string) => void
}

export interface Profile {
  user_name: string
  email: string
  id: string
  created_at: string
}
