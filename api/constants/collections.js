'use strict'

const COLLECTIONS = {
  TEXTS: 'texts',
  CATEGORIES: 'categories',
  AUTHORS: 'authors',
  WORDS: 'words'
}

// check that the collection is valid
COLLECTIONS.isValid = (collection) => {
  return Object.values(COLLECTIONS).includes(collection)
}

module.exports = COLLECTIONS
