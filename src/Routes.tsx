import React from 'react'
import { Switch, Route } from 'react-router'
import { connect } from 'react-redux'

import { RootState } from './types'
import routes from './constants/routes.json'
import App from './components/App'
import Packages from './components/Packages'

type Props = {}

const Routes: React.SFC<Props> = () => {
  return (
    <App>
      <Switch>
        <Route path={routes.PACKAGES} component={Packages} />
      </Switch>
    </App>
  )
}

const mapStateToProps = (state: RootState, ownProps: Props) => ({
  ...ownProps,
})

export default connect(mapStateToProps)(Routes)