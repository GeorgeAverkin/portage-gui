import { createAsyncAction } from 'typesafe-actions'
import { RpcRequest, RpcSuccess, RpcError } from './rpc'

export type Package = Readonly<{
  deps: Array<string>
  category: string
  name: string
  revision: string
  size: number
  files: number
  uncounted_files: number
  use: Array<string>
  active_use: Array<string>
}>

export const fetchPackages = createAsyncAction(
  'RPC_PACKAGES_REQUEST',
  'RPC_PACKAGES_SUCCESS',
  'RPC_PACKAGES_FAILURE',
)<RpcRequest, RpcSuccess<Array<Package>>, RpcError>()