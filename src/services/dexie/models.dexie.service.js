import db from '../../providers/dexie/db.dexie'

const create = async model => {
  try {
    return await db.models.add(model)
  } catch (e) {
    return e
  }
}

const getAll = async () => {
  try {
    return await db.models.toArray()
  } catch (e) {
    return e
  }
}

const getOne = async id => {
  try {
    return await db.models.get(Number(id))
  } catch (e) {
    return e
  }
}

const destroy = async id => {
  try {
    return await db.models.delete(Number(id))
  } catch (e) {
    return e
  }
}

const update = async (id, model) => {
  try {
    return await db.models.update(id, model)
  } catch (e) {
    return e
  }
}

export default {
  create,
  destroy,
  getAll,
  getOne,
  update
}
