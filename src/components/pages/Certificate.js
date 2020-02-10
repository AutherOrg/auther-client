import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import downloadjs from 'downloadjs'
import ReactToPrint from 'react-to-print'
import { QRCode } from 'react-qr-svg'
import {
  Button,
  Card, CardHeader, CardContent, CardActions,
  Grid,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Assignment, Check, CloudDownload, Close, Delete, Link, Print, Share } from '@material-ui/icons'

import certificateActions from '../../actions/certificate.actions'
import confirmationActions from '../../actions/confirmation.actions'
import constants from '../../constants/certificates.constants'
import ConfirmationDialog from '../organisms/ConfirmationDialog'

const useStyles = makeStyles(theme => ({
  certificateView: {
    marginTop: '100px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}))

export default function Certificate ({ match }) {
  const classes = useStyles()
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
  const componentRef = React.useRef()

  React.useEffect(() => {
    dispatch(certificateActions.get(match.params.id))
  }, [dispatch, match.params.id])

  if (reducer.id === 0) {
    return null
  }

  return (
    <>
      <Grid container spacing={5} justify='center'>
        <Grid item xs={12} lg={6}>
          <div ref={componentRef}>
            <div dangerouslySetInnerHTML={{ __html: reducer.json.displayHtml.replace(/(<? *script)/gi, 'illegalscript') }} />
            {reducer.status === constants.STATUS.SHARED && (
              <div className={classes.certificateView}>
                <Typography variant='h6'>
                  Certificate verification
                </Typography>
                <Typography variant='caption'>
                  To verify this certificate, scan this QR code or go to:
                </Typography>
                <Typography variant='caption' paragraph>
                  {`${window.location.origin}/certificates/shared/${reducer.uuid}`}
                </Typography>
                <QRCode
                  bgColor='#FFFFFF'
                  fgColor='#000000'
                  level='Q'
                  style={{ width: 256 }}
                  value={`${window.location.origin}/certificates/shared/${reducer.uuid}`}
                />
              </div>
            )}
          </div>
        </Grid>
        <Grid item xs={12} lg={6}>
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
                    <Typography paragraph>
                      The sharing of this certificate is enabled!
                    </Typography>
                    <Typography paragraph>
                      You can now send the sharing link to any of your contacts.
                    </Typography>
                    <Typography>
                      You can also print your certificate with a verification link and QR code.
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
                      Open link
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
                        {copied ? 'Link copied' : 'Copy link'}
                      </Button>
                    </CopyToClipboard>
                    <ReactToPrint
                      trigger={() => (
                        <Button
                          startIcon={<Print />}
                          color='primary'
                        >
                          Print with QR code and link
                        </Button>
                      )}
                      content={() => componentRef.current}
                    />
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
