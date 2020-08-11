import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  CircularProgress,
  Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { CloudUpload } from '@material-ui/icons'

import actions from '../../actions/jobs.actions'

const useStyles = makeStyles(theme => ({
  dialogContentRoot: {
    marginTop: theme.spacing(1),
    textAlign: 'center'
  },
  dialogContentTextRoot: {
    wordWrap: 'break-word'
  }
}))

export default function JobsDialog () {
  const classes = useStyles()
  const dispatch = useDispatch()
  const jobsReducer = useSelector(state => state.jobsReducer)

  React.useEffect(() => {
    dispatch(actions.get())
  }, [dispatch])

  return (
    <Dialog open={jobsReducer.jobs.length > 0}>
      <DialogTitle>Queued jobs</DialogTitle>
      <DialogContent classes={{ root: classes.dialogContentRoot }}>
        <DialogContentText>
          {`${jobsReducer.jobs.length} remaining jobs.`}
        </DialogContentText>
        {jobsReducer.isRunning && (
          <CircularProgress />
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => dispatch(actions.runJobs(jobsReducer.jobs))}
          startIcon={<CloudUpload />}
          color='primary'
          disabled={jobsReducer.isRunning}
        >
          Launch jobs
        </Button>
      </DialogActions>
    </Dialog>
  )
}
