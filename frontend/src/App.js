import { BrowserRouter, Route, Routes } from 'react-router-dom'

import About from './screens/About'
import { AuthorAdd } from './screens/Authors/AuthorAdd'
import { AuthorUpdate } from './screens/Authors/AuthorUpdate'
import { Authors } from './screens/Authors/Authors'
import { Categories } from './screens/Categories/Categories'
import { CategoryAdd } from './screens/Categories/CategoryAdd'
import { CategoryUpdate } from './screens/Categories/CategoryUpdate'
import Contact from './screens/Contact'
import Home from './screens/Home'
import Privacy from './screens/Privacy'
import Text from './screens/Texts/Text'
import Texts from './screens/Texts/Texts'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}>
          <Route index element={<Home />} />
        </Route>
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path='/texts' element={<Texts />} />
        <Route path='/texts/:id' element={<Text />} />
        <Route path='/authors' element={<Authors />} />
        <Route path='/authors/add' element={<AuthorAdd />} />
        <Route path='/authors/update/:id' element={<AuthorUpdate />} />
        <Route path='/categories/add' element={<CategoryAdd />} />
        <Route path='/categories/update/:id' element={<CategoryUpdate />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/privacy' element={<Privacy />} />
      </Routes>
    </BrowserRouter>
  )
}
