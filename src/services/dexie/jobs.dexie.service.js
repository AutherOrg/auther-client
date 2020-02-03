import db from '../../providers/dexie/db.dexie'

const create = async job => {
  try {
    return await db.jobs.add(job)
  } catch (e) {
    return e
  }
}

const destroy = async id => {
  try {
    return await db.jobs.delete(Number(id))
  } catch (e) {
    return e
  }
}

const get = async () => {
  try {
    return await db.jobs.toArray()
  } catch (e) {
    return e
  }
}

export default {
  create,
  destroy,
  get
}
