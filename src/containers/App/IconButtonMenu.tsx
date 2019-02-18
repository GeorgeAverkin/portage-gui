import React from 'react'
import { connect } from 'react-redux'
import { IconButton } from '@material-ui/core'
import { IconButtonProps } from '@material-ui/core/IconButton'

import { RootState } from '../../types'
import { toggleMenu } from '../../actions/ui'

const mapStateToProps = (state: RootState, ownProps: IconButtonProps) => ownProps

const dispatchProps = {
  toggleMenu
}

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchProps

const IconButtonMenu: React.FunctionComponent<Props> = props => {
  const { toggleMenu, ...ownProps } = props
  return <IconButton onClick={toggleMenu} {...ownProps} />
}

export default connect(mapStateToProps, dispatchProps)(IconButtonMenu)