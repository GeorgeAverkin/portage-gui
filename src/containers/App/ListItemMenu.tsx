import React from 'react'
import { connect } from 'react-redux'
import { ListItem } from '@material-ui/core'
import { ListItemProps } from '@material-ui/core/ListItem'

import { RootState } from '../../types'
import { toggleMenu } from '../../actions/ui'

const mapStateToProps = (state: RootState, ownProps: ListItemProps) => ownProps

const dispatchProps = {
  toggleMenu
}

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchProps

const ListItemMenu: React.FunctionComponent<Props> = props => {
  const { toggleMenu, ...ownProps } = props
  return <ListItem onClick={toggleMenu} {...ownProps} />
}

export default connect(mapStateToProps, dispatchProps)(ListItemMenu)