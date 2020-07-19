import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { CopyToClipboard } from 'react-copy-to-clipboard'
import slugify from 'slugify'
import { saveAs } from 'file-saver'
import {
  Button,
  Card, CardHeader, CardActions,
  Grid
} from '@material-ui/core'
import { Check, CloudDownload, Close, Delete, Link, LinkedIn, PictureAsPdf, Share } from '@material-ui/icons'

import certificateActions from '../../actions/certificate.actions'
import confirmationActions from '../../actions/confirmation.actions'
import constants from '../../constants/certificates.constants'
import ConfirmationDialog from '../organisms/ConfirmationDialog'

export default function CertificateRecipient ({ match }) {
  const dispatch = useDispatch()
  const reducer = useSelector(state => state.certificateReducer)
  // const [copied, setCopied] = React.useState(null)
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
  const handleDownloadJson = json => {
    saveAs(
      new window.Blob([JSON.stringify(json)], { type: 'application/json;charset=utf-8' }),
      slugify(`${json.badge.name} ${json.recipientProfile.name}.json`)
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

  if (reducer.id === 0) {
    return null
  }

  return (
    <>
      <Grid container spacing={5} justify='center'>
        <Grid item xs={12} lg={8}>
          <div ref={componentRef}>
            <div dangerouslySetInnerHTML={{ __html: reducer.json.displayHtml.replace(/(<? *script)/gi, 'illegalscript') }} />
          </div>
        </Grid>
        <Grid item xs={12} lg={4}>
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
                    onClick={() => handleDownloadJson(reducer.json)}
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
                  <CardActions>
                    <Button
                      href={`/certificates/shared/${reducer.sharingUuid}`}
                      target='shared'
                      rel='noopener noreferrer'
                      startIcon={<Link />}
                      color='primary'
                    >
                      Sharing link
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
                        {copied ? 'Sharing link copied' : 'Copy sharing link'}
                      </Button>
                    </CopyToClipboard> */}
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
                    <Button
                      href='https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME'
                      target='linkedin'
                      rel='noopener noreferrer'
                      startIcon={<LinkedIn />}
                      color='primary'
                    >
                      Add on LinkedIn
                    </Button>
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
