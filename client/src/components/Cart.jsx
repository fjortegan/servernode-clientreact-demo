import React, { Component } from 'react';

import '../components/css/cart.css'; 

  export default class Cart extends Component {

  render() {
    return (
        <div className="cart">
            <div className="shopping-cart">
                <div className="text">
                    <h3>Tu carrito</h3>
                </div>
                <div className="item">
                    <i className="adding fas fa-shopping-basket" attr-shopping="0"></i>
                </div>
            </div>
        </div>
    )
  }
}