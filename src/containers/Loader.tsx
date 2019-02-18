import React from 'react'
import { connect } from 'react-redux'
import { CircularProgress, Typography } from '@material-ui/core'

import { RootState } from '../types'
import { getId } from '../actions/rpc'

type OwnProps = {
  action: ({ id }: { id: number }) => void
}

const mapStateToProps = (state: RootState, ownProps: OwnProps) => ({
  log: state.rpc.log,
  errors: state.rpc.errors,
  ...ownProps
})

const dispatchProps = {
  getId
}

type Props = ReturnType<typeof mapStateToProps> & { getId: () => number }
type State = { id: number }

class LoaderComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    const id = this.props.getId()
    this.props.action({ id })
    this.state = { id }
  }
  render = () => {
    const { log, children, action, getId, errors, ...ownProps } = this.props
    if (typeof children === undefined) {
      console.warn('Children undefined')
    }
    const status = log[this.state.id]
    switch (status) {
      case 'success':
        return children || null
      case 'error':
        const error = errors.find(v => v.id === this.state.id)
        if (!error) {
          const message = 'JSON-RPC id not found'
          console.error(message, this.state.id)
          return message
        }
        switch (error.cause) {
          case 'parser':
          case 'network':
            return (
              <div style={{ margin: 'auto' }}>
                <Typography>
                  {error.cause.charAt(0).toUpperCase() + error.cause.slice(1)} error
                </Typography>
                <Typography>ID: {error.id}</Typography>
                <Typography>{error.name}</Typography>
                <Typography>{error.message}</Typography>
              </div>
            )
          case 'response':
            return (
              <div style={{ margin: 'auto' }}>
                <Typography>
                  {error.cause.charAt(0).toUpperCase() + error.cause.slice(1)} error
                </Typography>
                <Typography>ID: {error.id}</Typography>
                <Typography>Code: {error.status}</Typography>
                <Typography>{error.statusText}</Typography>
              </div>
            )
        }
        console.log(errors)
        return <div style={{ margin: 'auto' }}>ERROR</div>
      case 'pending':
        return <CircularProgress style={{ margin: 'auto' }} {...ownProps} />
      default:
        return (
          <CircularProgress
            style={{ margin: 'auto' }}
            color="secondary"
            {...ownProps}
          />
        )
    }
  }
}

export default connect(mapStateToProps, dispatchProps)(LoaderComponent)