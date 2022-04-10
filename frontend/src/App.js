import { BrowserRouter, Route, Routes } from 'react-router-dom'

import About from './screens/About'
import { AuthorAdd } from './screens/Authors/AuthorAdd'
import { AuthorUpdate } from './screens/Authors/AuthorUpdate'
import { Authors } from './screens/Authors/Authors'
import { Categories } from './screens/Categories'
import Contact from './screens/Contact'
import Home from './screens/Home'
import Texts from './screens/Texts'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}>
          <Route index element={<Home />} />
        </Route>
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/authors' element={<Authors />} />
        <Route path='/texts' element={<Texts />} />
        <Route path='/authors/add' element={<AuthorAdd />} />
        <Route path='/authors/update/:id' element={<AuthorUpdate />} />
      </Routes>
    </BrowserRouter>
  )
}
