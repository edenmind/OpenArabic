import axios from 'axios'
import { removeHost } from '../services/word-processing.js'

export const getTranslation = async (arabicWord) => {
  const res = await axios.post(
    `https://translation.googleapis.com/language/translate/v2?key=${process.env.REACT_APP_GOOGLE_API_KEY}`,
    {
      q: arabicWord,
      source: 'ar',
      target: 'en'
    }
  )
  const { translatedText } = res.data.data.translations[0]

  return translatedText
}

export const postWord = async (arabic, english, arabicSentence, englishSentence) => {
  const word = {
    arabic,
    english,
    arabicSentence,
    englishSentence
  }

  const url = `${process.env.REACT_APP_API_URL}/words`

  const result = await axios({
    method: 'post',
    url,
    data: {
      word
    }
  }).catch((error) => {
    return { message: error.response.data.message, state: 'error' }
  })

  if (result.status === 201) {
    return { message: 'The word was added!', state: 'success' }
  }

  return { message: result.message, state: 'error' }
}

export const getWord = async (arabicWord) => {
  const url = `${process.env.REACT_APP_API_URL}/words/${arabicWord}`
  console.log('getting:', arabicWord)
  const result = await axios({
    method: 'get',
    url
  }).catch((error) => {
    console.log('error:', error)
  })

  if (result.status === 200) {
    return result.data
  }
}

export const getWords = async () => {
  const url = `${process.env.REACT_APP_API_URL}/words`

  const result = await axios({
    method: 'get',
    url
  }).catch((error) => {
    return { message: error.response.data.message, state: 'error' }
  })

  return result.data
}

export const updateWord = async (word, id) => {
  const result = await axios({
    method: 'put',
    url: `${process.env.REACT_APP_API_URL}/words/${id}`,
    data: {
      word
    },
    headers: {
      auth: `${process.env.REACT_APP_KEY}`
    }
  }).catch((error) => {
    return { message: error.response.data.message, state: 'error' }
  })

  return result.status === 200
}

export const deleteWord = async (id) => {
  const response = await axios({
    method: 'delete',
    headers: {
      auth: `${process.env.REACT_APP_KEY}`
    },
    url: `${process.env.REACT_APP_API_URL}/words/${id}`
  }).catch((error) => {
    return { message: error.response.data.message, state: 'error' }
  })
  return response.status === 200
}

export const getTexts = async () => {
  const url = `${process.env.REACT_APP_API_URL}/texts`

  const result = await axios({
    method: 'get',
    url
  }).catch((error) => {
    return { message: error.response.data.message, state: 'error' }
  })

  return result.data
}

export const getTextsCategory = async (id) => {
  const url = `${process.env.REACT_APP_API_URL}/texts/categories/${id}`
  const response = await axios.get(url)

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
  }).catch((error) => {
    return { message: error.response.data.message, state: 'error' }
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
  }).catch((error) => {
    return { message: error.response.data.message, state: 'error' }
  })

  return result.status === 200
}

export const addCategory = async (data) => {
  const result = await axios({
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/categories`,
    data: {
      data
    },
    headers: {
      auth: `${process.env.REACT_APP_KEY}`
    }
  }).catch((error) => {
    return { message: error.response.data.message, state: 'error' }
  })

  if (result.status === 201) {
    return { message: 'The category was added!', success: true }
  }

  return { message: result.message, success: false }
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
  return response.data
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
export const updateCategory = async (data, id) => {
  const result = await axios({
    method: 'put',
    url: `${process.env.REACT_APP_API_URL}/categories/${id}`,
    data: {
      data
    },
    headers: {
      auth: `${process.env.REACT_APP_KEY}`
    }
  })
  return result.status === 200
}

export const addText = async (text) => {
  const { title, author, image, category, sentences, source, texts, status, publishAt } = text
  const { arabic, english } = texts

  const response = await axios({
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
  }).catch((error) => {
    return {
      success: false,
      message: error
    }
  })

  if (response.status === 201) {
    return {
      success: true,
      message: 'The text was created!'
    }
  }

  return {
    success: false,
    message: `Error: ${response.message.response.data.message}`
  }
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

export const updateText = async (text, id) => {
  const { title, author, image, category, sentences, source, texts, status, publishAt, generateAudio, textGuid } = text
  const { arabic, english } = texts

  const response = await axios({
    method: 'put',
    url: `${process.env.REACT_APP_API_URL}/texts/${id}`,
    headers: {
      auth: `${process.env.REACT_APP_KEY}`
    },
    data: {
      title,
      category,
      publishAt,
      generateAudio,
      textGuid,
      image: removeHost(image),
      status,
      texts: {
        arabic,
        english
      },
      author,
      source,
      sentences
    }
  }).catch((error) => {
    return {
      success: false,
      message: error
    }
  })

  if (response.status == 200) {
    return {
      success: true,
      message: response.data.message
    }
  }

  return {
    success: false,
    message: `Error: ${response.message.response.data.message}`
  }
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
