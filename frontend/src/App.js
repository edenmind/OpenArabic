import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './screens/Home'
import Contact from './screens/Contact'
import About from './screens/About'

// import your route components too

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}>
          <Route index element={<Home />} />
        </Route>
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}
