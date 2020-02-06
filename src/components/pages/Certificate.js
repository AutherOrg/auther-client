import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import downloadjs from 'downloadjs'
import {
  Button,
  Card, CardHeader, CardContent, CardActions,
  Grid,
  Typography
} from '@material-ui/core'
import { Assignment, Check, CloudDownload, Close, Delete, Link, Share } from '@material-ui/icons'

import certificateActions from '../../actions/certificate.actions'
import confirmationActions from '../../actions/confirmation.actions'
import constants from '../../constants/certificates.constants'
import ConfirmationDialog from '../organisms/ConfirmationDialog'

export default function MyCertificate ({ match }) {
  const dispatch = useDispatch()
  const reducer = useSelector(state => state.certificateReducer)
  const [copied, setCopied] = React.useState(null)

  const handleShare = () => {
    const newStatus = reducer.status === constants.STATUS.NOT_SHARED ? constants.STATUS.SHARED : constants.STATUS.NOT_SHARED
    dispatch(certificateActions.update(reducer.id, {
      status: newStatus
    }))
  }

  const handleDownload = () => {
    const stringified = JSON.stringify(reducer.json)
    downloadjs(stringified, `${reducer.json.badge.name}.json`, 'text/plain')
  }

  const handleCopied = () => {
    setCopied(true)
    setTimeout(
      () => {
        setCopied(false)
      }, 3000
    )
  }

  React.useEffect(() => {
    dispatch(certificateActions.get(match.params.id))
  }, [dispatch, match.params.id])

  if (reducer.id === 0) {
    return null
  }

  return (
    <>
      <Grid container spacing={5} justify='center'>
        <Grid item xs={6}>
          <div dangerouslySetInnerHTML={{ __html: reducer.json.displayHtml }} />
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Card>
                <CardHeader title='Actions' />
                <CardActions>
                  <Button
                    startIcon={<Share />}
                    color='primary'
                    onClick={() => handleShare()}
                  >
                    {reducer.status === constants.STATUS.NOT_SHARED ? 'Share' : 'Unshare'}
                  </Button>
                  <Button
                    onClick={() => handleDownload()}
                    startIcon={<CloudDownload />}
                    color='primary'
                  >
                    Download
                  </Button>
                  <Button
                    onClick={() => dispatch(confirmationActions.create('Delete certificate and all its data? Recovery will be impossible.'))}
                    startIcon={<Delete />}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            {reducer.status === constants.STATUS.SHARED && (
              <Grid item xs={12}>
                <Card>
                  <CardHeader title='Sharing' />
                  <CardContent>
                    <Typography>
                      The sharing of this certificate is enabled! You can now send the sharing link to any of your contacts.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      href={`/certificates/shared/${reducer.uuid}`}
                      target='shared'
                      rel='noopener noreferrer'
                      startIcon={<Link />}
                      color='primary'
                    >
                      Open the sharing link
                    </Button>
                    <CopyToClipboard
                      text={`${window.location.origin}/certificates/shared/${reducer.uuid}`}
                      onCopy={() => handleCopied()}
                    >
                      <Button
                        disabled={copied}
                        startIcon={<Assignment />}
                        color='primary'
                      >
                        {copied ? 'Link copied to clipboard' : 'Copy the sharing link'}
                      </Button>
                    </CopyToClipboard>
                  </CardActions>
                </Card>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
      <ConfirmationDialog
        actions={
          <>
            <Button
              onClick={() => dispatch(confirmationActions.reset())}
              startIcon={<Close />}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                dispatch(certificateActions.destroy(reducer.id))
              }}
              startIcon={<Check />}
              color='primary'
            >
              Delete
            </Button>
          </>
        }
      />
    </>
  )
}
