import React, { useEffect } from 'react';
import logo from '../../assets/images/logo-5.png';
import StickyMenu from '../../lib/StickyMenu';
import Navigation from '../Navigation';

function HeaderHomeFive({ action, cartToggle, searchToggle }) {
    useEffect(() => {
        StickyMenu();
    });
    return (
        <>
            <header className="appie-header-area appie-sticky">
                <div className="container">
                    <div className="header-nav-box header-nav-4-box">
                        <div className="row align-items-center">
                            <div className="col-lg-2 col-md-4 col-sm-5 col-6 order-1 order-sm-1">
                                <div className="appie-logo-box">
                                    <a href="/">
                                        <img src={logo} alt="" />
                                    </a>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-1 col-sm-1 order-3 order-sm-2">
                                <div className="appie-header-main-menu">
                                    <Navigation />
                                </div>
                            </div>
                            <div className="col-lg-4  col-md-7 col-sm-6 col-6 order-2 order-sm-3">
                                <div className="appie-btn-box text-right">
                                    <ul>
                                        <li>
                                            <a
                                                className="search-open"
                                                onClick={(e) => searchToggle(e)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <i className="fal fa-search"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                onClick={cartToggle}
                                                className="cart-btn amm-shopping-cart-open"
                                                href="#"
                                            >
                                                <i className="fal fa-shopping-cart"></i>
                                                <span>2</span>
                                            </a>
                                        </li>
                                    </ul>
                                    <div
                                        onClick={(e) => action(e)}
                                        className="toggle-btn ml-30 canvas_open d-lg-none d-block"
                                    >
                                        <i className="fa fa-bars"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default HeaderHomeFive;
