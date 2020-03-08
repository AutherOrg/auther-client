import db from '../../providers/dexie/db.dexie'

const create = async signature => {
  try {
    return await db.signatures.add(signature)
  } catch (e) {
    return e
  }
}

const getAll = async () => {
  try {
    return await db.signatures.toArray()
  } catch (e) {
    return e
  }
}

const getOne = async id => {
  try {
    return await db.signatures.get(Number(id))
  } catch (e) {
    return e
  }
}

const destroy = async id => {
  try {
    return await db.signatures.delete(Number(id))
  } catch (e) {
    return e
  }
}

const update = async (id, signature) => {
  try {
    return await db.signatures.update(Number(id), signature)
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
