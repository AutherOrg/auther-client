import db from '../../providers/dexie/db.dexie'

const create = async (batch) => {
  try {
    const result = await db.batches.add(batch)
    return result
  } catch (e) {
    return e
  }
}

const getAll = async () => {
  try {
    const batches = await db.table('batches').toArray()
    return []
  } catch (e) {
    return e
  }
}

export default {
  create,
  getAll
}
