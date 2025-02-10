import Header from '../HomePage/Header/Header';
import Footer from '../HomePage/Footer/Footer';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CategoryProductsPage.css'
import basket from '../../store/Basket';
import selectedсategory from '../../store/SelectedCategory';
import AddToBasket from '../Buttons/AddToBasket';
import ShowDetails from '../Buttons/ShowDetails';
import selectedproduct from '../../store/SelectedProduct';
import { Link } from 'react-router-dom';

export const CategoryProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log('CategoryProductsPage');
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('selectedсategory', selectedсategory);
        const response = await axios.get('http://localhost:3333/products/all');
        console.log('response', response);
        setProducts(response.data);
      } catch (err) {
        setError('Ошибка при загрузке products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // function handleAddButton(item)  {
  //   basket.addItem(item)
  // }
  console.log(
    'selectedсategory.selectCategory',
    selectedсategory.selectedCategory
  );

  



  const items = products.filter(
    (el) => el.categoryId === selectedсategory.selectedCategory.id
  );

  console.log(
    'selectedсategory.selectCategory.id',
    selectedсategory.selectedCategory.id
  );
  return (
    <>
      <Header />     
        <div className="category-products-content">
          
          <div className='nav-buttons-category-products'>
                    <Link to='/'><button className='mainPage-nav'>Main page</button></Link>
                    {/* <div className='line-between'></div> */}
                    <Link to='/category'><button className='categories-nav-category-products'>Categories</button></Link>
                    <button className='category-products-nav'>{selectedсategory.selectedCategory.title}</button>
                  </div>
                  <h1 className="category-products-title">
                    {selectedсategory.selectedCategory.title}
                  </h1> 
          </div>

          <div className="sale-items">
            {[...items].map((item, index) => (
              <div key={index} className="sale-item">
                {item ? (
                  <>
                    <div className="image-container">
                      <Link to="/productinfo">
                        <img
                          src={`http://localhost:3333/${item.image}`}
                          alt={item.title}
                          className="sale-image"
                          onClick={() => selectedproduct.addItem(item)}
                        />
                      </Link>
                     
                      {item.discont_price && (
            <div className="discount-badge">
              -{Math.round(100 - (item.discont_price / item.price) * 100)}%
            </div>
          )}
        </div>

        <h3 className="sale-item-title">{item.title}</h3>
        {item.discont_price ? (
          <>
            <span className="new-price">${item.discont_price.toFixed(2)}</span>
            <span className="old-price">${item.price.toFixed(2)}</span>
          </>
        ) : (
          <span className="price-category-products">${item.price.toFixed(2)}</span>
        )}
      </>
    ) : (
      <div className="empty-sale-item"></div>
    )}
  </div>
))}
</div>
      <Footer />
    </>
  );
};
