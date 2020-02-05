import db from '../../providers/dexie/db.dexie'

const getAll = async () => {
  try {
    return await db.certificates.toArray()
  } catch (e) {
    return e
  }
}

const getOne = async id => {
  try {
    return await db.certificates.get(Number(id))
  } catch (e) {
    return e
  }
}

export default {
  getAll,
  getOne
}
