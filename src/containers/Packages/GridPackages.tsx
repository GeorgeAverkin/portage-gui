import React from 'react'
import { connect } from 'react-redux'
import { Grid, GridProps } from '@devexpress/dx-react-grid-material-ui'

import { RootState } from '../../types'
import Loader from '../Loader'
import { fetchPackages } from '../../actions/packages'

type OwnProps = {
  [P in keyof GridProps]?: GridProps[P]
} & {
  children: React.ReactNode
}

const mapStateToProps = (state: RootState, ownProps: OwnProps) => ({
  packages: state.packages.list,
  ...ownProps
})

const dispatchProps = {
  fetchPackages: fetchPackages.request
}

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchProps

const GridPackages = (props: Props) => {
  const {
    packages,
    columns,
    fetchPackages,
    children,
    ...ownProps
  } = props
  return (
    <Loader action={fetchPackages}>
      <Grid
        columns={columns || []}
        rows={packages}
        {...ownProps}
      >
        {children}
      </Grid>
    </Loader>
  )
}

export default connect(mapStateToProps, dispatchProps)(GridPackages)