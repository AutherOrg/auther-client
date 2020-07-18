import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { CopyToClipboard } from 'react-copy-to-clipboard'
import slugify from 'slugify'
import { saveAs } from 'file-saver'
// import ReactToPrint from 'react-to-print'
// import { QRCode } from 'react-qr-svg'
import {
  Button,
  Card, CardHeader, CardActions,
  Grid
} from '@material-ui/core'
import { Email } from '@material-ui/icons'
// import {
//   Button,
//   Card, CardHeader, CardActions,
//   Grid,
//   Typography
// } from '@material-ui/core'
// import { makeStyles } from '@material-ui/core/styles'
// import { AddCircle, Assignment, CloudDownload, Link, Print, RemoveCircle } from '@material-ui/icons'
import { AddCircle, CloudDownload, Link, PictureAsPdf, RemoveCircle } from '@material-ui/icons'

import certificateActions from '../../actions/certificate.actions'
import revocationsActions from '../../actions/revocations.actions'
import constants from '../../constants/certificates.constants'

// const useStyles = makeStyles(theme => ({
//   certificateView: {
//     marginTop: '50px',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center'
//   }
// }))

export default function CertificateRecipient ({ match }) {
  // const classes = useStyles()
  const dispatch = useDispatch()
  const reducer = useSelector(state => state.certificateReducer)
  const revocationsReducer = useSelector(state => state.revocationsReducer)
  // const [copied, setCopied] = React.useState(null)
  const componentRef = React.useRef()

  React.useEffect(() => {
    dispatch(certificateActions.get(match.params.id))
    dispatch(revocationsActions.getMany())
  }, [dispatch, match.params.id])

  const handleDownload = certificate => {
    saveAs(
      new window.Blob([JSON.stringify(certificate)], { type: 'application/json;charset=utf-8' }),
      slugify(`${certificate.badge.name} ${certificate.recipientProfile.name}.json`)
    )
  }
  // const handleCopied = () => {
  //   setCopied(true)
  //   setTimeout(
  //     () => {
  //       setCopied(false)
  //     }, 3000
  //   )
  // }
  const isRevoked = id => {
    return revocationsReducer.revocations.findIndex(e => e.certificateId === id) > -1
  }
  const handleRevoke = id => {
    dispatch(revocationsActions.create({
      certificateId: id
    }))
  }
  const handleUnrevoke = id => {
    const revocation = revocationsReducer.revocations.find(e => e.certificateId === id)
    if (revocation) {
      dispatch(revocationsActions.destroy(revocation.id))
    }
  }
  const handleResendEmail = id => {
    dispatch(certificateActions.reSendEmail(id))
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
              {/* {reducer.status === constants.STATUS.SHARED && (
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
              )} */}
            </div>
          </div>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Card>
                <CardHeader title='Actions' />
                <CardActions>
                  {
                    isRevoked(reducer.id)
                      ? (
                        <Button
                          onClick={() => handleUnrevoke(reducer.id)}
                          startIcon={<AddCircle />}
                          color='primary'
                        >
                          Unrevoke
                        </Button>
                      )
                      : (
                        <Button
                          onClick={() => handleRevoke(reducer.id)}
                          startIcon={<RemoveCircle />}
                          color='primary'
                        >
                          Revoke
                        </Button>
                      )
                  }
                  <Button
                    onClick={() => handleResendEmail(reducer.id)}
                    startIcon={<Email />}
                    color='primary'
                  >
                    Resend email
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardHeader title='Certificate' />
                <CardActions>
                  <Button
                    onClick={() => handleDownload(reducer.json)}
                    startIcon={<CloudDownload />}
                    color='primary'
                  >
                    Download
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            {reducer.status === constants.STATUS.SHARED && (
              <Grid item xs={12}>
                <Card>
                  <CardHeader title='Sharing' />
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
                    <Button
                      href={reducer.pdf}
                      download={slugify(`${reducer.json.badge.name} ${reducer.json.recipientProfile.name}.pdf`)}
                      target='pdf'
                      rel='noopener noreferrer'
                      startIcon={<PictureAsPdf />}
                      color='primary'
                    >
                      PDF version
                    </Button>
                    {/* <CopyToClipboard
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
                    /> */}
                  </CardActions>
                </Card>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
