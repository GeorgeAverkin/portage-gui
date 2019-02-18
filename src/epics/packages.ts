import { RootAction, RootState } from '../types'

import { Epic } from 'redux-observable'
import { isActionOf } from 'typesafe-actions'
import { from, of } from 'rxjs'
import { filter, tap, switchMap, map, catchError } from 'rxjs/operators'

import { fetchPackages } from '../actions/packages'
import { jrpc } from '../utils'

type EpicPackages = Epic<RootAction, RootAction, RootState>

export const fetchPackagesEpic: EpicPackages = (action, state) => action
  .pipe(
    filter(isActionOf(fetchPackages.request)),
    switchMap(() => from(jrpc({ id: 0, params: [], method: 'packages' }))
      .pipe(
        map(fetchPackages.success),
        catchError(err => of(fetchPackages.failure({ id: 0, ...err })))
      )),
  )
