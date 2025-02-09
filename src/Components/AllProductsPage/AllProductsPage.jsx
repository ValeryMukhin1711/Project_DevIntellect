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

  const [sortField, setSortField] = useState('default');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [discounted, setDiscounted] = useState(false);

  console.log('AllProductsPage');
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:3333/products/all');
        let filteredProducts = response.data;
  
        // Фильтр по цене
        if (minPrice) {
          filteredProducts = filteredProducts.filter(p => p.price >= Number(minPrice));
        }
        if (maxPrice) {
          filteredProducts = filteredProducts.filter(p => p.price <= Number(maxPrice));
        }
  
        // Фильтр по скидкам
        if (discounted) {
          console.log('discounted',discounted)
          filteredProducts = filteredProducts.filter(p => p.discont_price > 0);
        }
  
        // Сортировка
        if (sortField === "price_asc") {
          filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sortField === "price_desc") {
          filteredProducts.sort((a, b) => b.price - a.price);
        } else if (sortField === "discount_desc") {
          filteredProducts.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        }
  
        setProducts(filteredProducts);
      } catch (err) {
        setError("Ошибка при загрузке products");
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, [sortField, minPrice, maxPrice, discounted]);
  loading && <h1>Loading</h1>;

  const items = products;
  return (
    <>
      <Header />
      <div className="sale-container">
        <div className="sale-content">
          <div className="sale-header">
            <h1 className="sale-title">All Products</h1>
          </div>

{/* Фильтры */}
<div className="filters">
            <div>
              <label>Price </label>
              <input type="number" placeholder="from" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
              <input type="number" placeholder="to" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
            </div>
            <div>
              <label>
                <input type="checkbox" checked={discounted} onChange={(e) => setDiscounted(e.target.checked)} />
                Discounted items
              </label>
            </div>
            <div>
              <label>Sorted </label>
              <select value={sortField} onChange={(e) => setSortField(e.target.value)}>
                <option value="default">by default</option>
                <option value="price_asc">Price ascending</option>
                <option value="price_desc">Price descending</option>
                <option value="discount_desc">Biggest discount</option>
              </select>
            </div>
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
                    </div>
                    <AddToBasket value={item} />
                    <h3 className="sale-item-title">{item.title}</h3>

                    {item.discont_price && (
                      <span className="new-price">
                        Sale ${item.discont_price.toFixed(2)}
                      </span>
                    )}

                    <p className="old-price">${item.price.toFixed(2)}</p>

                    <ShowDetails value={item} />

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
