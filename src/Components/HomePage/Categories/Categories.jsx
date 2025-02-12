import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Categories.css";
import selectedсategory from "../../../store/SelectedCategory";
import { Link } from "react-router-dom";

// import store from "../../store";

// const imagesArr = Object.entries(images)

const Categories = () => {
  

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3333/categories/all");
        console.log('response.data',response.data)
        // console.log('run setCategories')

        const randomCategories = response.data.sort(() => Math.random() - 0.5)
        setCategories(randomCategories.slice(0,4));
        // console.log('categories',categories)
      } catch (err) {
        setError("Ошибка при загрузке категорий");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p> Загрузка...</p>;
  if (error) return <p>{error}</p>;
  console.log('categories before return',categories);

  return (

    <div className="main-container">
        <div className="category-list">
          <h1 className="h-categories">Categories</h1>
          <div className='line'></div>

          <Link to='/categories'>
          <button className='all-categories-button'>All categories</button>
          </Link> 
        </div>

        <div className="categories-images">
          {categories.map((category) => (
            <div key={category.id} className="categories-item">

              <Link to={`/categoryproducts/${category.id}`}>
              <img className='img_category'
                // src={imagesArr[category.id][1]}
                src={`http://localhost:3333/${category.image}`}
                alt='productImage'
                onClick={()=>selectedсategory.addItem(category)}
                />
              </Link>

              <h3 className="categories-text">{category.title}</h3>
            </div>           
          ))}
        </div>
      </div>
  );
};

export default Categories;