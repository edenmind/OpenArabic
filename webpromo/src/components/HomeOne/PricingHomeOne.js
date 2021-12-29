import React, { useState } from 'react';

function PricingHomeOne({ className }) {
    const [toggleSwitch, setSwitchValue] = useState(true);
    return (
        <>
            <section className={`appie-pricing-area pt-90 pb-90 ${className || ''}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="appie-section-title text-center">
                                <h3 className="appie-title">Choose your plan</h3>
                                <p>Different layouts and styles for team sections.</p>
                            </div>
                            <ul
                                className="list-inline text-center switch-toggler-list"
                                role="tablist"
                                id="switch-toggle-tab"
                            >
                                <li className={`month ${toggleSwitch ? 'active' : ''}`}>
                                    <a href="#">Monthly</a>
                                </li>
                                <li>
                                    <label
                                        onClick={() => setSwitchValue(!toggleSwitch)}
                                        className={`switch ${toggleSwitch ? 'on' : 'off'}`}
                                    >
                                        <span className="slider round" />
                                    </label>
                                </li>
                                <li className={`year ${toggleSwitch === false ? 'active' : ''}`}>
                                    <a href="#">Annualy</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="tabed-content">
                        {toggleSwitch ? (
                            <div id="month">
                                <div className="row justify-content-center">
                                    <div className="col-lg-4 col-md-6 wow animated fadeInLeft">
                                        <div className="pricing-one__single">
                                            <div className="pricig-heading">
                                                <h6>Fresh</h6>
                                                <div className="price-range">
                                                    <sup>$</sup> <span>04</span>
                                                    <p>/month</p>
                                                </div>
                                                <p>Get your 14 day free trial</p>
                                            </div>
                                            <div className="pricig-body">
                                                <ul>
                                                    <li>
                                                        <i className="fal fa-check" /> 60-day chat
                                                        history
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> 15 GB cloud
                                                        storage
                                                    </li>
                                                </ul>
                                                <div className="pricing-btn mt-35">
                                                    <a className="main-btn" href="#">
                                                        Choose plan
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6 wow animated fadeInUp">
                                        <div className="pricing-one__single center">
                                            <div className="pricig-heading">
                                                <h6>Sweet</h6>
                                                <div className="price-range">
                                                    <sup>$</sup> <span>16</span>
                                                    <p>/month</p>
                                                </div>
                                                <p>Billed $276 per website annually.</p>
                                            </div>
                                            <div className="pricig-body">
                                                <ul>
                                                    <li>
                                                        <i className="fal fa-check" /> 60-day chat
                                                        history
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> 50 GB cloud
                                                        storage
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> 24/7 Support
                                                    </li>
                                                </ul>
                                                <div className="pricing-btn mt-35">
                                                    <a className="main-btn" href="#">
                                                        Choose plan
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="pricing-rebon">
                                                <span>Most Popular</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6 wow animated fadeInRight">
                                        <div className="pricing-one__single">
                                            <div className="pricig-heading">
                                                <h6>Juicy</h6>
                                                <div className="price-range">
                                                    <sup>$</sup> <span>27</span>
                                                    <p>/month</p>
                                                </div>
                                                <p>Billed $276 per website annually.</p>
                                            </div>
                                            <div className="pricig-body">
                                                <ul>
                                                    <li>
                                                        <i className="fal fa-check" /> 60-day chat
                                                        history
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Data security
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> 100 GB cloud
                                                        storage
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> 24/7 Support
                                                    </li>
                                                </ul>
                                                <div className="pricing-btn mt-35">
                                                    <a className="main-btn" href="#">
                                                        Choose plan
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div id="year">
                                <div className="row justify-content-center">
                                    <div className="col-lg-4 col-md-6 wow animated fadeInLeft">
                                        <div className="pricing-one__single">
                                            <div className="pricig-heading">
                                                <h6>Fresh</h6>
                                                <div className="price-range">
                                                    <sup>$</sup> <span>32</span>
                                                    <p>/Yearly</p>
                                                </div>
                                                <p>Get your 14 day free trial</p>
                                            </div>
                                            <div className="pricig-body">
                                                <ul>
                                                    <li>
                                                        <i className="fal fa-check" /> 60-day chat
                                                        history
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> 15 GB cloud
                                                        storage
                                                    </li>
                                                </ul>
                                                <div className="pricing-btn mt-35">
                                                    <a className="main-btn" href="#">
                                                        Choose plan
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6 wow animated fadeInUp">
                                        <div className="pricing-one__single center">
                                            <div className="pricig-heading">
                                                <h6>Sweet</h6>
                                                <div className="price-range">
                                                    <sup>$</sup> <span>116</span>
                                                    <p>/Yearly</p>
                                                </div>
                                                <p>Billed $276 per website annually.</p>
                                            </div>
                                            <div className="pricig-body">
                                                <ul>
                                                    <li>
                                                        <i className="fal fa-check" /> 60-day chat
                                                        history
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> 50 GB cloud
                                                        storage
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> 24/7 Support
                                                    </li>
                                                </ul>
                                                <div className="pricing-btn mt-35">
                                                    <a className="main-btn" href="#">
                                                        Choose plan
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="pricing-rebon">
                                                <span>Most Popular</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6 wow animated fadeInRight">
                                        <div className="pricing-one__single">
                                            <div className="pricig-heading">
                                                <h6>Juicy</h6>
                                                <div className="price-range">
                                                    <sup>$</sup> <span>227</span>
                                                    <p>/Yearly</p>
                                                </div>
                                                <p>Billed $276 per website annually.</p>
                                            </div>
                                            <div className="pricig-body">
                                                <ul>
                                                    <li>
                                                        <i className="fal fa-check" /> 60-day chat
                                                        history
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Data security
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> 100 GB cloud
                                                        storage
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> 24/7 Support
                                                    </li>
                                                </ul>
                                                <div className="pricing-btn mt-35">
                                                    <a className="main-btn" href="#">
                                                        Choose plan
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}

export default PricingHomeOne;
