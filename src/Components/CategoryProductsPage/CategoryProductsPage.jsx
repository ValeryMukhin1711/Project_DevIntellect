
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './CategoryProductsPage.css';


import selectedсategory from '../../store/SelectedCategory';
import selectedproduct from '../../store/SelectedProduct';
import { Link } from 'react-router-dom';
import Categories from '../CategoriesPage/Categories/Categories';

export const CategoryProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();  

  console.log('CategoryProductsPage');
  console.log('CategoryProductsPage');
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3333/categories/${id}`);
        console.log('response', response);
        setProducts(response.data.data);
        console.log('Products: ', response.data);
        
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

  
 

  return (
    <>    
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
            {products.map((item) => (              
              <div key={item.id} className="sale-item">
                
                
                {item ? (
                  <>
                    <div className="image-container">
                      <Link to="/productinfo">
                        <img
                          src={`http://localhost:3333/category/${item.image}`}
                          alt={item.title}
                          className="sale-image"
                          
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

    </>
    
  );
};
