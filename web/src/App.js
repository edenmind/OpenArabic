/* eslint-disable react/react-in-jsx-scope */
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import About from './screens/about'
import AuthorAdd from './screens/authors-add'
import AuthorUpdate from './screens/authors-update'
import Authors from './screens/authors'
import Category from './screens/categories'
import CategoryAdd from './screens/categories-add'
import CategoryUpdate from './screens/categories-update'
import Home from './screens/home'
import Privacy from './screens/privacy'
import SingleText from './screens/text-list-id'
import TextAdd from './screens/text-add'
import Texts from './screens/texts'

export default function App() {
  return (
    <BrowserRouter>
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
      </Routes>
    </BrowserRouter>
  )
}
