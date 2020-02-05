import db from '../../providers/dexie/db.dexie'

const create = async revoked => {
  try {
    return await db.revoked.add(revoked)
  } catch (e) {
    return e
  }
}

const destroy = async id => {
  try {
    return await db.revoked.delete(Number(id))
  } catch (e) {
    return e
  }
}

const get = async () => {
  try {
    return await db.revoked.toArray()
  } catch (e) {
    return e
  }
}

export default {
  create,
  destroy,
  get
}
