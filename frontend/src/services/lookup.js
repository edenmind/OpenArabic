export const categoryLookup = (id, categoriesPersisted) => {
  const c = categoriesPersisted.find((category) => category.id === id)
  console.log('returning: ', c.name)
  return c.name
}
