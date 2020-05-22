import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import slugify from 'slugify'
import { saveAs } from 'file-saver'
import ReactToPrint from 'react-to-print'
import { QRCode } from 'react-qr-svg'
import {
  Button,
  Card, CardHeader, CardContent, CardActions,
  Grid,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Assignment, Check, CloudDownload, Close, Delete, Link, LinkedIn, Print, Share } from '@material-ui/icons'

import certificateActions from '../../actions/certificate.actions'
import confirmationActions from '../../actions/confirmation.actions'
import constants from '../../constants/certificates.constants'
import ConfirmationDialog from '../organisms/ConfirmationDialog'

const useStyles = makeStyles(theme => ({
  certificateView: {
    marginTop: '50px',
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
  const componentRef = React.useRef()

  React.useEffect(() => {
    dispatch(certificateActions.get(match.params.id))
  }, [dispatch, match.params.id])

  const handleShare = () => {
    const newStatus = reducer.status === constants.STATUS.NOT_SHARED ? constants.STATUS.SHARED : constants.STATUS.NOT_SHARED
    dispatch(certificateActions.update(reducer.id, {
      status: newStatus
    }))
  }
  const handleDownload = certificate => {
    saveAs(
      new window.Blob([JSON.stringify(certificate)], { type: 'application/json;charset=utf-8' }),
      slugify(`${certificate.badge.name} ${certificate.recipientProfile.name}.json`)
    )
  }
  const handleCopied = () => {
    setCopied(true)
    setTimeout(
      () => {
        setCopied(false)
      }, 3000
    )
  }

  if (reducer.id === 0) {
    return null
  }

  return (
    <>
      <Grid container spacing={5} justify='center'>
        <Grid item xs={12} lg={6}>
          <div ref={componentRef}>
            <div style={JSON.parse(process.env.REACT_APP_PRINT_WRAPPER_STYLE)}>
              <div dangerouslySetInnerHTML={{ __html: reducer.json.displayHtml.replace(/(<? *script)/gi, 'illegalscript') }} />
              {reducer.status === constants.STATUS.SHARED && (
                <div className={classes.certificateView}>
                  <Typography variant='caption'>
                    To verify this certificate, scan this QR code or go to:
                  </Typography>
                  <Typography variant='caption' paragraph>
                    {`${window.location.origin}/certificates/shared/${reducer.sharingUuid}`}
                  </Typography>
                  <QRCode
                    bgColor='#FFFFFF'
                    fgColor='#000000'
                    level='Q'
                    style={{ width: 100 }}
                    value={`${window.location.origin}/certificates/shared/${reducer.sharingUuid}`}
                  />
                </div>
              )}
            </div>
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
                    onClick={() => handleDownload(reducer.json)}
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
                    <Typography paragraph>
                      To add in on LinkedIn, click "Copy link" and then "Add to LinkedIn". In the last line (with URL) you must paste this link. Then you just need to add the certificate name and select the issuer organization (first 2 fields.)
                    </Typography>
                    <Typography>
                      You can also print your certificate with a verification link and QR code.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      href={`/certificates/shared/${reducer.sharingUuid}`}
                      target='shared'
                      rel='noopener noreferrer'
                      startIcon={<Link />}
                      color='primary'
                    >
                      Open link
                    </Button>
                    <CopyToClipboard
                      text={`${window.location.origin}/certificates/shared/${reducer.sharingUuid}`}
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
                    <Button
                      href='https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME'
                      target='linkedin'
                      rel='noopener noreferrer'
                      startIcon={<LinkedIn />}
                      color='primary'
                    >
                      Add on LinkedIn
                    </Button>
                    <ReactToPrint
                      trigger={() => (
                        <Button
                          startIcon={<Print />}
                          color='primary'
                        >
                          Print
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
