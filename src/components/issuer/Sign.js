import React from 'react'
import { useWeb3React } from '@web3-react/core'
import {
  Button,
  Card, CardHeader, CardContent, CardActions,
  TextField
} from '@material-ui/core'

const BURN_ADDRESS = '0xdeaddeaddeaddeaddeaddeaddeaddeaddeaddead'
const GAS_LIMIT = 25000

export default () => {
  const [values, setValues] = React.useState({
    merkleRoot: ''
  })

  const context = useWeb3React()
  console.log(context)
  const { account, library } = context

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const handleSubmit = () => {
    const tx = {
      to: BURN_ADDRESS,
      gasLimit: GAS_LIMIT,
      data: '0x' + values.merkleRoot
    }
    library
      .getSigner(account)
      .sendTransaction(tx)
      .then(signature => {
        console.log(signature)
      })
      .catch(error => {
        console.error(error)
      })
  }

  return (
    <Card>
      <CardHeader title='Sign certificates batch' />
      <CardContent>
        <form noValidate autoComplete='off'>
          <TextField
            id='merkleRoot'
            label='Merkle root'
            value={values.merkleRoot}
            onChange={handleChange('merkleRoot')}
            fullWidth
          />
        </form>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => handleSubmit()}
          variant='contained'
          color='primary'
        >
          Sign certificates batch
        </Button>
      </CardActions>
    </Card>
  )
}
