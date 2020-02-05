import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Card, CardHeader, CardContent, CardMedia, CardActions,
  Chip,
  IconButton,
  Grid,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { CloudDownload, Delete, Share } from '@material-ui/icons'

import actions from '../../actions/certificates.actions'

const useStyles = makeStyles(theme => ({
  image: {
    width: '100%',
    height: 'auto'
  },
  issuer: {
    textAlign: 'center',
    marginTop: '20px'
  },
  expand: {
    marginLeft: 'auto'
  }
}))

export default function Certificates () {
  const dispatch = useDispatch()

  const certificatesReducer = useSelector(state => state.certificatesReducer)
  console.log(certificatesReducer.certificates)

  const classes = useStyles()

  React.useEffect(() => {
    dispatch(actions.getAll())
  }, [dispatch])

  return (
    <Grid container spacing={5} justify='center'>
      <Grid item xs={12} align='center'>
        <Typography variant='h1' gutterBottom>My certificates</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={5} justify='center'>
          {/* {certificatesReducer.certificates.map((certificate, index) => (
            <Grid item xs={12} lg={3} key={index}>
              <Card>
                <CardHeader title='English For Business' />
                <CardContent>
                  <img
                    src='https://upload.wikimedia.org/wikipedia/commons/c/ca/Business_English_Academy_Logo.jpg'
                  />
                  <Typography>SEAMEO-INNOTECH</Typography>
                </CardContent>
                <CardActions>
                  <IconButton>
                    <Visibility />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))} */}
          <Grid item xs={12} lg={3}>
            <Card>
              <CardHeader title='English For Business' />
              <CardMedia
                component='img'
                src='https://upload.wikimedia.org/wikipedia/commons/c/ca/Business_English_Academy_Logo.jpg'
              />
              <CardContent>
                <Typography gutterBottom>English For Business is a 100 hours digital learning course that allows to access top profiency in English in any professional situation.</Typography>
                <div className={classes.issuer}>
                  <Chip
                    label='SEAMEO-INNOTECH'
                    variant='outlined'
                    align='center'
                  />
                </div>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton>
                  <CloudDownload color='primary' />
                </IconButton>
                <IconButton>
                  <Share color='primary' />
                </IconButton>
                <IconButton classes={{ root: classes.expand }}>
                  <Delete color='secondary' />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} lg={3}>
            <Card>
              <CardHeader title='English For Business' />
              <CardMedia
                component='img'
                src='https://upload.wikimedia.org/wikipedia/commons/c/ca/Business_English_Academy_Logo.jpg'
              />
              <CardContent>
                <Typography gutterBottom>English For Business is a 100 hours digital learning course that allows to access top profiency in English in any professional situation.</Typography>
                <div className={classes.issuer}>
                  <Chip
                    label='SEAMEO-INNOTECH'
                    variant='outlined'
                    align='center'
                  />
                </div>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton>
                  <CloudDownload color='primary' />
                </IconButton>
                <IconButton>
                  <Share color='primary' />
                </IconButton>
                <IconButton classes={{ root: classes.expand }}>
                  <Delete color='secondary' />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} lg={3}>
            <Card>
              <CardHeader title='English For Business' />
              <CardMedia
                component='img'
                src='https://upload.wikimedia.org/wikipedia/commons/c/ca/Business_English_Academy_Logo.jpg'
              />
              <CardContent>
                <Typography gutterBottom>English For Business is a 100 hours digital learning course that allows to access top profiency in English in any professional situation.</Typography>
                <div className={classes.issuer}>
                  <Chip
                    label='SEAMEO-INNOTECH'
                    variant='outlined'
                    align='center'
                  />
                </div>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton>
                  <CloudDownload color='primary' />
                </IconButton>
                <IconButton>
                  <Share color='primary' />
                </IconButton>
                <IconButton classes={{ root: classes.expand }}>
                  <Delete color='secondary' />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} lg={3}>
            <Card>
              <CardHeader title='English For Business' />
              <CardMedia
                component='img'
                src='https://upload.wikimedia.org/wikipedia/commons/c/ca/Business_English_Academy_Logo.jpg'
              />
              <CardContent>
                <Typography gutterBottom>English For Business is a 100 hours digital learning course that allows to access top profiency in English in any professional situation.</Typography>
                <div className={classes.issuer}>
                  <Chip
                    label='SEAMEO-INNOTECH'
                    variant='outlined'
                    align='center'
                  />
                </div>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton>
                  <CloudDownload color='primary' />
                </IconButton>
                <IconButton>
                  <Share color='primary' />
                </IconButton>
                <IconButton classes={{ root: classes.expand }}>
                  <Delete color='secondary' />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
