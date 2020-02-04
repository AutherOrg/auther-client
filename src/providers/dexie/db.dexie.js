import Dexie from 'dexie'

const db = new Dexie('OpenBlockcertsClient')

db.version(1).stores({
  batches: '++id, status, certificates, createdAt',
  certificates: '++id, status, uuid, json, createdAt, updatedAt, recipientId, issuerId',
  jobs: '++id, status, name, action, data',
  models: '++id, status, name, description, image, signatureJobTitle, signatureImage, template, createdAt, updatedAt',
  issuers: '++id, status, issuerProfileUrl, name, email, url, introductionUrl, publicKey, revocationListUrl, image'
})

export default db
