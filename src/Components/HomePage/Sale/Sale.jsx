import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { shuffle } from './utils';
import './Sale.css';
import basket from '../../../store/Basket';
import selectedproduct from '../../../store/SelectedProduct';
import { Link } from 'react-router-dom';
import ShowMore from '../../Buttons/ShowDetails';
import AddToBasket from '../../Buttons/AddToBasket';

const Sale = () => {
  const [sale, setSale] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get('http://localhost:3333/products/all');
        console.log('response.data', response.data);
        console.log('run setSale');
        const tmpArr = shuffle(
          response.data.filter((el) => el.discont_price !== null)
        );
        // console.log('shuffle(response.data',shuffle(response.data))
        setSale(tmpArr);
        console.log('sale', sale);
      } catch (err) {
        setError('Ошибка при загрузке sale');
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  console.log('sale-out', sale);
  const items = sale;
  return (
    <div className="sale-container">
      <div className="sale-content">
        <div className="sale-header">
          <h1 className="sale-title">Sale</h1>
          <button className="sale-button">All sales</button>
        </div>
        <div className="sale-items">
          {[
            ...items
              .filter(
                (item) =>
                  item.discont_price !== undefined &&
                  item.discont_price !== null
              )
              .slice(0, 4),
            ...Array(4).fill(null),
          ]
            .slice(0, 4)
            .map((item, index) => (
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

                    <AddToBasket value={item} />

                    <h3 className="sale-item-title">{item.title}</h3>
                    <p className="sale-price">
                      <span className="new-price">
                        ${item.discont_price.toFixed(2)}
                      </span>
                      <span className="old-price">
                        ${item.price.toFixed(2)}
                      </span>
                    </p>
                    <ShowMore value={item} />
                  </>
                ) : (
                  <div className="empty-sale-item"></div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Sale;
