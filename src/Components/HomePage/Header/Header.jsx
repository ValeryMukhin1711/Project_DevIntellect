import React from "react";
import "./Header.css";
import logo from "../../../logo/logo.png";
import basketIcon from "../../../icon/icons.png";
import { Link } from "react-router-dom";
import basket from "../../../store/Basket";
import { observer } from "mobx-react-lite";

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <ul className="navigation">
          <li className="logo">
            <img src={logo} alt="Logo" />
          </li>
          <li><Link to='/'>Main Page</Link></li>
          <li><Link to='/category'>Categories</Link></li>
          <li><Link to='/allproducts'>All products</Link></li>
          <li><Link to='/allsales'>All sales</Link></li>

          <li className="basket-icon">
            <Link to='/shippingcart'>
            <span>{basket.items.length}</span>
            <img src={basketIcon} alt="Basket Icon" />
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default observer(Header);