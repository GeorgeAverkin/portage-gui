import React from 'react'
import { render } from 'react-dom'
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'
import 'typeface-roboto'

import Routes from './Routes'
import { store, history } from './store'
// import registerServiceWorker from './registerServiceWorker'
import './index.css'

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'))

// registerServiceWorker()