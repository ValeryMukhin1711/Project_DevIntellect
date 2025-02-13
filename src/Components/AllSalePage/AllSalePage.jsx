import Header from '../HomePage/Header/Header';
import Footer from '../HomePage/Footer/Footer';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Sale.css';

import selectedproduct from '../../store/SelectedProduct';
import { Link } from 'react-router-dom';
import ShowDetails from '../Buttons/ShowDetails';
import AddToBasket from '../Buttons/AddToBasket';
import Filter from '../Filters/Filter';

export const AllSalePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3333/products/all');
        console.log('response', response);
        const tmpArr = response.data.filter((el) => el.discont_price !== null);
        setProducts(tmpArr);
      } catch (err) {
        setError('Ошибка при загрузке products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const items = products;
  return (
    <>
      <Header />
      <Filter/>
      <div className="sale-container">
        <div className="sale-content">
          <div className="sale-header">
            <h1 className="sale-title">All Sales</h1>
            {/* <button className="sale-button">All Products</button> */}
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
                      <div className="discount-badge">
                        -{' '}
                        {Math.round(
                          100 - (item.discont_price / item.price) * 100
                        )}
                        %
                      </div>
                    </div>
                    <AddToBasket value={item}/>
                    <h3 className="sale-item-title">{item.title}</h3>

                    <ShowDetails value={item} />
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
