import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import laurel from '../../templates/auther/default/laurel'

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(4),
    padding: theme.spacing(4),
    border: '1px solid red',
    backgroundColor: 'white'
  },
  content: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '400px',
    height: '400px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    background: `url(${laurel}) center center no-repeat`,
    backgroundSize: 'contain',
    fontSize: '400%',
    fontWeight: 'bold',
    textShadow: '3px 3px #e0e0e0'
  }
}))

export default function DevImage () {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.name}>
          Blockchain for developers 1
        </div>
      </div>
    </div>
  )
}
