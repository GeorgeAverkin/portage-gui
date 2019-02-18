import { Dispatch } from 'redux'
import { createStandardAction } from 'typesafe-actions'

import { RootState } from '../types'

export type RpcRequest = { id: number }

export type RpcSuccess<T> = { id: number, result: T }

type NetworkError = {
  id: number
  cause: 'network'
  name: 'string'
  message: 'string'
}

type ResponseError = {
  id: number
  cause: 'response'
  status: number
  statusText: string
}

type ParserError = {
  id: number
  cause: 'parser'
  name: 'string'
  message: 'string'
}

export type RpcError = NetworkError | ResponseError | ParserError

const INCREMENT_JSONRPC_ID = 'INCREMENT_JSONRPC_ID'

export const _incrementJsonRpcId = createStandardAction(INCREMENT_JSONRPC_ID)()
export const rpcClearErrors = createStandardAction('RPC_CLEAR_ERRORS')()

export const getId = () =>
  (dispatch: Dispatch, getState: () => RootState) => {
    const id = getState().rpc.nextID
    dispatch({ type: INCREMENT_JSONRPC_ID })
    return id
  }