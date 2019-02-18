import React from 'react'
import { connect, DispatchProp } from 'react-redux'

import { RootState } from '../../types'

const mapStateToProps = (state: RootState, ownProps: {}) => ({
  packagesFilterVisible: state.ui.packagesFilterVisible,
  ...ownProps
})

type ClassNamesGenerator = {
  generateClassNames?: (props: ReturnType<typeof mapStateToProps>) => string
}

type Props = ReturnType<typeof mapStateToProps>
  & DispatchProp
  & ClassNamesGenerator
  & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const GridComponentPackages: React.FunctionComponent<Props> = props => {
  const {
    packagesFilterVisible, generateClassNames, className, dispatch, ...restProps
  } = props
  return (
    <div
      className={generateClassNames ? generateClassNames(props) : className}
      {...restProps}
    />
  )
}


export default connect(mapStateToProps)(GridComponentPackages)