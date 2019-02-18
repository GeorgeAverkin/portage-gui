import { combineEpics } from 'redux-observable'
import * as packagesEpics from '../epics/packages'
export default combineEpics(...Object.values(packagesEpics))