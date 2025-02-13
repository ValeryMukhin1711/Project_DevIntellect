import { useEffect } from 'react';
import './App.css';
import { HomePage } from './Components/HomePage/HomePage';
import { CategoriesPage } from './Components/CategoriesPage/CategoriesPage';
import ShoppingCartPage from './Components/ShoppingCartPage/ShoppingCartPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CategoryProductsPage } from './Components/CategoryProductsPage/CategoryProductsPage';
import { ProductInformation } from './Components/ProductInformation/ProductInformation';
import AllProductsUniver  from './Components/AllProductsPage/AllProductsUniver';
import AllProducts from './Components/AllProducts/AllProducts';
import Header from './Components/HomePage/Header/Header';
import Footer from './Components/HomePage/Footer/Footer';
import PageNotFound from './Components/PageNotFound/PageNotFound';

function App() {
  useEffect(() => {
    document.title = '10_02_17-30';
  }, []);

  return (
    <>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category" element={<CategoriesPage />} />
          <Route path="/allprod" element={<AllProducts page_title='All Products'/>} />
          <Route path="/allproducts" element={<AllProductsUniver page_title='All Products'/>} />
          <Route path="/allsales" element={<AllProductsUniver props='discounted' page_title='All Sales'/>} />
          <Route path="/shippingcart" element={<ShoppingCartPage />} />
          <Route path="/categoryproducts" element={<AllProductsUniver category='category' page_title='Products in category'/>} />
          {/* <Route path="/categoryproducts" element={<CategoryProductsPage />} /> */}
          <Route path="/productinfo" element={<ProductInformation />} />
          <Route path="*" element={<PageNotFound />} />
          
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
