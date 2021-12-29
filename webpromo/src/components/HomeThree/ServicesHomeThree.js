import React from 'react';
import iconOne from '../../assets/images/icon/1.png';
import iconTwo from '../../assets/images/icon/2.png';
import iconThree from '../../assets/images/icon/3.png';
import iconFour from '../../assets/images/icon/4.png';

function ServicesHomeThree() {
    return (
        <>
            <section className="appie-service-area appie-service-3-area pt-195 pb-100" id="service">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="appie-section-title text-center">
                                <h3 className="appie-title">What you can do</h3>
                                <p>
                                    The full monty spiffing good time no biggie cack grub fantastic.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-md-6">
                            <div
                                className="
                appie-single-service appie-single-services-3
                text-center
                mt-30
                wow
                animated
                fadeInUp
              "
                                data-wow-duration="2000ms"
                                data-wow-delay="200ms"
                            >
                                <div className="icon">
                                    <img src={iconOne} alt="" />
                                </div>
                                <h4 className="appie-title">Easy to use</h4>
                                <p>Mucker plastered bugger all mate morish are.</p>
                                <a href="#">
                                    Read More <i className="fal fa-arrow-right" />
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div
                                className="
                appie-single-service appie-single-services-3
                text-center
                mt-30
                item-2
                wow
                animated
                fadeInUp
              "
                                data-wow-duration="2000ms"
                                data-wow-delay="400ms"
                            >
                                <div className="icon">
                                    <img src={iconTwo} alt="" />
                                </div>
                                <h4 className="appie-title">App Development</h4>
                                <p>Mucker plastered bugger all mate morish are.</p>
                                <a href="#">
                                    Read More <i className="fal fa-arrow-right" />
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div
                                className="
                appie-single-service appie-single-services-3
                text-center
                mt-30
                item-3
                wow
                animated
                fadeInUp
              "
                                data-wow-duration="2000ms"
                                data-wow-delay="600ms"
                            >
                                <div className="icon">
                                    <img src={iconThree} alt="" />
                                </div>
                                <h4 className="appie-title">Fully Functional</h4>
                                <p>Mucker plastered bugger all mate morish are.</p>
                                <a href="#">
                                    Read More <i className="fal fa-arrow-right" />
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div
                                className="
                appie-single-service appie-single-services-3
                text-center
                mt-30
                item-4
                wow
                animated
                fadeInUp
              "
                                data-wow-duration="2000ms"
                                data-wow-delay="800ms"
                            >
                                <div className="icon">
                                    <img src={iconFour} alt="" />
                                </div>
                                <h4 className="appie-title">Secured protocol</h4>
                                <p>Mucker plastered bugger all mate morish are.</p>
                                <a href="#">
                                    Read More <i className="fal fa-arrow-right" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ServicesHomeThree;
