import React from 'react'
import {
  Card, CardHeader, CardContent,
  Typography
} from '@material-ui/core'

export default () => {
  return (
    <Card>
      <CardHeader title='Unsupported Ethereum network' />
      <CardContent>
        <Typography>
          This application only works on Mainnet and Ropsten. Please switch to one of these networks in your Ethereum wallet.
        </Typography>
      </CardContent>
    </Card>
  )
}
