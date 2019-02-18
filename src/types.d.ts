import { StateType, ActionType } from 'typesafe-actions'
import { RootState } from './store'

export type Store = StateType<typeof import('./store').store>
export type RootState = StateType<typeof import('./store').rootReducer>
export type RootAction = ActionType<typeof import('./actions').default>