import Dexie from 'dexie'

const db = new Dexie('OpenBlockcertsClient')
db.version(1).stores({
  certificates: '++id, status, uuid, json, createdAt, updatedAt, recipientId, issuerId'
})

export default db
