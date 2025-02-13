import Header from '../HomePage/Header/Header';
import Footer from '../HomePage/Footer/Footer';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './ProductInformation.module.css';
import selectedproduct from '../../store/SelectedProduct';
import AddToBasket from '../Buttons/AddToBasket';

export const ProductInformation = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log('CategoryProductsPage');
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('selectedproduct', selectedproduct);
        const response = await axios.get(
          `http://localhost:3333/products/${selectedproduct.selectedProduct.id}`
        );
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
loading && <h1>Loading</h1>
  const items = products;
  return (
    <>
      <Header />
      <div className="sale-container">
        <div className="sale-content">
          <div className="sale-header">
            <h3 className="sale-title">Products detail</h3>
          </div>
          <div className="sale-items">
            {[...items].map((item, index) => (
              <div key={index} className="sale-item">
                {item ? (
                  <>
                    <div className="image-container">
                      <img
                        src={`http://localhost:3333/${item.image}`}
                        alt={item.title}
                        className="sale-image"
                      />
                 
                      {/* <div className="discount-badge">
                      -{' '}
                      {Math.round(
                        100 - (item.discont_price / item.price) * 100
                      )}
                      %
                    </div> */}
                    </div>
                    <h3 className="sale-item-title">{item.title}</h3>
              
                    {item.discont_price &&
                    <span className="new-price">new price
                    ${item.discont_price.toFixed(2)}
                    </span>
                    }
                    <span className="old-price">${item.price.toFixed(2)}</span>

                    <p>{selectedproduct.selectedProduct.description}</p>
                    <AddToBasket value ={item}/>
                  </>
                ) : (
                  <div className="empty-sale-item"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
