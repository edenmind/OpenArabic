import React from 'react';
import hero from '../../assets/images/hero-thumb-9.png';
import shapeOne from '../../assets/images/shape/1.png';
import shapeTwo from '../../assets/images/shape/2.png';
import shapeThree from '../../assets/images/shape/3.png';
import shapeFour from '../../assets/images/shape/4.png';

function HeroHomeEight() {
    return (
        <>
            <section className="appie-hero-area appie-hero-8-area">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="appie-hero-content appie-hero-content-8">
                                <h1 className="appie-title">We’re a full-range design app</h1>
                                <p>
                                    Jolly good excuse my french boot super my good sir cup of char
                                    richard about chinwag.
                                </p>
                                <ul>
                                    <li>
                                        <a href="#">
                                            <i className="fab fa-google-play" />
                                            <span>Google Play</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="item-2" href="#">
                                            <i className="fab fa-apple" /> <span>App Store</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="appie-hero-thumb-6">
                                <div
                                    className="thumb text-center wow animated fadeInUp"
                                    data-wow-duration="1000ms"
                                    data-wow-delay="600ms"
                                >
                                    <img src={hero} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="home-8-shape-1">
                    <img src={shapeThree} alt="" />
                </div>
                <div className="home-8-shape-2">
                    <img src={shapeFour} alt="" />
                </div>
                <div className="home-8-shape-3">
                    <img src={shapeOne} alt="" />
                </div>
                <div className="home-8-shape-4">
                    <img src={shapeTwo} alt="" />
                </div>
            </section>
        </>
    );
}

export default HeroHomeEight;
