import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import About from './screens/about.js'
import AuthorAdd from './screens/authors-add.js'
import AuthorUpdate from './screens/authors-update.js'
import Authors from './screens/authors.js'
import Category from './screens/categories.js'
import CategoryAdd from './screens/categories-add.js'
import CategoryUpdate from './screens/categories-update.js'
import Home from './screens/home.js'
import Privacy from './screens/privacy.js'
import SingleText from './screens/text-list-id.js'
import TextAdd from './screens/text-add.js'
import Texts from './screens/texts.js'
import Words from './screens/words.js'
import WordsUpdate from './screens/words-update.js'

export default function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/authors/add" element={<AuthorAdd />} />
          <Route path="/authors/update/:id" element={<AuthorUpdate />} />
          <Route path="/categories" element={<Category />} />
          <Route path="/categories/add" element={<CategoryAdd />} />
          <Route path="/categories/update/:id" element={<CategoryUpdate />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/texts/:id" element={<SingleText />} />
          <Route path="/texts/" element={<Texts />} />
          <Route path="/texts/add" element={<TextAdd />} />
          <Route path="/texts/categories/:id" element={<Home />} />
          <Route path="/texts/update/:id" element={<TextAdd />} />
          <Route path="/words" element={<Words />} />
          <Route path="/words/update/:textId/:sentenceId/:wordId" element={<WordsUpdate />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  )
}
