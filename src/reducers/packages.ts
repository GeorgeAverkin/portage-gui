import { combineReducers } from 'redux'
import { ActionType, getType } from 'typesafe-actions'

import { fetchPackages, Package as ResponsePackage } from '../actions/packages'

export type Package = ResponsePackage & Readonly<{
  use_bool: {
    [key: string]: boolean
  }
}>

export type PackagesState = Readonly<{
  list: Array<Package>
}>

export type PackagesAction = ActionType<typeof fetchPackages>

const reducer = combineReducers<PackagesState, PackagesAction>({
  list: (state = [], action) => {
    switch (action.type) {
      case getType(fetchPackages.success):
        return action.payload.result.map((pkg) => ({
          ...pkg,
          use_bool: pkg.use
            .map(flag => ({ [flag]: pkg.active_use.includes(flag) }))
            .reduce((acc, cur) => ({ ...acc, ...cur }), {})
        }))
      default:
        return state
    }
  }
})

export default reducer