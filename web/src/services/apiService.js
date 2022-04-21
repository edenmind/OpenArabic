import axios from 'axios'

export const getTexts = async (id) => {
  const url = id ? `${process.env.REACT_APP_API_URL}/texts/categories/${id}` : `${process.env.REACT_APP_API_URL}/texts`
  const promise = axios.get(url)
  const response = await promise
    return response.data
}
