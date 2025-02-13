import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import filterStore from '../../store/FilterStore';

function Filter() {
  // const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const [sortField, setSortField] = useState('default');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [discounted, setDiscounted] = useState(false);

  // setMaxPrice(filterStore.minPrice)
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     setLoading(true);
  //     setError(null);
  //     try {
  //       const response = await axios.get('http://localhost:3333/products/all');
  //       let filteredProducts = response.data;

  //       if (minPrice) {
  //         filteredProducts = filteredProducts.filter(
  //           (p) => p.price >= Number(minPrice)
  //         );
  //       }
  //       if (maxPrice) {
  //         filteredProducts = filteredProducts.filter(
  //           (p) => p.price <= Number(maxPrice)
  //         );
  //       }

  //       if (discounted) {
  //         filteredProducts = filteredProducts.filter(
  //           (p) => p.discont_price !== null && p.discont_price < p.price
  //         );
  //       }

  //       if (sortField === 'price_asc') {
  //         filteredProducts.sort((a, b) => a.price - b.price);
  //       } else if (sortField === 'price_desc') {
  //         filteredProducts.sort((a, b) => b.price - a.price);
  //       } else if (sortField === 'discount_desc') {
  //         filteredProducts.sort(
  //           (a, b) =>
  //             ((b.price - (b.discont_price || b.price)) / b.price) * 100 -
  //             ((a.price - (a.discont_price || a.price)) / a.price) * 100
  //         );
  //       }

  //       setProducts(filteredProducts);
  //     } catch (err) {
  //       setError('Ошибка при загрузке товаров');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchProducts();
  // // }, [sortField, minPrice, maxPrice, discounted]);
  // }, []);

  return (
    <div className="filters">
      <h1>Filter</h1>
      <input
        type="number"
        placeholder="Min Price"
        value={filterStore.minPrice}
        onChange={(e) => {
          
          setMinPrice(e.target.value)
          // filterStore.setMinPrice(e.target.value)
          filterStore.setMinPrice(e.target.value)
          console.log('in Filter filterStore.minPrice',filterStore.filterItem.minPrice)
          
        }}
      />
      <input
        type="number"
        placeholder="Max Price"
        value={filterStore.minPrice}
        onChange={(e) => {setMaxPrice(e.target.value)
          filterStore.setMaxPrice(e.target.value)  
        }}
      />
      <label>
        <input
          type="checkbox"
          checked={discounted}
          onChange={(e) => setDiscounted(e.target.checked)}
        />
        Discounted items
      </label>
      {/* <select value={sortField} onChange={(e) => setSortField(e.target.value)}>
        <option value="default">By default</option>
        <option value="price_asc">Price ascending</option>
        <option value="price_desc">Price descending</option>
        <option value="discount_desc">Biggest discount</option>
      </select> */}
    </div>
  );
}

export default Filter;
