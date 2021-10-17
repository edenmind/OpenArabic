import { GET_CATEGORIES, GET_TEXTS, GET_TEXT } from './actions';

const initialStateCategories = {
  categories: [],
};

const initialStateText = {
  text: {},
};

const initialStateTexts = {
  texts: [],
};
function categoriesReducer(state = initialStateCategories, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return { ...state, categories: action.payload };
    default:
      return state;
  }
}

function textReducer(state = initialStateText, action) {
  switch (action.type) {
    case GET_TEXT:
      return { ...state, text: action.payload };
    default:
      return state;
  }
}

function textsReducer(state = initialStateTexts, action) {
  switch (action.type) {
    case GET_TEXTS:
      return { ...state, texts: action.payload };
    default:
      return state;
  }
}

export { categoriesReducer, textReducer, textsReducer };
