import { useEffect } from 'react';
import './App.css';
import { HomePage } from './Components/HomePage/HomePage';
import { CategoriesPage } from './Components/CategoriesPage/CategoriesPage';
import { AllProductsPage } from './Components/AllProductsPage/AllProductsPage';
import { AllSalePage } from './Components/AllSalePage/AllSalePage';
import ShoppingCartPage  from './Components/ShoppingCartPage/ShoppingCartPage';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { CategoryProductsPage } from './Components/CategoryProductsPage/CategoryProductsPage';
import { ProductInformation}  from './Components/ProductInformation/ProductInformation';
import Header from './Components/HomePage/Header/Header';
import Footer from './Components/HomePage/Footer/Footer';

function App() {
  useEffect(() => {
    document.title = '07_02_15-10';
  }, []);

  return (
    <>
    
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category" element={<CategoriesPage />} />
          <Route path="/allproducts" element={<AllProductsPage />} />
          <Route path="/allsales" element={<AllSalePage />} />
          <Route path="/shippingcart" element={<ShoppingCartPage />} />
          <Route path="/productinfo" element={<ProductInformation />} />
          <Route path="/categoryproducts/:id" element={<CategoryProductsPage />} />
        </Routes>
      <Footer />
      </BrowserRouter>
      
    </>
  );
}

export default App;
