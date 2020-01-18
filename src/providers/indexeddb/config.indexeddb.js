export default {
  name: 'BlockcertsEthereumClient',
  version: 1,
  objectStoresMeta: [
    {
      store: 'batches',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'status', keypath: 'status', options: { unique: false } },
        { name: 'created', keypath: 'created', options: { unique: false } },
        { name: 'certificates', keypath: 'certificates', options: { unique: false } }
      ]
    }
  ]
}
