db = db.getSiblingDB('openarabic')
db.createCollection('init_collection')
db.init_collection.insertMany([
  {
    init: '1'
  },
  {
    init: '2'
  },
  {
    init: '3'
  }
])

db.createUser({
  user: 'user',
  pwd: 'password',
  roles: [
    {
      role: 'readWrite',
      db: 'openarabic'
    }
  ]
})
