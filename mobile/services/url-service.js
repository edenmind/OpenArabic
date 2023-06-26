import { ENDPOINT, HOST } from '../constants/urls.js'
export const textWithId = (id) => {
  return `${HOST.backend}/${ENDPOINT.texts}/${id}`
}

export const categories = () => {
  return `${HOST.backend}/${ENDPOINT.categories}`
}

export const words = () => {
  return `${HOST.backend}/${ENDPOINT.words}`
}

export const wordsHome = () => {
  return `${HOST.backend}/${ENDPOINT.wordsHome}`
}

export const categoryWithId = (category = '') => {
  return category === ''
    ? `${HOST.backend}/${ENDPOINT.texts}`
    : `${HOST.backend}/${ENDPOINT.texts}/${ENDPOINT.categories}/${category}`
}
