import { applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import { createEpicMiddleware } from 'redux-observable'
import { createBrowserHistory } from 'history'
import { createLogger } from 'redux-logger'
import { StateType } from 'typesafe-actions'
import { routerMiddleware, routerActions } from 'connected-react-router'

import historyReducer from '../reducers'
import rootEpic from '../epics'
import { RootAction } from '../types'

const history = createBrowserHistory()

const rootReducer = historyReducer(history)

export type RootState = StateType<typeof rootReducer>

const logger = createLogger({
  level: 'info',
  collapsed: true
})

const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState>()

const middlewares = [
  thunk,
  epicMiddleware,
  routerMiddleware(history),
  logger,
]

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ routerActions }) :
  compose

const store = createStore(
  rootReducer, // new root reducer with router state
  {},
  composeEnhancers(applyMiddleware(...middlewares)),
)

epicMiddleware.run(rootEpic)

export { store, history, rootReducer }