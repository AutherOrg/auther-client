import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Button,
  Card, CardHeader, CardContent, CardActions,
  Grid,
  List, ListItem, ListItemText,
  Typography
} from '@material-ui/core'
import { CloudDownload } from '@material-ui/icons'

import sourceActions from '../../actions/source.actions'

export default function RecipientsFromSource () {
  const dispatch = useDispatch()
  const sourceReducer = useSelector(state => state.sourceReducer)
  const source = process.env.REACT_APP_SOURCE

  React.useEffect(() => {
    dispatch(sourceActions.reset())
  }, [dispatch])

  if (!source) {
    return null
  }

  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader title='Source API method' avatar={<CloudDownload />} />
        <CardContent>
          {sourceReducer.batches.length > 0 && (
            <>
              <Typography>Select the batch:</Typography>
              <List>
                {sourceReducer.batches.map((batch, index) => (
                  <ListItem
                    key={index}
                    onClick={() => dispatch(sourceActions.getBatch(batch.id))}
                    button
                  >
                    <ListItemText
                      primary={`ID: ${batch.id}`}
                    />
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </CardContent>
        <CardActions>
          {sourceReducer.batches.length === 0 && (
            <Button
              onClick={() => dispatch(sourceActions.getBatches())}
              startIcon={<CloudDownload />}
              color='primary'
            >
              Get recipients lists from the Source API
            </Button>
          )}
        </CardActions>
      </Card>
    </Grid>
  )
}
