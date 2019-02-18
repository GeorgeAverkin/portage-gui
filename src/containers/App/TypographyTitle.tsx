import React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { Typography } from '@material-ui/core'
import { TypographyProps } from '@material-ui/core/Typography'

import { RootState } from '../../types'
import routes from '../../constants/routes.json'

const mapStateToProps = (state: RootState, ownProps: TypographyProps) => ({
  pathname: state.router.location.pathname,
  ...ownProps
})

type Props = ReturnType<typeof mapStateToProps> & DispatchProp

const TypographyTitle: React.FunctionComponent<Props> = props => {
  const { pathname, dispatch, ...ownProps } = props
  switch (pathname) {
    case routes.ROOT:
      return <Typography {...ownProps}>Main page</Typography>
    case routes.PACKAGES:
      return <Typography {...ownProps}>Packages</Typography>
    default:
      console.error('Title not set because route not found', { pathname })
      return null
  }
}

export default connect(mapStateToProps)(TypographyTitle)