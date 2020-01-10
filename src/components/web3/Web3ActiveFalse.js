import React from 'react'
import {
  Card, CardHeader, CardContent,
  Typography
} from '@material-ui/core'

export default () => {
  return (
    <Card>
      <CardHeader title='Ethereum wallet authorization' />
      <CardContent>
        <Typography>
          Please log in your Ethereum wallet and authorize this application.
        </Typography>
      </CardContent>
    </Card>
  )
}
