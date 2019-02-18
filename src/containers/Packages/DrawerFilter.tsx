import React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { Drawer } from '@material-ui/core'
import { DrawerProps } from '@material-ui/core/Drawer'

import { RootState } from '../../types'

const mapStateToProps = (state: RootState, ownProps: DrawerProps) => ({
  packagesFilterVisible: state.ui.packagesFilterVisible,
  ...ownProps
})

type Props = ReturnType<typeof mapStateToProps> & DispatchProp

const DrawerFilter = (props: Props) => {
  const { packagesFilterVisible, dispatch, ...ownProps } = props
  return <Drawer open={packagesFilterVisible} {...ownProps} />
}

export default connect(mapStateToProps)(DrawerFilter)