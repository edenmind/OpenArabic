import { GET_CATEGORIES, GET_TEXTS, GET_TEXT } from './actions';

const initialState = {
  categories: [{ categoryId: 0, name: 'Adab' }],
  text: [{}],
  texts: [],
};
function categoriesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return { ...state, categories: action.payload };
    default:
      return state;
  }
}

function textReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TEXT:
      return { ...state, text: action.payload };
    default:
      return state;
  }
}

function textsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TEXTS:
      return { ...state, texts: action.payload };
    default:
      return state;
  }
}

export { categoriesReducer, textReducer, textsReducer };
