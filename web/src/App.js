import { BrowserRouter, Route, Routes } from 'react-router-dom'

import About from './screens/About'
import AuthorAdd from './screens/AuthorAdd'
import AuthorUpdate from './screens/AuthorUpdate'
import Authors from './screens/Author'
import Categories from './screens/Categories'
import Category from './screens/Category'
import CategoryAdd from './screens/CategoryAdd'
import CategoryUpdate from './screens/CategoryUpdate'
import Home from './screens/Home'
import Privacy from './screens/Privacy'
import SingleText from './screens/TextListId'
import TextAdd from './screens/TextAdd'
import Texts from './screens/Texts'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/authors' element={<Authors />} />
        <Route path='/authors/add' element={<AuthorAdd />} />
        <Route path='/authors/update/:id' element={<AuthorUpdate />} />
        <Route path='/categories' element={<Category />} />
        <Route path='/categories/add' element={<CategoryAdd />} />
        <Route path='/categories/update/:id' element={<CategoryUpdate />} />
        <Route path='/privacy' element={<Privacy />} />
        <Route path='/texts/:id' element={<SingleText />} />
        <Route path='/texts/' element={<Texts />} />
        <Route path='/texts/add' element={<TextAdd />} />
        <Route path='/texts/categories/:id' element={<Categories />} />
        <Route path='/texts/update/:id' element={<TextAdd />} />
      </Routes>
    </BrowserRouter>
  )
}
