import React, { useState } from 'react';

function PricingHomeTwo() {
    const [toggleSwitch, setSwitchValue] = useState(true);
    const handleSwitch = (e) => {
        e.preventDefault();
        setSwitchValue(!toggleSwitch);
    };
    return (
        <>
            <section className="appie-pricing-2-area pb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="appie-section-title text-center">
                                <h3 className="appie-title">Simple pricing for Everyone</h3>
                                <p>
                                    The full monty spiffing good time no biggie cack grub fantastic.
                                </p>
                                <div className="appie-pricing-tab-btn">
                                    <ul
                                        className="nav nav-pills mb-3"
                                        id="pills-tab"
                                        role="tablist"
                                    >
                                        <li className="nav-item" role="presentation">
                                            <a
                                                onClick={(e) => handleSwitch(e)}
                                                className={`nav-link  ${
                                                    toggleSwitch ? 'active' : ''
                                                }`}
                                                href="#"
                                                type="button"
                                                role="tab"
                                            >
                                                Monthly
                                            </a>
                                        </li>
                                        <li
                                            className={`nav-item ${toggleSwitch ? 'on' : 'off'}`}
                                            role="presentation"
                                        >
                                            <a
                                                onClick={(e) => handleSwitch(e)}
                                                className={`nav-link  ${
                                                    toggleSwitch === false ? 'active' : ''
                                                }`}
                                                href="#"
                                                type="button"
                                                role="tab"
                                            >
                                                Yearly
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="tab-content" id="pills-tabContent">
                                <div
                                    className={`tab-pane fade ${toggleSwitch ? 'active show' : ''}`}
                                    id="pills-home"
                                    role="tabpanel"
                                    aria-labelledby="pills-home-tab"
                                >
                                    <div className="row justify-content-center">
                                        <div className="col-lg-4 col-md-6">
                                            <div
                                                className="
                        pricing-one__single pricing-one__single_2
                        wow
                        animated
                        fadeInLeft
                      "
                                            >
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
                                                            <i className="fal fa-check" /> 60-day
                                                            chat history
                                                        </li>
                                                        <li>
                                                            <i className="fal fa-check" /> 15 GB
                                                            cloud storage
                                                        </li>
                                                        <li>
                                                            <i className="fal fa-check" /> 24/7
                                                            Support
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
                                        <div className="col-lg-4 col-md-6">
                                            <div
                                                className="
                        pricing-one__single pricing-one__single_2
                        active
                        wow
                        animated
                        fadeInUp
                      "
                                            >
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
                                                            <i className="fal fa-check" /> 60-day
                                                            chat history
                                                        </li>
                                                        <li>
                                                            <i className="fal fa-check" /> 50 GB
                                                            cloud storage
                                                        </li>
                                                        <li>
                                                            <i className="fal fa-check" /> 24/7
                                                            Support
                                                        </li>
                                                    </ul>
                                                    <div className="pricing-btn mt-35">
                                                        <a className="main-btn" href="#">
                                                            Choose plan
                                                        </a>
                                                    </div>
                                                    <div className="pricing-rebon">
                                                        <span>Most Popular</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6">
                                            <div
                                                className="
                        pricing-one__single pricing-one__single_2
                        item-2
                        wow
                        animated
                        fadeInRight
                      "
                                            >
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
                                                            <i className="fal fa-check" /> 60-day
                                                            chat history
                                                        </li>
                                                        <li>
                                                            <i className="fal fa-check" /> Data
                                                            security
                                                        </li>
                                                        <li>
                                                            <i className="fal fa-check" /> 100 GB
                                                            cloud storage
                                                        </li>
                                                        <li>
                                                            <i className="fal fa-check" /> 24/7
                                                            Support
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
                                <div
                                    className={`tab-pane fade ${
                                        toggleSwitch === false ? 'active show' : ''
                                    }`}
                                    id="pills-profile"
                                    role="tabpanel"
                                    aria-labelledby="pills-profile-tab"
                                >
                                    <div className="row justify-content-center">
                                        <div className="col-lg-4 col-md-6">
                                            <div
                                                className="
                        pricing-one__single pricing-one__single_2
                        animated
                        fadeInLeft
                      "
                                            >
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
                                                            <i className="fal fa-check" /> 60-day
                                                            chat history
                                                        </li>
                                                        <li>
                                                            <i className="fal fa-check" /> 15 GB
                                                            cloud storage
                                                        </li>
                                                        <li>
                                                            <i className="fal fa-check" /> 24/7
                                                            Support
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
                                        <div className="col-lg-4 col-md-6">
                                            <div
                                                className="
                        pricing-one__single pricing-one__single_2
                        active
                        animated
                        fadeInUp
                      "
                                            >
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
                                                            <i className="fal fa-check" /> 60-day
                                                            chat history
                                                        </li>
                                                        <li>
                                                            <i className="fal fa-check" /> 50 GB
                                                            cloud storage
                                                        </li>
                                                        <li>
                                                            <i className="fal fa-check" /> 24/7
                                                            Support
                                                        </li>
                                                    </ul>
                                                    <div className="pricing-btn mt-35">
                                                        <a className="main-btn" href="#">
                                                            Choose plan
                                                        </a>
                                                    </div>
                                                    <div className="pricing-rebon">
                                                        <span>Most Popular</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6">
                                            <div
                                                className="
                        pricing-one__single pricing-one__single_2
                        item-2
                        animated
                        fadeInRight
                      "
                                            >
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
                                                            <i className="fal fa-check" /> 60-day
                                                            chat history
                                                        </li>
                                                        <li>
                                                            <i className="fal fa-check" /> Data
                                                            security
                                                        </li>
                                                        <li>
                                                            <i className="fal fa-check" /> 100 GB
                                                            cloud storage
                                                        </li>
                                                        <li>
                                                            <i className="fal fa-check" /> 24/7
                                                            Support
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
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default PricingHomeTwo;
