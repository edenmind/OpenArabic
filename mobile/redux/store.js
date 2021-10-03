import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { categoriesReducer, textReducer, textsReducer } from './reducers';
const rootReducer = combineReducers({
  categories: categoriesReducer,
  text: textReducer,
  texts: textsReducer,
});
export const store = createStore(rootReducer, applyMiddleware(thunk));
