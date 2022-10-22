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
  // file deepcode ignore NoHardcodedPasswords: this is just an example
  pwd: 'password',
  roles: [
    {
      role: 'readWrite',
      db: 'openarabic'
    }
  ]
})
