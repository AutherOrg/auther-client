import React from 'react'
import { Grid } from '@material-ui/core'

import Web3Wrapper from './components/web3/Web3Wrapper'
import Basic from './components/issuer/Basic'
// import Validate from './components/issuer/Validate'
// import Batch from './components/issuer/Batch'
// import Sign from './components/issuer/Sign'

export default () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        {/* <Validate /> */}
        {/* <Batch /> */}
        <Web3Wrapper>
          <Basic />
          {/* <Sign /> */}
        </Web3Wrapper>
      </Grid>
    </Grid>
  )
}
