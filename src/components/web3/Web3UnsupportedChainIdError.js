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
          {`Please switch to the ${process.env.REACT_APP_ETHEREUM_NETWORK} network in your Ethereum wallet.`}
        </Typography>
      </CardContent>
    </Card>
  )
}
