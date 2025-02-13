import Header from '../HomePage/Header/Header';
import Footer from '../HomePage/Footer/Footer';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Sale.css';
import basket from '../../store/Basket';
import AddToBasket from '../Buttons/AddToBasket';
import ShowDetails from '../Buttons/ShowDetails';

export const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortField, setSortField] = useState('default');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [discounted, setDiscounted] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:3333/products/all');
        let filteredProducts = response.data;

        if (minPrice) {
          filteredProducts = filteredProducts.filter(p => p.price >= Number(minPrice));
        }
        if (maxPrice) {
          filteredProducts = filteredProducts.filter(p => p.price <= Number(maxPrice));
        }

        if (discounted) {
          filteredProducts = filteredProducts.filter(p => p.discont_price !== null && p.discont_price < p.price);
        }

        if (sortField === 'price_asc') {
          filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sortField === 'price_desc') {
          filteredProducts.sort((a, b) => b.price - a.price);
        } else if (sortField === 'discount_desc') {
          filteredProducts.sort((a, b) => ((b.price - (b.discont_price || b.price)) / b.price * 100) - ((a.price - (a.discont_price || a.price)) / a.price * 100));
        }

        setProducts(filteredProducts);
      } catch (err) {
        setError('Ошибка при загрузке товаров');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [sortField, minPrice, maxPrice, discounted]);

  return (
    <>
      <Header />
      <div className="sale-container">
        <div className="sale-content">
          <h1 className="sale-title">All Products_filter</h1>
          <div className="filters">
            <input type="number" placeholder="Min Price" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
            <input type="number" placeholder="Max Price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
            <label>
              <input type="checkbox" checked={discounted} onChange={(e) => setDiscounted(e.target.checked)} />
              Discounted items
            </label>
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
                  <img src={`http://localhost:3333/${item.image}`} alt={item.title} className="sale-image" />
                  {item.discont_price !== null && item.discont_price < item.price && (
                    <div className="discount-badge">-{((item.price - item.discont_price) / item.price * 100).toFixed(0)}%</div>
                  )}
                </div>
                <h3 className="sale-item-title">{item.title}</h3>
                <span className="old-price">${item.price.toFixed(2)}</span>
                {item.discont_price !== null ? (
                  <span className="new-price">${item.discont_price.toFixed(2)}</span>
                ) : (
                  <span className="new-price"></span>
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
