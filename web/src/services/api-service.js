import axios from 'axios'

export const getTexts = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/texts`)
  return response.data
}

export const getVowels = async (text) => {
  const url = `${process.env.REACT_APP_API_URL}/texts/tashkeel`
  const encodedText = encodeURIComponent(text)
  const response = await axios({
    method: 'post',
    url,

    data: {
      encodedText
    }
  })

  return response.data
}

export const addAuthor = async (author) => {
  const result = await axios({
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/authors`,
    data: {
      name: author
    },
    headers: {
      auth: `${process.env.REACT_APP_KEY}`
    }
  })
  return result.status === 201
}

export const updateAuthor = async (author, id) => {
  const result = await axios({
    method: 'put',
    url: `${process.env.REACT_APP_API_URL}/authors/${id}`,
    data: {
      name: author
    },
    headers: {
      auth: `${process.env.REACT_APP_KEY}`
    }
  })
  return result.status === 200
}

export const addCategory = async (category) => {
  const result = await axios({
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/categories`,
    data: {
      name: category
    },
    headers: {
      auth: `${process.env.REACT_APP_KEY}`
    }
  })
  return result.status === 201
}

export const getImages = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/images`)
  return response.data
}

export const getAuthor = async (id) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/authors/${id}`)
  return response.data.name
}

export const getAuthors = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/authors`)
  return response.data
}

export const deleteAuthor = async (id) => {
  const response = await axios({
    method: 'delete',
    headers: {
      auth: `${process.env.REACT_APP_KEY}`
    },
    url: `${process.env.REACT_APP_API_URL}/authors/${id}`
  })
  return response.status === 200
}

export const getCategory = async (id) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/categories/${id}`)
  return response.data.name
}

export const getCategories = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/categories`)
  return response.data
}

export const deleteCategory = async (id) => {
  const response = await axios({
    method: 'delete',
    headers: {
      auth: `${process.env.REACT_APP_KEY}`
    },
    url: `${process.env.REACT_APP_API_URL}/categories/${id}`
  })
  return response.status === 200
}
export const updateCategory = async (category, id) => {
  const result = await axios({
    method: 'put',
    url: `${process.env.REACT_APP_API_URL}/categories/${id}`,
    data: {
      name: category
    },
    headers: {
      auth: `${process.env.REACT_APP_KEY}`
    }
  })
  return result.status === 200
}

export const addText = (text) => {
  const { title, author, image, category, sentences, source, texts, status, publishAt } = text
  const { arabic, english } = texts

  axios({
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/texts`,
    headers: {
      auth: `${process.env.REACT_APP_KEY}`
    },
    data: {
      title,
      category,
      publishAt,
      status,
      image,
      texts: {
        arabic,
        english
      },
      author,
      source,
      sentences
    }
  })
    .then((response) => {
      return response.status === 201
    })
    .catch((error) => console.log(error))
}

export const getText = async (id) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/texts/${id}`)
  return response.data
}

export const getTextToRedux = (id) => async (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}/texts/${id}`
  const response = await axios.get(url).catch((error) => console.log(error))

  dispatch({
    type: 'SET_TEXT',
    text: response.data
  })
}

export const updateText = (text, id) => {
  const { title, author, image, category, sentences, source, texts, status, publishAt } = text
  const { arabic, english } = texts

  axios({
    method: 'put',
    url: `${process.env.REACT_APP_API_URL}/texts/${id}`,
    headers: {
      auth: `${process.env.REACT_APP_KEY}`
    },
    data: {
      title,
      category,
      publishAt,
      image,
      status,
      texts: {
        arabic,
        english
      },
      author,
      source,
      sentences
    }
  })
    .then((response) => {
      return response.status === 200
    })
    .catch((error) => console.log(error))
}

export const deleteText = async (id) => {
  const response = await axios({
    method: 'delete',
    headers: {
      auth: `${process.env.REACT_APP_KEY}`
    },
    url: `${process.env.REACT_APP_API_URL}/texts/${id}`
  })
  return response.status === 200
}
