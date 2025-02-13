import Header from '../HomePage/Header/Header';
import Footer from '../HomePage/Footer/Footer';
import React from 'react';
import basket from '../../store/Basket';
import { observer } from 'mobx-react-lite';
import './ShoppingCartPage.module.css';

const ShoppingCartPage = observer(() => {
  const groupedItemsMap = new Map();
  basket.items.forEach(item => {
    if (item && item.id) {
      if (groupedItemsMap.has(item.id)) {
        groupedItemsMap.get(item.id).count += 1;
      } else {
        groupedItemsMap.set(item.id, { ...item, count: 1 });
      }
    }
  });

  const itemsArray = Array.from(groupedItemsMap.values());

  const totalPrice = itemsArray.reduce(
    (sum, el) => sum + ((el?.discont_price || el?.price || 0) * el.count), 
    0
  );

  return (
    <>
      <div className="sale-container">
        <div className="sale-content">
          <div className="sale-header">
            <h1 className="sale-title">Shopping Cart</h1>
            <h2><i>Total items: {basket.items.length}</i></h2>
            <h2><i>Total price: ${totalPrice.toFixed(2)}</i></h2>
          </div>
          <div className="sale-items">
            {itemsArray.map(item => (
              <div key={item.id} className="sale-item">
                <div className="image-container">
                  <img src={`http://localhost:3333/${item.image}`} alt={item.title} className="sale-image" />
                </div>
                <h3 className="sale-item-title">{item.title}</h3>
                <div className="sale-price">
                  {item.discont_price && <span className="new-price">Sale ${item.discont_price.toFixed(2)}</span>}
                  <span className="old-price">${item.price.toFixed(2)}</span>
                </div>
                <div className="quantity-controls">
                  <button onClick={() => basket.decreaseItemCount(item.id)}>-</button>
                  <span>{item.count}</span>
                  <button onClick={() => basket.increaseItemCount(item.id)}>+</button>
                </div>
                {/* <button onClick={() => basket.removeItem(item.id)}>Remove</button> */}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
});

export default ShoppingCartPage;