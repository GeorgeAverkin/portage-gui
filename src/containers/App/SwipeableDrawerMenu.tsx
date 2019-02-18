import React from 'react'
import { connect } from 'react-redux'
import { SwipeableDrawer } from '@material-ui/core'
import { SwipeableDrawerProps } from '@material-ui/core/SwipeableDrawer'

import { RootState } from '../../types'
import { toggleMenu } from '../../actions/ui'

type OwnProps = React.ComponentType<SwipeableDrawerProps>

const mapStateToProps = (state: RootState, ownProps: OwnProps) => ({
  menuVisible: state.ui.menuVisible,
  ...ownProps
})

const dispatchProps = {
  toggleMenu
}

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchProps

const SwipeableDrawerMenu: React.FunctionComponent<Props> = props => {
  const { toggleMenu, menuVisible, ...ownProps } = props
  return (
    <SwipeableDrawer
      open={menuVisible}
      onClose={toggleMenu}
      onOpen={toggleMenu}
      {...ownProps}
    />
  )
}

export default connect(mapStateToProps, dispatchProps)(SwipeableDrawerMenu)