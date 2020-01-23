import db from '../../providers/dexie/db.dexie'

const getAll = async () => {
  try {
    const certificates = await db.table('certificates').toArray()
    return certificates
  } catch (e) {
    return e
  }
}

export default {
  getAll
}
