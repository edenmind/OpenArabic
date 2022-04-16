import {
  GET_ARABIC_SENTENCE,
  GET_ARABIC_TEXT,
  GET_ARABIC_WORDS,
  GET_AUTHOR,
  GET_CATEGORY,
  GET_CATEGORY_PERSISTED,
  GET_ENGLISH_SENTENCE,
  GET_ENGLISH_TEXT,
  GET_ENGLISH_WORDS,
  GET_SOURCE,
  GET_TITLE,
  GET_WORD_BY_WORD,
  SET_ARABIC_SENTENCE,
  SET_ARABIC_TEXT,
  SET_ARABIC_WORDS,
  SET_AUTHOR,
  SET_CATEGORY,
  SET_CATEGORY_PERSISTED,
  SET_ENGLISH_SENTENCE,
  SET_ENGLISH_TEXT,
  SET_ENGLISH_WORDS,
  SET_SOURCE,
  SET_TITLE,
  SET_WORD_BY_WORD,
} from './actions'

const initialState = {
  arabicWords: [],
  englishWords: [],
  wordByWord: [[]],
  title: '',
  category: '',
  categoryPersisted: [],
  author: '',
  source: '',
  englishText: [
    'It is Sunnah for the fasting person to eat suhoor, because it was proven in al-Saheehayn that Anas ibn Maalik (may Allaah be pleased with him) said:\n The Prophet the Messenger of Allaah (peace and blessings of Allaah be upon him) said: “Eat suhoor for in suhoor there is blessing.” (Narrated by al-Bukhaari, 1923; Muslim, 1059). ',
  ],
  arabicText: [
    'يسن للصائم السحور لما ثبت في الصحيحين من حديث أنس بن مالك - رضي الله عنه - قال\n : قال النبي رسول الله - صلى الله عليه وسلم - : ( تسحروا فإن في السحور بركة ) رواه البخاري برقم 1923 ، ومسلم برقم 1095',
  ],
}

export function textReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TITLE:
      return state.title
    case SET_TITLE:
      return { ...state, title: action.title }
    default:
      return state
  }
}

export function wordByWordReducer(state = initialState, action) {
  switch (action.type) {
    case GET_WORD_BY_WORD:
      return state.wordByWord
    case SET_WORD_BY_WORD:
      return { ...state, wordByWord: action.wordByWord }
    default:
      return state
  }
}

export function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORY:
      return state.category
    case SET_CATEGORY:
      return { ...state, category: action.category }
    default:
      return state
  }
}

export function categoryPersistedReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORY_PERSISTED:
      return state.categoryPersisted
    case SET_CATEGORY_PERSISTED:
      return { ...state, categoryPersisted: action.categoryPersisted }
    default:
      return state
  }
}

export function authorReducer(state = initialState, action) {
  switch (action.type) {
    case GET_AUTHOR:
      return state.category
    case SET_AUTHOR:
      return { ...state, author: action.author }
    default:
      return state
  }
}

export function englishTextReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ENGLISH_TEXT:
      return state.englishText
    case SET_ENGLISH_TEXT:
      return { ...state, englishText: action.englishText }
    default:
      return state
  }
}

export function arabicTextReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ARABIC_TEXT:
      return state.arabicText
    case SET_ARABIC_TEXT:
      return { ...state, arabicText: action.arabicText }
    default:
      return state
  }
}

export function englishSentenceReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ENGLISH_SENTENCE:
      return state.englishSentence
    case SET_ENGLISH_SENTENCE:
      return { ...state, englishSentence: action.englishSentence }
    default:
      return state
  }
}

export function arabicSentenceReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ARABIC_SENTENCE:
      return state.arabicSentence
    case SET_ARABIC_SENTENCE:
      return { ...state, arabicSentence: action.arabicSentence }
    default:
      return state
  }
}

export function englishWordsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ENGLISH_WORDS:
      return state.englishSentence
    case SET_ENGLISH_WORDS:
      return { ...state, englishWords: action.englishWords }
    default:
      return state
  }
}

export function arabicWordsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ARABIC_WORDS:
      return state.arabicSentence
    case SET_ARABIC_WORDS:
      return { ...state, arabicWords: action.arabicWords }
    default:
      return state
  }
}

export function sourceReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SOURCE:
      return state.source
    case SET_SOURCE:
      return { ...state, source: action.source }
    default:
      return state
  }
}
