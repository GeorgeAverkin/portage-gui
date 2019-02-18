import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { LocationDescriptor } from 'history'

import {
  AppBar,
  Badge,
  Hidden,
  IconButton,
  List,
  ListItemIcon,
  ListItemText,
  MuiThemeProvider,
  Paper,
  Theme,
  Toolbar,
  createMuiTheme,
  createStyles,
  withStyles,
} from '@material-ui/core'
import { ListItemProps } from '@material-ui/core/ListItem'

import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Apps as AppsIcon,
  Home as HomeIcon,
} from '@material-ui/icons'

import routes from '../constants/routes.json'
import TypographyTitle from '../containers/App/TypographyTitle'
import SwipeableDrawerMenu from '../containers/App/SwipeableDrawerMenu'
import ListItemMenu from '../containers/App/ListItemMenu'
import IconButtonMenu from '../containers/App/IconButtonMenu'

const styles = (theme: Theme) => createStyles({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing.unit * 2,
  },
  notifications: {
    marginRight: theme.spacing.unit * 2,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  container: {
    display: 'flex',
    overflow: 'hidden',
    height: '100%',
  },
  drawer: {
    whiteSpace: 'nowrap',
  },
  toolbar: theme.mixins.toolbar,
})

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
})

type Props = {
  classes: {
    [key: string]: string
  }
}

type LinkComponentProps = React.FunctionComponent<ListItemProps & { to: LocationDescriptor }>
const LinkComponent: LinkComponentProps = props => {
  const { to, innerRef, ...restProps } = props
  return <Link to={to} {...restProps} />
}

const App: React.FunctionComponent<Props> = props => {
  const { children, classes } = props
  return (
    <MuiThemeProvider theme={theme}>
      <AppBar color="default" position="static" className={classes.appBar}>
        <Toolbar>
          <Hidden mdUp>
            <IconButtonMenu className={classes.menuButton}>
              <MenuIcon />
            </IconButtonMenu>
          </Hidden>
          <TypographyTitle className={classes.grow} variant="h6" />
          <IconButton onClick={console.warn} className={classes.notifications}>
            <Badge badgeContent={666}>
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.container}>
        <Hidden mdUp>
          <SwipeableDrawerMenu>
            <div>
              <List>
                <ListItemMenu
                  component={props => <LinkComponent to={routes.ROOT} {...props} />}
                  button
                >
                  <ListItemText primary="Main page" />
                </ListItemMenu>
                <ListItemMenu
                  component={props => <LinkComponent to={routes.PACKAGES} {...props} />}
                  button
                >
                  <ListItemText primary="Packages" />
                </ListItemMenu>
              </List>
            </div>
          </SwipeableDrawerMenu>
        </Hidden>
        <Hidden smDown>
          <Paper className={classes.drawer}>
            <List>
              <ListItemMenu
                component={props => <LinkComponent to={routes.ROOT} {...props} />}
                button
              >
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary="Main page" />
              </ListItemMenu>
              <ListItemMenu
                component={props => <LinkComponent to={routes.PACKAGES} {...props} />}
                button
              >
                <ListItemIcon><AppsIcon /></ListItemIcon>
                <ListItemText primary="Packages" />
              </ListItemMenu>
            </List>
          </Paper>
        </Hidden>
        <Fragment>
          {children}
        </Fragment>
      </div>
    </MuiThemeProvider>
  )
}

export default withStyles(styles)(App)