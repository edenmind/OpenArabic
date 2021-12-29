import React from 'react';
import logo from '../../assets/images/logo-7.png';

function SearchModule({ value, searchToggle }) {
    return (
        <>
            <div className={`search-box ${value ? 'open' : ''}`}>
                <div className="search-header">
                    <div className="container mt-60">
                        <div className="row">
                            <div className="col-6">
                                <h5 className="search-title">
                                    <img src={logo} alt="" />
                                </h5>
                            </div>
                            <div className="col-6">
                                <div className="search-close text-right">
                                    <button
                                        onClick={searchToggle}
                                        type="button"
                                        className="search-close-btn"
                                    >
                                        Close <span></span>
                                        <span></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="search-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="search-form">
                                    <form action="#">
                                        <input type="text" placeholder="Search for Products" />
                                        <button type="button">
                                            <i className="fa fa-search"></i>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SearchModule;
