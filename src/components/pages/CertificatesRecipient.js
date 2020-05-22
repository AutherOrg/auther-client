import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import {
  Card, CardHeader, CardContent,
  Grid,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import actions from '../../actions/certificates.actions'

const useStyles = makeStyles(theme => ({
  cardRoot: {
    '&:hover': {
      cursor: 'pointer'
    }
  },
  image: {
    width: '100%',
    height: 'auto'
  }
}))

export default function CertificatesRecipient () {
  const classes = useStyles()
  const dispatch = useDispatch()
  const certificatesReducer = useSelector(state => state.certificatesReducer)
  const [raised, setRaised] = React.useState(null)

  React.useEffect(() => {
    dispatch(actions.getMany({ onlyMine: true }))
  }, [dispatch])

  return (
    <Grid container spacing={5} justify='center'>
      <Grid item xs={12} align='center'>
        <Typography variant='h1' gutterBottom>My certificates</Typography>
      </Grid>
      {certificatesReducer.certificates.map((certificate, index) => (
        <Grid item xs={12} lg={3} key={index}>
          <Card
            onClick={() => dispatch(push(`/certificates/${certificate.id}`))}
            onMouseOver={() => setRaised(index)}
            onMouseOut={() => setRaised(null)}
            raised={raised === index}
            classes={{ root: classes.cardRoot }}
          >
            <CardHeader title={certificate.json.badge.name} />
            <div>
              <img
                src={certificate.json.badge.image}
                alt={certificate.json.badge.name}
                className={classes.image}
              />
            </div>
            <CardContent>
              <Typography>{certificate.json.badge.issuer.name}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
