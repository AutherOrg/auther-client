import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Grid } from '@material-ui/core'

import actions from '../../actions/certificate.actions'
import Blockcerts from '../organisms/Blockcerts'

export default function Share ({ match }) {
  const dispatch = useDispatch()
  const reducer = useSelector(state => state.certificateReducer)

  React.useEffect(() => {
    dispatch(actions.getShared(match.params.uuid))
  }, [dispatch, match.params.uuid])

  if (reducer.uuid === '') {
    return null
  }

  return (
    <Grid container spacing={5} justify='center'>
      <Grid item xs={12}>
        <Blockcerts src={reducer.json} />
      </Grid>
    </Grid>
  )
}
