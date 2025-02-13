import Header from '../HomePage/Header/Header';
import Footer from '../HomePage/Footer/Footer';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Sale.css';
import basket from '../../store/Basket';
import selectedproduct from '../../store/SelectedProduct';
import { Link } from 'react-router-dom';
import AddToBasket from '../Buttons/AddToBasket';
import ShowDetails from '../Buttons/ShowDetails';


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

  loading && <h1>Loading</h1>

  const items = products;
  return (
    <>
      <Header />
      <div className="sale-container">
        <div className="sale-content">
          <div className="sale-header">
            <h1 className="sale-title">All Products</h1>
            
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
                     
                      {/* <div className="discount-badge">
                      -{' '}
                      {Math.round(
                        100 - (item.discont_price / item.price) * 100
                      )}
                      %
                    </div> */}
                    </div>
                    <AddToBasket value={item}/>
                    <h3 className="sale-item-title">{item.title}</h3>
                    
                    {
                       item.discont_price && <span className="new-price">Sale 
                      ${item.discont_price.toFixed(2)}
                      </span>
                    }
                   
                    <p className="old-price">${item.price.toFixed(2)}</p>

                      <ShowDetails value={item}/>

                   
                    
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
