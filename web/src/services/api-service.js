import axios from 'axios'

export const getTexts = async (id) => {
  const url = id ? `${process.env.REACT_APP_API_URL}/texts/categories/${id}` : `${process.env.REACT_APP_API_URL}/texts`
  const response = await axios.get(url)
  return response.data
}

export const getVowels = async (text) => {
  const url = `${process.env.REACT_APP_API_URL}/texts/tashkeel`

  axios({
    method: 'post',
    url,
    data: {
      text
    }
  })
    .then((response) => {
      return response.data
    })
    .catch((error) => console.log(error))
}

export const getText = (id) => async (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}/texts/${id}`
  const response = await axios.get(url).catch((error) => console.log(error))

  dispatch({
    type: 'SET_TEXT',
    text: response.data
  })
}
