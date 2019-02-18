import { combineReducers } from 'redux'
import { getType, ActionType } from 'typesafe-actions'

import { _incrementJsonRpcId, rpcClearErrors, RpcError } from '../actions/rpc'
import { fetchPackages } from '../actions/packages'

export type RPCState = Readonly<{
  nextID: number
  log: {
    [key: number]: string
  }
  errors: Array<RpcError>
}>

const actions = { fetchPackages, rpcClearErrors, _incrementJsonRpcId }

export type RpcAction = ActionType<typeof actions>

const reducer = combineReducers<RPCState, RpcAction>({
  nextID: (state = 0, { type }) => {
    switch (type) {
      case getType(_incrementJsonRpcId):
        return state + 1
      default:
        return state
    }
  },
  log: (state = {}, action) => {
    switch (action.type) {
      case getType(fetchPackages.request):
        return { ...state, [action.payload.id]: 'pending' }
      case getType(fetchPackages.success):
        return { ...state, [action.payload.id]: 'success' }
      case getType(fetchPackages.failure):
        return { ...state, [action.payload.id]: 'error' }
      default:
        return state
    }
  },
  errors: (state = [], action) => {
    switch (action.type) {
      case getType(rpcClearErrors):
        return []
      case getType(fetchPackages.failure):
        return [...state, action.payload]
      default:
        return state
    }
  },
})

export default reducer