import Header from '../HomePage/Header/Header';
import Footer from '../HomePage//Footer/Footer';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Sale.css';
import basket from '../../store/Basket';

export const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log('AllProductsPage');
  useEffect(() => {
    const fetchProducts = async () => {
      try {
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

  function handleAddButton(item)  {

    // console.log('item.price',item.price)
    // console.log('item',item)

    basket.addItem(item)
    console.log('basket.items',basket.items)
  }

  const items = products;
  return (
    <>
      <Header />
      <div className="sale-container">
        <div className="sale-content">
          <div className="sale-header">
            <h1 className="sale-title">All Products</h1>
            {/* <button className="sale-button">All Products</button> */}
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
                    {/* <p className="sale-price">
                    <span className="new-price">
                      ${item.discont_price.toFixed(2)} */}
                    {/* </span> */}
                    <span className="old-price">${item.price.toFixed(2)}</span>
                    <button onClick={()=> handleAddButton(item)}>AddToCart</button>
                    {/* // </p> */}
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
