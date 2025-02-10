import React from "react";
import "../Header/Header.css";
import logo from "../../../logo/logo.png";
import basketIcon from "../../../icon/icons.png";
import { Link } from "react-router-dom";
import basket from "../../../store/Basket";
import { observer } from "mobx-react-lite";

function Header() {
  return (
    <header className="header">
      
      <Link to='/' className="logo">
      <img src={logo} alt="Logo" />
      </Link>
            
          

        <ul className="navigation">
          <Link to='/' className="link">Main Page</Link>
          <Link to='/category' className="link">Categories</Link>
          <Link to='/allproducts' className="link">All products</Link>
          <Link to='/allsales' className="link">All sales</Link>
        </ul>

        
            <Link to='/shippingcart' className="basket-icon">

            
            <span className="basket-products-count">{basket.items.length}</span>
            <img src={basketIcon} alt="Basket Icon" />
            
            
            </Link>
      
      
    </header>
  );
}

export default observer(Header);