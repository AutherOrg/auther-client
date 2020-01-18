import React from 'react'
import { Route, Switch } from 'react-router'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List, ListItem, ListItemIcon, ListItemText,
  Toolbar,
  Typography
} from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { ArrowRight, Home as HomeIcon, List as ListIcon, LockOpen, Menu } from '@material-ui/icons'

import Home from './components/pages/Home'
import Batches from './components/pages/Batches'
import Basic from './components/test/Basic'

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
  }
}))

export default function App () {
  const classes = useStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const dispatch = useDispatch()

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
        <ListItem button onClick={() => dispatch(push('/batches'))}>
          <ListItemIcon>{<ListIcon />}</ListItemIcon>
          <ListItemText primary='Certificate batches' />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>{<LockOpen />}</ListItemIcon>
          <ListItemText primary='Login (TODO)' />
        </ListItem>
        <ListItem button onClick={() => dispatch(push('/test/basic'))}>
          <ListItemIcon>{<ArrowRight />}</ListItemIcon>
          <ListItemText primary='Basic issuer' />
        </ListItem>
      </List>
    </div>
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
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
              keepMounted: true // Better open performance on mobile.
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
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/batches' component={Batches} />
          <Route exact path='/test/basic' component={Basic} />
        </Switch>
      </main>
    </div>
  )
}
