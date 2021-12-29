import React from 'react';
import heroThumb from '../../assets/images/hero-thumb-7.png';

function HeroHomeSix() {
    return (
        <>
            <section className="appie-hero-area appie-hero-6-area">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="appie-hero-thumb-6">
                                <div
                                    className="thumb wow animated fadeInUp"
                                    data-wow-duration="1000ms"
                                    data-wow-delay="600ms"
                                >
                                    <img src={heroThumb} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="appie-hero-content appie-hero-content-6">
                                <span>Welcome To Creative App.</span>
                                <h1 className="appie-title">Get started with Appie Template.</h1>
                                <p>
                                    Lost the plot so I said nancy boy I don't want no agro bleeder
                                    bum bag easy peasy cheesed off cheers ruddy.
                                </p>
                                <ul>
                                    <li>
                                        <a href="#">
                                            <i className="fab fa-apple"></i>
                                            <span>
                                                Available on the <span>App Store</span>
                                            </span>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="item-2" href="#">
                                            <i className="fab fa-google-play"></i>
                                            <span>
                                                Available on the <span>Google Play</span>
                                            </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default HeroHomeSix;
