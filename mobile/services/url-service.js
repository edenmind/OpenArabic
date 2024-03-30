import { ENDPOINT, HOST } from '../constants/urls.js'

const getBaseUrl = (endpoint) => `${HOST.backend}/${endpoint}`

export const textWithId = (id) => `${getBaseUrl(ENDPOINT.texts)}/${id}`

export const categories = () => getBaseUrl(ENDPOINT.categories)

export const words = () => getBaseUrl(ENDPOINT.words)

export const wordsHome = () => getBaseUrl(ENDPOINT.wordsHome)

export const categoryWithId = (category = '') =>
  category === ''
    ? `${HOST.backend}/${ENDPOINT.texts}`
    : `${HOST.backend}/${ENDPOINT.texts}/${ENDPOINT.categories}/${category}`
