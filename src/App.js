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
  Description,
  Edit,
  ExitToApp,
  Home as HomeIcon,
  LockOpen,
  Menu,
  Person,
  Settings as SettingsIcon,
  School
} from '@material-ui/icons'

import constants from './constants/users.constants'
import actions from './actions/auth.actions'
import JobsDialog from './components/organisms/JobsDialog'
import ServicesBackdrop from './components/organisms/ServicesBackdrop'
import ServicesError from './components/organisms/ServicesError'
// Public & auth.
import Home from './components/pages/Home'
import Login from './components/pages/Login'
import LoginFromToken from './components/pages/LoginFromToken'
import ResetPassword from './components/pages/ResetPassword'
import ResetPasswordProcess from './components/pages/ResetPasswordProcess'
import Unauthorized from './components/pages/Unauthorized'
import Share from './components/pages/Share'
// Recipient.
import CertificatesRecipient from './components/pages/CertificatesRecipient'
import Certificate from './components/pages/Certificate'
// Issuer.
import CertificatesIssuer from './components/pages/CertificatesIssuer'
import Batches from './components/pages/Batches'
import Batch from './components/pages/Batch'
import CreateBatch from './components/pages/CreateBatch'
import Models from './components/pages/Models'
import Model from './components/pages/Model'
import Signatures from './components/pages/Signatures'
import Signature from './components/pages/Signature'
import System from './components/pages/System'
import Issuer from './components/pages/Issuer'
// Admin.
import Users from './components/pages/Users'
import User from './components/pages/User'
// Dev tools.
import DevTemplate from './components/dev/DevTemplate'

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
  const handlePush = route => {
    if (mobileOpen) {
      handleDrawerToggle()
    }
    dispatch(push(route))
  }
  const handleLogout = () => {
    handlePush('/')
    dispatch(actions.logout())
  }

  React.useEffect(() => {
    document.title = process.env.REACT_APP_NAME
  }, [])

  const drawer = (
    <div>
      <List>
        <ListItem button onClick={() => handlePush('/')}>
          <ListItemIcon>{<HomeIcon />}</ListItemIcon>
          <ListItemText primary='Home' />
        </ListItem>
        {[constants.role.RECIPIENT].includes(authReducer.role) && (
          <ListItem button onClick={() => handlePush('/certificates/my')}>
            <ListItemIcon>{<School />}</ListItemIcon>
            <ListItemText primary='My certificates' />
          </ListItem>
        )}
        {[constants.role.ADMIN, constants.role.MANAGER, constants.role.ISSUER].includes(authReducer.role) && (
          <ListItem button onClick={() => handlePush('/certificates')}>
            <ListItemIcon>{<School />}</ListItemIcon>
            <ListItemText primary='Certificates' />
          </ListItem>
        )}
        {[constants.role.ADMIN, constants.role.MANAGER, constants.role.ISSUER].includes(authReducer.role) && (
          <ListItem button onClick={() => handlePush('/models')}>
            <ListItemIcon>{<Description />}</ListItemIcon>
            <ListItemText primary='Models' />
          </ListItem>
        )}
        {[constants.role.ADMIN, constants.role.MANAGER, constants.role.ISSUER].includes(authReducer.role) && (
          <ListItem button onClick={() => handlePush('/signatures')}>
            <ListItemIcon>{<Edit />}</ListItemIcon>
            <ListItemText primary='Signatures' />
          </ListItem>
        )}
        {[constants.role.ADMIN].includes(authReducer.role) && (
          <ListItem button onClick={() => handlePush('/users')}>
            <ListItemIcon>{<Person />}</ListItemIcon>
            <ListItemText primary='Users' />
          </ListItem>
        )}
        {[constants.role.ADMIN, constants.role.MANAGER, constants.role.ISSUER].includes(authReducer.role) && (
          <ListItem button onClick={() => handlePush('/system')}>
            <ListItemIcon>{<SettingsIcon />}</ListItemIcon>
            <ListItemText primary='System' />
          </ListItem>
        )}
        {
          (authReducer.role === constants.role.ANONYMOUS)
            ? (
              <ListItem button onClick={() => handlePush('/auth/login')}>
                <ListItemIcon>{<LockOpen />}</ListItemIcon>
                <ListItemText primary='Login' />
              </ListItem>
            )
            : (
              <ListItem button onClick={() => handleLogout()}>
                <ListItemIcon>{<ExitToApp />}</ListItemIcon>
                <ListItemText primary='Logout' />
              </ListItem>
            )
        }
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
              <Route exact path='/auth/login/token/:token' component={LoginFromToken} />
              <Route exact path='/auth/password/reset' component={ResetPassword} />
              <Route exact path='/auth/password/reset/process/:token' component={ResetPasswordProcess} />
              <Route exact path='/certificates/shared/:sharingUuid' component={Share} />
              <PrivateRoute userRoles={[constants.role.ADMIN, constants.role.MANAGER, constants.role.ISSUER, constants.role.RECIPIENT]} exact path='/certificates/my' component={CertificatesRecipient} />
              <PrivateRoute userRoles={[constants.role.ADMIN, constants.role.MANAGER, constants.role.ISSUER, constants.role.RECIPIENT]} exact path='/certificates/:id' component={Certificate} />
              <PrivateRoute userRoles={[constants.role.ADMIN, constants.role.MANAGER, constants.role.ISSUER]} exact path='/certificates' component={CertificatesIssuer} />
              <PrivateRoute userRoles={[constants.role.ADMIN, constants.role.MANAGER, constants.role.ISSUER]} exact path='/batches' component={Batches} />
              <PrivateRoute userRoles={[constants.role.ADMIN, constants.role.MANAGER, constants.role.ISSUER]} exact path='/batches/create' component={CreateBatch} />
              <PrivateRoute userRoles={[constants.role.ADMIN, constants.role.MANAGER, constants.role.ISSUER]} exact path='/batches/:id' component={Batch} />
              <PrivateRoute userRoles={[constants.role.ADMIN, constants.role.MANAGER, constants.role.ISSUER]} exact path='/models' component={Models} />
              <PrivateRoute userRoles={[constants.role.ADMIN, constants.role.MANAGER, constants.role.ISSUER]} exact path='/models/:id' component={Model} />
              <PrivateRoute userRoles={[constants.role.ADMIN, constants.role.MANAGER, constants.role.ISSUER]} exact path='/signatures' component={Signatures} />
              <PrivateRoute userRoles={[constants.role.ADMIN, constants.role.MANAGER, constants.role.ISSUER]} exact path='/signatures/:id' component={Signature} />
              <PrivateRoute userRoles={[constants.role.ADMIN, constants.role.MANAGER, constants.role.ISSUER]} exact path='/system' component={System} />
              <PrivateRoute userRoles={[constants.role.ADMIN, constants.role.MANAGER, constants.role.ISSUER]} exact path='/system/issuer' component={Issuer} />
              <PrivateRoute userRoles={[constants.role.ADMIN]} exact path='/users' component={Users} />
              <PrivateRoute userRoles={[constants.role.ADMIN]} exact path='/users/create' component={User} />
              <Route exact path='/dev/template' component={DevTemplate} />
            </Switch>
          </Grid>
          {process.env.REACT_APP_FOOTER !== 'false' && (
            <Grid item xs={12} align='center'>
              <Typography classes={{ root: classes.poweredBy }}>Powered by <a href='https://auther.org' target='auther' rel='noopener noreferrer' className={classes.poweredByLink}>Auther</a>, an opensource implementation of Blockcerts</Typography>
            </Grid>
          )}
        </Grid>
      </main>
      <ServicesBackdrop />
      <ServicesError />
      {[constants.role.ADMIN, constants.role.MANAGER, constants.role.ISSUER].includes(authReducer.role) && (
        <JobsDialog />
      )}
    </div>
  )
}
