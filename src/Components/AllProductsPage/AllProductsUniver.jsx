import Header from '../HomePage/Header/Header';
import Footer from '../HomePage/Footer/Footer';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Sale.css';
import basket from '../../store/Basket';
import AddToBasket from '../Buttons/AddToBasket';
import ShowDetails from '../Buttons/ShowDetails';
import Filter from '../Filters/Filter';
import filterStore from '../../store/FilterStore';
import AllFilter  from '../Filters/AllFilter';
import selectedproduct from '../../store/SelectedProduct';
import selectedсategory from "../../store/SelectedCategory";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'


const AllProductsUniver = (props,page_title,category) => {
  console.log('props',props.category)
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortField, setSortField] = useState('default');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [discounted, setDiscounted] = useState(false);
  const [sectionTitle, setsectionTitle] = useState('')
  const navigate = useNavigate();


  // if( props.props === 'discounted') {
  //   console.log('setDiscounted(true)','discounted=',discounted)
  //   setDiscounted(true)
  // }

  // setProducts(filterStore.products);
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {

        const response = await axios.get('http://localhost:3333/products/all');
        // }
        // let filteredProducts = filterStore.products;
        let filteredProducts = response.data;
        console.log('filteredProducts',filteredProducts)
        setsectionTitle('All Products')
        
        // if (minPrice) {

        //   filteredProducts = filteredProducts.filter(p => p.price >= Number(minPrice));
         
        // }
        if (minPrice) {
          
          filteredProducts = filteredProducts.filter((p) => {
            const price_final = p.discont_price?p.discont_price : p.price;
           return price_final >= Number(minPrice)});
        }
        if (maxPrice) {
          
          filteredProducts = filteredProducts.filter((p) => {
            const price_final = p.discont_price?p.discont_price : p.price;
           return price_final <= Number(maxPrice)});
        }

        if (discounted) {
          filteredProducts = filteredProducts.filter(p => p.discont_price !== null && p.discont_price < p.price);
        }


        if (props.props === 'discounted') {
          filteredProducts = filteredProducts.filter(p => p.discont_price !== null && p.discont_price < p.price);
          setsectionTitle('All Sale')
        }

        if (props.category === 'category') {
          
      

          

          filteredProducts = filteredProducts.filter(p => p.categoryId === selectedсategory.selectedCategory.id);
          setsectionTitle('Products in category ' + selectedсategory.selectedCategory.title)
           }

        

        if (sortField === 'price_asc') {
          filteredProducts.sort((a, b) => {
            const a_final = a.discont_price !==null? a.discont_price:a.price
            const b_final = b.discont_price !==null? b.discont_price:b.price
            return (a_final - b_final)});

        } else if (sortField === 'price_desc') {

          filteredProducts.sort((a, b) => {
            const a_final = a.discont_price !==null? a.discont_price:a.price
            const b_final = b.discont_price !==null? b.discont_price:b.price
            return (b_final - a_final)});
        } 
        else if (sortField === 'discount_desc') {
          filteredProducts.sort((a, b) => ((b.price - (b.discont_price || b.price)) / b.price * 100) - ((a.price - (a.discont_price || a.price)) / a.price * 100));
        }

        setProducts(filteredProducts);
        // setProducts(filterStore.filterItem.products);
      } catch (err) {

          navigate('/');
  
        setError('Ошибка при загрузке товаров');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [sortField, minPrice, maxPrice, discounted,props.page_title]);

  return (
    <>
      {/* <Header /> */}
      {/* <AllFilter/> */}
      {/* <Filter/> */}
      <div className="sale-container">
        <div className="sale-content">
          <h1 className="sale-title">{sectionTitle}</h1>
          <div className="filters">
            <span><h3>Price</h3></span>
            <input type="number" placeholder="from" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
            <input type="number" placeholder="to" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
            
            
            <span><h3>Discounted</h3></span><input type="checkbox" checked={discounted} onChange={(e) => setDiscounted(e.target.checked)} />
              
            
            <span><h3>Sorted</h3></span><select value={sortField} onChange={(e) => setSortField(e.target.value)}>
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
                  <img src={`http://localhost:3333/${item.image}`} alt={item.title} className="sale-image" onClick={() => selectedproduct.addItem(item)} />
                  </Link>
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
      {/* <Footer /> */}
    </>
  );
};

export default AllProductsUniver