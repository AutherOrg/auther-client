import { useIndexedDB } from 'react-indexed-db'

const getAll = async () => {
  try {
    const { getAll } = useIndexedDB('batches')
    const certificates = await getAll()
    return certificates
  } catch (e) {
    return e
  }
}

export default {
  getAll
}
