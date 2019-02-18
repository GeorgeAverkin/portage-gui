import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'

import ui from './ui'
import packages from './packages'
import rpc from './rpc'

const historyReducer = (history: History) => combineReducers({
  packages,
  router: connectRouter(history),
  rpc,
  ui,
})

// const rootReducer = combineReducers({
//   packages,
//   rpc,
//   ui,
// })

export default historyReducer
