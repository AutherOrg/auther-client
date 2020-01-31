import db from '../../providers/dexie/db.dexie'

const create = async model => {
  try {
    return await db.certificateModels.add(model)
  } catch (e) {
    return e
  }
}

const getAll = async () => {
  try {
    return await db.table('certificateModels').toArray()
  } catch (e) {
    return e
  }
}

const getOne = async id => {
  try {
    return await db.certificateModels.where({ id }).first()
  } catch (e) {
    return e
  }
}

const update = async (id, model) => {
  try {
    return await db.certificateModels.update(id, model)
  } catch (e) {
    return e
  }
}

export default {
  create,
  getAll,
  getOne,
  update
}
