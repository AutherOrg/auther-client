import React from 'react'
import { Certificate } from 'cert-verifier-js'
import {
  Button,
  Card, CardContent,
  CircularProgress,
  Dialog, DialogContent, DialogActions,
  ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails,
  IconButton,
  List, ListItem, ListItemText, ListItemSecondaryAction,
  Grid,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Check, Error, ExpandMore, Link, Warning } from '@material-ui/icons'

import blockcertsLogo from '../../assets/images/blockcertsLogo'

const useStyles = makeStyles(theme => ({
  certificateCardContentRoot: {
    padding: 0
  },
  listRoot: {
    marginTop: theme.spacing(8)
  },
  logo: {
    textAlign: 'center',
    marginBottom: theme.spacing(8)
  },
  stepperRoot: {
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: '#02112a',
    textAlign: 'center'
  },
  step: {
    color: '#ffffff !important'
  },
  text: {
    color: '#ffffff'
  },
  textCenter: {
    color: '#ffffff',
    textAlign: 'center'
  },
  blockcertsInfos: {
    border: '2px solid #ffffff',
    padding: theme.spacing(2)
  },
  verificationResult: {
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: theme.spacing(4)
  },
  verificationResultCaption: {
    color: '#ffffff',
    display: 'block',
    wordWrap: 'break-word'
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4)
  },
  buttonOutlined: {
    borderColor: '#ffffff',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)'
    },
    marginBottom: theme.spacing(2)
  },
  buttonIcon: {
    marginRight: theme.spacing(1)
  },
  dialogContentRoot: {
    textAlign: 'justify'
  },
  reactJson: {
    marginBottom: theme.spacing(1)
  },
  expansionPanelDetailsRoot: {
    display: 'block'
  },
  buttonMargin: {
    marginBottom: theme.spacing(2)
  },
  blockcertsRoot: {
    backgroundColor: '#02112a'
  }
}))

export default function Blockcerts ({ src }) {
  const classes = useStyles()
  const initialState = {
    certificate: null,
    dialogOpen: false,
    error: null,
    verificationLaunched: false,
    verificationResult: null,
    verificationStep: null,
    verificationSteps: []
  }
  const [values, setValues] = React.useState(initialState)
  const handleDialog = () => {
    const dialogOpen = !values.dialogOpen
    setValues({ ...values, dialogOpen })
  }
  const handleVerifyCertificate = async () => {
    setValues({ ...values, verificationLaunched: true })
    const certificate = await new Certificate(src)
    try {
      const verificationResult = await certificate.verify(({ code, label, status, errorMessage }) => {
        if (status !== 'starting') {
          const verificationSteps = values.verificationSteps
          verificationSteps.push({ code, label, status, errorMessage })
          const verificationStep = verificationSteps.length - 1
          setValues({ ...values, verificationStep, verificationSteps })
        }
        console.log({ code, label, status, errorMessage })
      })
      if (verificationResult.status === 'success') {
        setValues({ ...values, verificationStep: 999 })
      }
      setValues({ ...values, verificationResult })
    } catch (e) {
      setValues({ ...values, error: e.message })
    }
  }
  React.useEffect(
    () => {
      handleVerifyCertificate()
    },
    // eslint-disable-next-line
    []
  )

  if (values.error) {
    return (
      <Typography color='error'>
        {values.error}
      </Typography>
    )
  }

  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={12} md={9}>
          <Card>
            <CardContent classes={{ root: classes.certificateCardContentRoot }}>
              {src.displayHtml && <div dangerouslySetInnerHTML={{ __html: src.displayHtml.replace(/(<? *script)/gi, 'illegalscript') }} />}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card classes={{ root: classes.blockcertsRoot }}>
            <CardContent>
              <div className={classes.logo}>
                <img src={blockcertsLogo} alt='Blockcerts' />
              </div>
              <div className={classes.blockcertsInfos}>
                {
                  values.verificationResult
                    ? values.verificationResult.status === 'success'
                      ? (
                        <>
                          <Typography variant='h3' classes={{ root: classes.verificationResult }}>
                            Valid <Check fontSize='large' />
                          </Typography>
                          <Typography variant='h6' classes={{ root: classes.textCenter }}>Issuer</Typography>
                          <Typography paragraph classes={{ root: classes.textCenter }}>{src.badge.issuer.name}</Typography>
                          <Typography variant='h6' classes={{ root: classes.textCenter }}>Recipient</Typography>
                          <Typography paragraph classes={{ root: classes.textCenter }}>{src.recipientProfile.name}</Typography>
                          <Typography variant='h6' classes={{ root: classes.textCenter }}>Date</Typography>
                          <Typography paragraph classes={{ root: classes.textCenter }}>{src.issuedOn}</Typography>
                        </>
                      )
                      : (
                        <Typography variant='h3' classes={{ root: classes.verificationResult }}>
                          Invalid <Warning fontSize='large' />
                        </Typography>
                      )
                    : (
                      <Typography variant='h3' classes={{ root: classes.verificationResult }}>
                        Verifying <CircularProgress size={30} classes={{ root: classes.text }} />
                      </Typography>
                    )
                }
              </div>
              <List dense classes={{ root: classes.listRoot }}>
                {values.verificationSteps.map((step, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={step.label} classes={{ root: classes.text }} />
                    <ListItemSecondaryAction>
                      <IconButton edge='end' classes={{ root: classes.text }}>
                        {step.status === 'failure' && <Error />}
                        {step.status === 'success' && <Check />}
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
              <div className={classes.buttons}>
                <Button
                  onClick={() => handleDialog()}
                  color='inherit'
                  size='small'
                  variant='outlined'
                  classes={{
                    label: classes.text,
                    outlined: classes.buttonOutlined
                  }}
                >
                  Explanation
                </Button>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {
        values.verificationResult && (
          <Dialog
            open={values.dialogOpen}
            onClose={() => handleDialog()}
            fullWidth
            maxWidth='md'
          >
            <DialogContent classes={{ root: classes.dialogContentRoot }}>
              <Typography variant='h4' gutterBottom paragraph>Is this certificate really valid?</Typography>
              <Typography gutterBottom paragraph>First, is there a check after eeach verification step?</Typography>
              <Typography gutterBottom paragraph>{`Then you have to check that the following URL is really hosted on the official Issuer's website: ${src.badge.issuer.id}`}</Typography>
              <Typography gutterBottom paragraph>{`Finally you also have to decide if the current website can be trusted (it's not necessarly the same as the one above): ${window.location.origin}`}</Typography>
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                  <Typography>I want to know more!</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails classes={{ root: classes.expansionPanelDetailsRoot }}>
                  <Typography variant='h4' gutterBottom paragraph>The verification process</Typography>
                  <Typography gutterBottom paragraph>Let's display again the verification steps:</Typography>
                  <List dense>
                    {values.verificationSteps.map((step, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={step.label} />
                        <ListItemSecondaryAction>
                          <IconButton edge='end'>
                            {step.status === 'failure' && <Error />}
                            {step.status === 'success' && <Check />}
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                  <Typography gutterBottom paragraph>Not so easy, right? Let's try to explain this easily.</Typography>
                  <Typography variant='h5' gutterBottom paragraph>The transaction</Typography>
                  <Typography gutterBottom paragraph>Any action on any blockchain is executed by submitting a transaction. In this case, the Issuer signed a transaction to certify this certificate and we need to check if this transaction exists to validate the certificate.</Typography>
                  <Typography variant='h5' gutterBottom paragraph>The identity problem on the blockchain</Typography>
                  <Typography gutterBottom paragraph>So the Issuer, a university for instance, could just have an account on the blockchain, and add certificates. The problem is in most blockchains, accounts are anonymous. We can only know that a certain "strange" address like 0xabcd... did something on the blockchain, but not know who it is. That's why all Issuers must declare their official blockchain address on their official website, so it can be later verified that the address that signed this transaction belongs to the university. This is what we call the "Issuer profile".</Typography>
                  <Typography gutterBottom paragraph>{`This certificate Issuer profile URL is ${src.badge.issuer.id}`}</Typography>
                  <Button
                    href={src.badge.issuer.id}
                    target='issuer'
                    rel='noopener noreferrer'
                    startIcon={<Link />}
                    color='primary'
                    className={classes.buttonMargin}
                  >
                    Click to open Issuer profile URL and see its content.
                  </Button>
                  <Typography gutterBottom paragraph>If you clicked, notice the "publicKey": it's the blockchain address of the Issuer!</Typography>
                  <Typography gutterBottom paragraph>Unfortunately, currently, there is a weakness in the Blockcerts 2.0 standard that can be exploited by a hacker to pretend to be an Issuer that she / he IS NOT, in hosting a fake Issuer profile on his own server. That's why we asked you to check that this URL is really on the official Issuer's website. There are very interesting projects currently trying to fix that issue in a near future, but so far it's not yet fixed.</Typography>
                  <Typography variant='h5' gutterBottom paragraph>The data problem on the blockchain</Typography>
                  <Typography gutterBottom paragraph>So now that the identity problem is solved, let's just add the certificate on the blockchain, right? Well, it's not that simple. Writing data on blockchain is extremely expensive, and on the Bitcoin blockchain, not even possible for complex data such as certificates. So instead of storing all the certificate data on the blockchain, we just store what we call their "hash" in computer science.</Typography>
                  <Typography gutterBottom paragraph>See the fridge in your kitchen? Instead of certifying all the infinite complex arrangement of atoms it is made of, we just certify its serial number.</Typography>
                  <Typography gutterBottom paragraph>Now it will be possible to check that the hash of this certificate was recorded in the blockchain transaction and therefore, verify the certificate.</Typography>
                  <Typography variant='h5' gutterBottom paragraph>Mass issuance of certificates</Typography>
                  <Typography gutterBottom paragraph>All right, we solved the data problem too, let's store a certificate hash on the blockchain! Well... we could. But what if want to issue a degree to 1000 students? Instead of repeating the process for each student, we would like to issue all those certificates at the same time. To do this, we use a cryptography concept called "Merle tree".</Typography>
                  <Typography gutterBottom paragraph>Picture yourself an oak tree. Instead of certifying each leaf, we can just certify the root of the oak tree. We can later proove that a given leaf belongs to this exact tree, and therefore that this leaf is certified.</Typography>
                  <Typography variant='h5' gutterBottom paragraph>The immutability "problem"</Typography>
                  <Typography gutterBottom paragraph>As if it wasn't complex enough, by blockchain design it is impossible to remove a transaction. So the Issuer can not "unsign" a certificate. Instead, we can use a revocation list and / or expiration dates.</Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => handleDialog()}
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
        )
      }
    </>
  )
}
