import React from 'react'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import CheckOut from './CheckOut/CheckOut'
import FirstOrder from './FirstOrder/FirstOrder'
import Categories from './Categories/Categories'
import Sale from './Sale/Sale'
// import AllProducts from '../AllProducts/AllProducts'

export function HomePage() {
  return (
    <div>
      {/* <Header/> */}
      {/* <AllProducts/> */}
      <CheckOut/>
      <Categories/>
      <FirstOrder/>
      <Sale/>
      {/* <Footer/> */}
    </div>
  )
}

// export default Home
