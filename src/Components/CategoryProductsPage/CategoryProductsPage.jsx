import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../HomePage/Header/Header';
import Footer from '../HomePage/Footer/Footer';
import selectedcategory from '../../store/SelectedCategory';
import selectedproduct from '../../store/SelectedProduct';
import AddToBasket from '../Buttons/AddToBasket';
import ShowDetails from '../Buttons/ShowDetails';
import './Sale.css';

export const CategoryProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // 👈 Хук для навигации

  useEffect(() => {
    // Если категории нет — переходим на главную страницу
    if (!selectedcategory.selectedCategory) {
      navigate('/');
      return;
    }

    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3333/products/all');
        setProducts(response.data);
      } catch (err) {
        setError('Ошибка при загрузке products');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [navigate]);

  const items = products.filter(
    (el) => el.categoryId === selectedcategory.selectedCategory?.id
  );

  return (
    <>
      <Header />
      <div className="sale-container">
        <div className="sale-content">
          <h1 className="sale-title">
            Products in category {selectedcategory.selectedCategory?.title}
          </h1>
          <div className="sale-items">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              items.map((item) => (
                <div key={item.id} className="sale-item">
                  <img
                    src={`http://localhost:3333/${item.image}`}
                    alt={item.title}
                    className="sale-image"
                    onClick={() => selectedproduct.addItem(item)}
                  />
                  <h3 className="sale-item-title">{item.title}</h3>
                  {item.discont_price && <span className="new-price">${item.discont_price.toFixed(2)}</span>}
                  <span className="old-price">${item.price.toFixed(2)}</span>
                  <AddToBasket item={item} />
                  <ShowDetails value={item} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};