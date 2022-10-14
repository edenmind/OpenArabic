/* eslint-disable operator-linebreak */
import { ENDPOINT, HOST } from '../constants/urls.js'
export const textWithId = (id) => {
  return `${HOST.backend}/${ENDPOINT.texts}/${id}`
}

export const texts = () => {
  return `${HOST.backend}/${ENDPOINT.texts}`
}

export const categories = () => {
  return `${HOST.backend}/${ENDPOINT.categories}`
}

export const textsWithCategory = (category) => {
  return `${HOST.backend}/${ENDPOINT.texts}/${ENDPOINT.categories}/${category}`
}
