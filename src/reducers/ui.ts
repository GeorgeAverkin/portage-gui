import { combineReducers } from 'redux'
import { ActionType, getType } from 'typesafe-actions'

import * as actions from '../actions/ui'

export type UiState = Readonly<{
  menuVisible: boolean
  packagesFilterVisible: boolean
}>

export type UiAction = ActionType<typeof actions>

const reducer = combineReducers<UiState, UiAction>({
  menuVisible: (state = false, { type }) => {
    switch (type) {
      case getType(actions.toggleMenu):
        return !state
      default:
        return state
    }
  },
  packagesFilterVisible: (state = false, { type }) => {
    switch (type) {
      case getType(actions.togglePackagesFilter):
        return !state
      default:
        return state
    }
  },
})

export default reducer