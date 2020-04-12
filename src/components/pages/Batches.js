import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { formatRelative, fromUnixTime } from 'date-fns'
import Jszip from 'jszip'
import slugify from 'slugify'
import { saveAs } from 'file-saver'
import {
  Button,
  Card, CardHeader, CardContent,
  Fab,
  Grid,
  Table, TableBody, TableCell, TableHead, TableRow,
  Typography
} from '@material-ui/core'
import { Add, CloudDownload, School } from '@material-ui/icons'

import actions from '../../actions/batches.actions'

export default function Batches () {
  const dispatch = useDispatch()
  const batchesReducer = useSelector(state => state.batchesReducer)

  React.useEffect(() => {
    dispatch(actions.get())
  }, [dispatch])

  const handleDownloadCertificates = async batch => {
    const zip = new Jszip()
    const { certificates } = JSON.parse(batch.certificates)
    certificates.forEach((certificate, index) => {
      zip.file(
        slugify(`${certificate.badge.name} ${certificate.recipientProfile.name} ${index}.json`),
        JSON.stringify(certificate)
      )
    })
    const blob = await zip.generateAsync({
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: {
        level: 9
      }
    })
    saveAs(blob, `Certificates in batch ${batch.id}.zip`)
  }

  return (
    <Grid container spacing={5} justify='center'>
      <Grid item xs={12} align='center'>
        <Typography variant='h1' gutterBottom>Batches</Typography>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title='Add new certificates batch'
            avatar={
              <Fab
                onClick={() => dispatch(push('/batches/create'))}
                color='primary'
              >
                <Add />
              </Fab>
            }
          />
          {batchesReducer.batches.length > 0 && (
            <CardContent>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Created</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {batchesReducer.batches.map((batch, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {formatRelative(fromUnixTime(batch.created), new Date())}
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => dispatch(push(`/batches/${batch.id}`))}
                          startIcon={<School />}
                          color='primary'
                        >
                          View
                        </Button>
                        <Button
                          onClick={() => handleDownloadCertificates(batch)}
                          startIcon={<CloudDownload />}
                          color='primary'
                        >
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          )}
        </Card>
      </Grid>
    </Grid>
  )
}
