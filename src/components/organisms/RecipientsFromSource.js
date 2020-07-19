import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Button,
  Grid
} from '@material-ui/core'
import { Sync } from '@material-ui/icons'

// import batchesActions from '../../actions/batches.actions'
import sourceActions from '../../actions/source.actions'

export default function RecipientsFromSource () {
  const dispatch = useDispatch()
  // const batchesReducer = useSelector(state => state.batchesReducer)
  const sourceReducer = useSelector(state => state.sourceReducer)
  const source = process.env.REACT_APP_SOURCE

  if (!source) {
    return null
  }

  return (
    <Grid item xs={12}>
      {sourceReducer.batches.length > 0 ? (
        <p>yop</p>
      ) : (
        <Button
          onClick={() => dispatch(sourceActions.getBatches())}
          startIcon={<Sync />}
          color='primary'
        >
          Get recipients lists from the Source API
        </Button>
      )}
    </Grid>
  )
}
