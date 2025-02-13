import Header from '../HomePage/Header/Header';
import Footer from '../HomePage/Footer/Footer';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Sale.css';

import selectedproduct from '../../store/SelectedProduct';
import { Link } from 'react-router-dom';
import ShowDetails from '../Buttons/ShowDetails';
import AddToBasket from '../Buttons/AddToBasket';

export const AllSalePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortField, setSortField] = useState('default');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3333/products/all');
        let filteredProducts = response.data.filter((el) => el.discont_price !== null);
        
        if (minPrice) {
          filteredProducts = filteredProducts.filter(p => p.discont_price >= Number(minPrice));
        }
        if (maxPrice) {
          filteredProducts = filteredProducts.filter(p => p.discont_price <= Number(maxPrice));
        }
        
        if (sortField === 'price_asc') {
          filteredProducts.sort((a, b) => a.discont_price - b.discont_price);
        } else if (sortField === 'price_desc') {
          filteredProducts.sort((a, b) => b.discont_price - a.discont_price);
        } else if (sortField === 'discount_desc') {
          filteredProducts.sort((a, b) => ((b.price - b.discont_price) / b.price * 100) - ((a.price - a.discont_price) / a.price * 100));
        }
        
        setProducts(filteredProducts);
      } catch (err) {
        setError('Ошибка при загрузке products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [sortField, minPrice, maxPrice]);

  return (
    <>
      <Header />
      <div className="sale-container">
        <div className="sale-content">
          <div className="sale-header">
            <h1 className="sale-title">All Sales</h1>
          </div>
          <div className="filters">
            <input type="number" placeholder="Min Price" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
            <input type="number" placeholder="Max Price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
            <select value={sortField} onChange={(e) => setSortField(e.target.value)}>
              <option value="default">By default</option>
              <option value="price_asc">Price ascending</option>
              <option value="price_desc">Price descending</option>
              <option value="discount_desc">Biggest discount</option>
            </select>
          </div>
          <div className="sale-items">
            {loading ? <p>Loading...</p> : error ? <p>{error}</p> : products.map((item, index) => (
              <div key={index} className="sale-item">
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
                    <p className="new-price">${item.discont_price.toFixed(2)}</p>
                    <p className="old-price">${item.price.toFixed(2)}</p>
                  </>
                ) : (
                  <p className="price-category-products">${item.price.toFixed(2)}</p>
                )}
                <AddToBasket value={item} />
                <ShowDetails value={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
