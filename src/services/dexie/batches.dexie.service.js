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

const getMany = async () => {
  try {
    return await db.batches.reverse().toArray()
  } catch (e) {
    return e
  }
}

const getOne = async id => {
  try {
    return await db.batches.get(Number(id))
  } catch (e) {
    return e
  }
}

export default {
  create,
  destroy,
  getMany,
  getOne
}
