import React from 'react'
import { Grid } from '@material-ui/core'

import Web3Wrapper from './components/web3/Web3Wrapper'
import Basic from './components/test/Basic'

export default () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Web3Wrapper>
          <Basic />
        </Web3Wrapper>
      </Grid>
    </Grid>
  )
}
