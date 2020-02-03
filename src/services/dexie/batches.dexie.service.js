import db from '../../providers/dexie/db.dexie'

const create = async (batch) => {
  try {
    return await db.batches.add(batch)
  } catch (e) {
    return e
  }
}

const destroy = async id => {
  try {
    return await db.batches.delete(Number(id))
  } catch (e) {
    return e
  }
}

const getAll = async () => {
  try {
    return await db.batches.toArray()
  } catch (e) {
    return e
  }
}

export default {
  create,
  destroy,
  getAll
}
