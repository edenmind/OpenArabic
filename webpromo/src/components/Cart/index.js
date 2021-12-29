import React from 'react';
import cart1 from '../../assets/images/cart-1.jpg';
import cart2 from '../../assets/images/cart-2.jpg';

function Cart({ value, action }) {
    return (
        <div className="amm-shopping-cart-wrapper">
            <div className={`amm-shopping-cart-canvas ${value ? 'open' : ''}`}>
                <div className="amm-shopping_cart">
                    <div className="amm-shopping_cart-top-bar d-flex justify-content-between">
                        <h6>Shopping Cart</h6>
                        <button type="button" onClick={action} className="amm-shopping-cart-close">
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                    <div className="amm-shopping_cart-list-items mt-30">
                        <ul>
                            <li>
                                <div className="amm-single-shopping-cart media">
                                    <div className="cart-image">
                                        <img src={cart1} alt="Cart" />
                                    </div>
                                    <div className="cart-content media-body pl-15">
                                        <h6>
                                            <a href="#">Banana</a>
                                        </h6>
                                        <span className="quality">QTY: 01</span>
                                        <span className="price">$205.00</span>
                                        <a className="remove" href="#">
                                            <i className="fa fa-times"></i>
                                        </a>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="amm-single-shopping-cart media">
                                    <div className="cart-image">
                                        <img src={cart2} alt="Cart" />
                                    </div>
                                    <div className="cart-content media-body pl-15">
                                        <h6>
                                            <a href="#">Grape</a>
                                        </h6>
                                        <span className="quality">QTY: 01</span>
                                        <span className="price-discount">$205.00</span>
                                        <span className="price-close">$205.00</span>
                                        <a className="remove" href="#">
                                            <i className="fa fa-times"></i>
                                        </a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="amm-shopping_cart-btn">
                        <div className="total pt-35 d-flex justify-content-between">
                            <h5>Subtotal:</h5>
                            <p>$240.00</p>
                        </div>
                        <div className="cart-btn pt-25">
                            <a className="main-btn" href="#">
                                View Cart
                            </a>
                            <a className="main-btn main-btn-2" href="#">
                                Checkout
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`overlay ${value ? 'open' : ''}`}></div>
        </div>
    );
}

export default Cart;
