import React from 'react'
import { Typography, CircularProgress } from '@material-ui/core'
import { Certificate, createBatch } from 'blockcerts-issuer-helper'

export default () => {
  const [batch, setBatch] = React.useState(null)

  React.useEffect(() => {
    const certificate = new Certificate({
      recipient: {
        identity: 'alice@example.org'
      },
      badge: {
        name: 'Certificate #1',
        description: 'Fictional University delivers this Computer Science MS Degree.',
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
        criteria: {
          narrative: 'Fictional University delivers this Computer Science MS Degree.'
        },
        issuer: {
          id: 'https://raw.githubusercontent.com/guix77/blockcerts-certificates/master/ethereum/ropsten/issuers/fictionaluniversity/issuer.json',
          name: 'Fictional University',
          url: 'https://raw.githubusercontent.com/guix77/blockcerts-certificates/master/ethereum/ropsten/issuers/fictionaluniversity/www.md',
          email: 'fictionaluniversity@example.org',
          description: 'The Fictional University is a fictional university.',
          image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
        },
        signatureLines: {
          jobTitle: 'President',
          image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
        }
      },
      recipientProfile: {
        name: 'Alice'
      },
      displayHtml: '<h1>Computer Science MS Degree, Fictional University</h1>'
    })
    const doCreatebatch = async () => {
      const batch = await createBatch([certificate], { validate: true })
      setBatch(batch)
    }
    doCreatebatch()
  }, [])

  if (!batch) {
    return <CircularProgress />
  }

  return (
    <Typography>
      {batch.merkleTreeRoot}
    </Typography>
  )
}
