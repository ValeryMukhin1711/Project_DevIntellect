import React from 'react';
// import basket from '../../store/Basket';
import basket from '../../store/Basket';
import './buttons.css'

function AddToBasket({value}) {
  // console.log('AddtoBasket item',value)
  return (
    <div>
      <button className="add-button" id ="add-button" onClick={() => basket.addItem(value)}>AddToBasket</button>
    </div>
  );
}

export default AddToBasket;
