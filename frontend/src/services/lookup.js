export const categoryLookup = (id, categoriesPersisted) => {
  if (categoriesPersisted.length === 0) {
    return 'Unknown'
  }
  const c = categoriesPersisted.find((category) => category.id === id)
  return c.name
}

export const authorLookup = (id, authorsPersisted) => {
  if (authorsPersisted.length === 0) {
    return 'Unknown'
  }
  const a = authorsPersisted.find((author) => author.id === id)
  return a.name
}
