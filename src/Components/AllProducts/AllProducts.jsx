import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./AllProducts.css";
// import Header from "../../Header/Header";
// import Footer from "../../Footer/Footer";
import Header from "../HomePage/Header/Header";
import Footer from "../HomePage/Footer/Footer";

// import GoogleMaps from "../../GoogleMaps/GoogleMaps";

const AllProducts = () => {
  const { id: categoryId } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [sortField, setSortField] = useState("default");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [discounted, setDiscounted] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("http://localhost:3333/products/all");
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
          filteredProducts = filteredProducts.filter(p => p.discount);
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
        setError("Ошибка при загрузке товаров");
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, [categoryId, sortField, minPrice, maxPrice, discounted]);
  

  return (
    <>
      {/* <Header /> */}
      <div className="buttons">
        <Link to="/">
          <button className="btn">Main page</button>
        </Link>
        <Link to="/categories">
          <button className="btn">Categories</button>
        </Link>
        <Link to="/products">
          <button className="current__page__btn">All products</button>
        </Link>
      </div>

      <div className="products-list container">
        <h1 className="title-2">All Products</h1>

        {/* Фильтры и сортировка */}
        <div className="filters">
          <div>
            <label className="label">Price </label>
            <input
              type="number"
              placeholder="from"
              value={minPrice}
              onChange={(e) => {
                const value = e.target.value;
                setMinPrice(value ? Number(value) : "");
                console.log("minPrice", value);
              }}
            />
            <input
              type="number"
              placeholder="to"
              value={maxPrice}
              onChange={(e) => {
                const value = e.target.value;
                setMaxPrice(value ? Number(value) : "");
                console.log("maxPrice", value);
              }}
            />
          </div>
          <div>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={discounted}
                onChange={(e) => {
                  setDiscounted(e.target.checked);
                  console.log("discounted", e.target.checked);
                }}
              />
              Discounted items
            </label>
          </div>

          <div>
            <label className="label">Sorted </label>
            <select
              className="sorted"
              value={sortField}
              onChange={(e) => {
                setSortField(e.target.value);
                console.log("sortField", e.target.value);
              }}
            >
              <option value="default">by default</option>
              <option value="price_asc">Price ascending</option>
              <option value="price_desc">Price descending</option>
              <option value="discount_desc">Biggest discount</option>
            </select>
          </div>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="products-cards">
            {products.map((product) => (
              <div key={product.id} className="product-item">
                {product.discount && (
                  <span className="discount-label">-{product.discount}%</span>
                )}
                <img
                  src={`http://localhost:3333/${product.image}`}
                  alt={product.name}
                />
                <h3>{product.name}</h3>
                <p className="product-price">
                  ${product.price}{" "}
                  {product.oldPrice && <s>${product.oldPrice}</s>}
                </p>
                <button className="add-to-cart">Add to cart</button>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* <Footer /> */}
      {/* <GoogleMaps /> */}
    </>
  );
};

export default AllProducts;
            