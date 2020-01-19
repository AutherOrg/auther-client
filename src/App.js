import React from 'react'
import { Route, Switch } from 'react-router'
import { push } from 'connected-react-router'
import { useDispatch, useSelector } from 'react-redux'
import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  Grid,
  Hidden,
  IconButton,
  List, ListItem, ListItemIcon, ListItemText,
  Toolbar,
  Typography
} from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { ArrowRight, ExitToApp, Home as HomeIcon, List as ListIcon, LockOpen, Menu } from '@material-ui/icons'

import constants from './constants/users.constants'
import actions from './actions/auth.actions'
import Basic from './components/test/Basic'
import Home from './components/pages/Home'
import Login from './components/pages/Login'
import LoginFromPermanentToken from './components/pages/LoginFromPermanentToken'
import ValidatePassword from './components/pages/ValidatePassword'
import Unauthorized from './components/pages/Unauthorized'
import Batches from './components/pages/Batches'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      top: '64px'
    }
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: '64px'
  },
  poweredBy: {
    fontSize: '0.7rem',
    color: theme.palette.grey[500]
  },
  poweredByLink: {
    color: theme.palette.grey[500]
  }
}))

export default function App () {
  const classes = useStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const dispatch = useDispatch()
  const authReducer = useSelector(state => state.authReducer)

  React.useEffect(() => {
    document.title = process.env.REACT_APP_APPLICATION_NAME
    if (process.env.REACT_APP_API === 'none') {
      dispatch(actions.setRole(constants.role.ISSUER))
    }
  }, [dispatch])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div>
      <List>
        <ListItem button onClick={() => dispatch(push('/'))}>
          <ListItemIcon>{<HomeIcon />}</ListItemIcon>
          <ListItemText primary='Home' />
        </ListItem>
        {[constants.role.ADMIN, constants.role.ISSUER].includes(authReducer.role) && (
          <ListItem button onClick={() => dispatch(push('/batches'))}>
            <ListItemIcon>{<ListIcon />}</ListItemIcon>
            <ListItemText primary='Certificate batches' />
          </ListItem>
        )}
      </List>
      <Divider />
      <List>
        {
          authReducer.role === constants.role.ANONYMOUS
            ? (
              <ListItem button onClick={() => dispatch(push('/auth/login'))}>
                <ListItemIcon>{<LockOpen />}</ListItemIcon>
                <ListItemText primary='Login' />
              </ListItem>
            ) : (
              <ListItem button onClick={() => dispatch(actions.logout())}>
                <ListItemIcon>{<ExitToApp />}</ListItemIcon>
                <ListItemText primary='Logout' />
              </ListItem>
            )
        }
        {[constants.role.ADMIN, constants.role.ISSUER].includes(authReducer.role) && (
          <ListItem button onClick={() => dispatch(push('/test/basic'))}>
            <ListItemIcon>{<ArrowRight />}</ListItemIcon>
            <ListItemText primary='Basic issuer' />
          </ListItem>
        )}
      </List>
    </div>
  )

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={
        props =>
          rest.userRoles.indexOf(authReducer.role) > -1 ? <Component {...props} /> : <Unauthorized />
      }
    />
  )

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <Menu />
          </IconButton>
          <Typography variant='h6' noWrap>
            {process.env.REACT_APP_APPLICATION_NAME}
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label='mailbox folders'>
        <Hidden smUp implementation='css'>
          <Drawer
            variant='temporary'
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation='css'>
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant='permanent'
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/auth/login' component={Login} />
              <Route exact path='/auth/login/permanent/:permanentToken' component={LoginFromPermanentToken} />
              <Route exact path='/auth/password/validate/:passwordToken' component={ValidatePassword} />
              <Route exact path='/batches' component={Batches} />
              <PrivateRoute userRoles={[constants.role.ADMIN]} exact path='/test/basic' component={Basic} />
            </Switch>
          </Grid>
          <Grid item xs={12} align='center'>
            <Typography classes={{ root: classes.poweredBy }}>Powered by <a href='https://openblockcerts.org' target='blockcerts' rel='noopener noreferrer' className={classes.poweredByLink}>OpenBlockcerts</a>, an opensource implementation of blockchain-certified credentials</Typography>
          </Grid>
        </Grid>
      </main>
    </div>
  )
}
