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
        console.log('run setCategories')
        setCategories(response.data);
        console.log('categories',categories)
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
  console.log('categories before return',categories)
  return (
    <div className="all-categories-block">
        
        <div className='nav-buttons'>
          <Link to='/'><button className='mainPage-nav'>Main page</button></Link>
          {/* <div className='line-between'></div> */}
          <button className='categories-nav'>Categories</button>
        </div>
        <h1 className='h-allCaterogiesPage'>Categories</h1>


        <div className="category-images">
          {categories.map((category) => (
            
            <div key={category.id} className="category-item">
              
              <Link to='/categoryproducts'>
              <img className='img_categories'
                // src={imagesArr[category.id][1]}
                src={`http://localhost:3333/${category.image}`}
                alt={category.title}
                onClick={()=>selectedсategory.addItem(category)}
                />
              </Link>
              <h3 className="category-text">{category.title}</h3>
              {/* <h3 className="categories-id">{category.id}</h3> */}
            </div>
          ))}
        </div>
      </div>
  );
};

export default Categories;