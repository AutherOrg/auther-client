import React from 'react'
import { Route, Switch } from 'react-router'
import { push } from 'connected-react-router'
import { useDispatch, useSelector } from 'react-redux'
import {
  AppBar,
  CssBaseline,
  Drawer,
  Grid,
  Hidden,
  IconButton,
  List, ListItem, ListItemIcon, ListItemText,
  Toolbar,
  Typography
} from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import {
  AccountBalance,
  ArrowRight,
  Description,
  ExitToApp,
  Home as HomeIcon,
  List as ListIcon,
  LockOpen,
  Menu,
  School
} from '@material-ui/icons'

import constants from './constants/users.constants'
import actions from './actions/auth.actions'
// TODO remove only dev
import Basic from './components/test/Basic'
// Public & auth.
import Home from './components/pages/Home'
import Login from './components/pages/Login'
import LoginFromPermanentToken from './components/pages/LoginFromPermanentToken'
import ValidatePassword from './components/pages/ValidatePassword'
import Unauthorized from './components/pages/Unauthorized'
// Recipient.
import MyCertificates from './components/pages/MyCertificates'
import AllCertificates from './components/pages/AllCertificates'
// Issuer.
import Issuer from './components/pages/Issuer'
import Models from './components/pages/Models'
import Model from './components/pages/Model'
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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  React.useEffect(() => {
    document.title = process.env.REACT_APP_NAME
    if (process.env.REACT_APP_API === 'none') {
      dispatch(actions.setRole(constants.role.ISSUER))
    } else {
      dispatch(actions.setHasApi())
    }
  }, [dispatch])

  const drawer = (
    <div>
      <List>
        <ListItem button onClick={() => dispatch(push('/'))}>
          <ListItemIcon>{<HomeIcon />}</ListItemIcon>
          <ListItemText primary='Home' />
        </ListItem>
        {[constants.role.RECIPIENT].includes(authReducer.role) && (
          <ListItem button onClick={() => dispatch(push('/certificates/my'))}>
            <ListItemIcon>{<School />}</ListItemIcon>
            <ListItemText primary='My certificates' />
          </ListItem>
        )}
        {[constants.role.ADMIN, constants.role.ISSUER].includes(authReducer.role) && (
          <ListItem button onClick={() => dispatch(push('/issuers/my'))}>
            <ListItemIcon>{<AccountBalance />}</ListItemIcon>
            <ListItemText primary='Issuer' />
          </ListItem>
        )}
        {[constants.role.ADMIN, constants.role.ISSUER].includes(authReducer.role) && (
          <ListItem button onClick={() => dispatch(push('/models'))}>
            <ListItemIcon>{<Description />}</ListItemIcon>
            <ListItemText primary='Models' />
          </ListItem>
        )}
        {[constants.role.ADMIN, constants.role.ISSUER].includes(authReducer.role) && (
          <ListItem button onClick={() => dispatch(push('/batches'))}>
            <ListItemIcon>{<ListIcon />}</ListItemIcon>
            <ListItemText primary='Batches' />
          </ListItem>
        )}
        {[constants.role.ADMIN, constants.role.ISSUER].includes(authReducer.role) && (
          <ListItem button onClick={() => dispatch(push('/certificates/all'))}>
            <ListItemIcon>{<School />}</ListItemIcon>
            <ListItemText primary='Certificates' />
          </ListItem>
        )}
        {
          (authReducer.role === constants.role.ANONYMOUS && authReducer.hasApi)
            ? (
              <ListItem button onClick={() => dispatch(push('/auth/login'))}>
                <ListItemIcon>{<LockOpen />}</ListItemIcon>
                <ListItemText primary='Login' />
              </ListItem>
            )
            : authReducer.hasApi
              ? (
                <ListItem button onClick={() => dispatch(actions.logout())}>
                  <ListItemIcon>{<ExitToApp />}</ListItemIcon>
                  <ListItemText primary='Logout' />
                </ListItem>
              )
              : null
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
            {process.env.REACT_APP_NAME}
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
              <PrivateRoute userRoles={[constants.role.RECIPIENT]} exact path='/certificates/my' component={MyCertificates} />
              <PrivateRoute userRoles={[constants.role.ADMIN, constants.role.ISSUER]} exact path='/issuers/my' component={Issuer} />
              <PrivateRoute userRoles={[constants.role.ADMIN, constants.role.ISSUER]} exact path='/models' component={Models} />
              <PrivateRoute userRoles={[constants.role.ADMIN, constants.role.ISSUER]} exact path='/models/:id' component={Model} />
              <PrivateRoute userRoles={[constants.role.ADMIN, constants.role.ISSUER]} exact path='/batches' component={Batches} />
              <PrivateRoute userRoles={[constants.role.ADMIN, constants.role.ISSUER]} exact path='/certificates/all' component={AllCertificates} />
              <PrivateRoute userRoles={[constants.role.ADMIN, constants.role.ISSUER]} exact path='/test/basic' component={Basic} />
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
