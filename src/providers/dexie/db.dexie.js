import Dexie from 'dexie'

const db = new Dexie('Auther')

db.version(1).stores({
  batches: '++id, status, certificates, createdAt',
  jobs: '++id, status, name, action, data, createdAt'
})

export default db
