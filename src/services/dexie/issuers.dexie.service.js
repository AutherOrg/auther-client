import db from '../../providers/dexie/db.dexie'

const create = async issuer => {
  try {
    return await db.issuers.add(issuer)
  } catch (e) {
    return e
  }
}

const getOne = async id => {
  try {
    return await db.issuers.where({ id }).first()
  } catch (e) {
    return e
  }
}

const update = async (id, issuer) => {
  try {
    return await db.issuers.update(id, issuer)
  } catch (e) {
    return e
  }
}

export default {
  create,
  getOne,
  update
}
