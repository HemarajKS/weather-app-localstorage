import { Routes, Route } from 'react-router-dom'
import Favourites from '../Favourites/favourites'
import HomePage from '../homePage/homePage'
import Recent from '../Recent/recent'

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="favourites" element={<Favourites />} />
      <Route path="recent" element={<Recent />} />
      <Route path="*" element={<HomePage />}></Route>
    </Routes>
  )
}

export default Router
