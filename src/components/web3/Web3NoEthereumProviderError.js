import React from 'react'
import {
  Button,
  Card, CardHeader, CardContent, CardActions,
  Typography
} from '@material-ui/core'
import { Link } from '@material-ui/icons'

export default () => {
  return (
    <Card>
      <CardHeader title='Ethereum connectivity' />
      <CardContent>
        <Typography>
          To access this section, you need to have Ethereum connectivity. For instance, you could download and setup Metamask.
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          href='https://metamask.io/'
          target='metamask'
          rel='noopener noreferrer'
          color='primary'
          variant='contained'
          startIcon={<Link />}
        >
          Metamask
        </Button>
      </CardActions>
    </Card>
  )
}
