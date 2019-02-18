import React from 'react'
import { connect } from 'react-redux'
import { IconButton } from '@material-ui/core'
import { IconButtonProps } from '@material-ui/core/IconButton'
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@material-ui/icons'

import { RootState } from '../../types'
import { togglePackagesFilter } from '../../actions/ui'

const mapStateToProps = (state: RootState, ownProps: IconButtonProps) => ({
  packagesFilterVisible: state.ui.packagesFilterVisible,
  ...ownProps
})

const dispatchProps = {
  togglePackagesFilter
}

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchProps

const IconButtonSideBar = ({ children, togglePackagesFilter, packagesFilterVisible, ...ownProps }: Props) => {
  return (
    <IconButton onClick={togglePackagesFilter} {...ownProps}>
      {packagesFilterVisible ? <ChevronRightIcon /> : <ChevronLeftIcon />}
    </IconButton>
  )
}

export default connect(mapStateToProps, dispatchProps)(IconButtonSideBar)