import Dexie from 'dexie'

const db = new Dexie('OpenBlockcerts')

db.version(1).stores({
  batches: '++id, status, certificates, createdAt',
  jobs: '++id, status, name, action, data, createdAt',
  models: '++id, status, name, description, image, signatures, template, createdAt, updatedAt',
  issuers: '++id, status, issuerProfileUrl, name, email, url, introductionUrl, publicKey, revocationListUrl, image, createdAt, updatedAt',
  revoked: '++id, certificateId, revocationReason, createdAt, updatedAt',
  signatures: '++id, status, name, image, jobTitle, createdAt, updatedAt'
})

export default db
