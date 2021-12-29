import React from 'react';
import serviceThumb from '../../assets/images/service-thumb-1.png';

function ServicesHomeEight() {
    return (
        <>
            <section
                className="appie-services-2-area appie-services-8-area pt-90 pb-55"
                id="service"
            >
                <div className="container">
                    <div className="row align-items-end">
                        <div className="col-lg-6 col-md-8">
                            <div className="appie-section-title">
                                <h3 className="appie-title">Solution for every need.</h3>
                                <p>The app provides design and digital marketing.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-lg-7">
                            <div className="row">
                                <div className="col-lg-6 col-md-6">
                                    <div
                                        className="
                    appie-single-service-2 appie-single-service-about
                    mt-30
                    wow
                    animated
                    fadeInUp
                  "
                                        data-wow-duration="2000ms"
                                        data-wow-delay="200ms"
                                    >
                                        <div className="icon">
                                            <i className="fal fa-tv" />
                                        </div>
                                        <h4 className="title">Carefully designed</h4>
                                        <p>
                                            He lost his bottle loo don't get shirty with me ruddy.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <div
                                        className="
                    appie-single-service-2 appie-single-service-about
                    item-2
                    mt-30
                    wow
                    animated
                    fadeInUp
                  "
                                        data-wow-duration="2000ms"
                                        data-wow-delay="400ms"
                                    >
                                        <div className="icon">
                                            <i className="fal fa-code" />
                                        </div>
                                        <h4 className="title">Clean Modern Code</h4>
                                        <p>
                                            He lost his bottle loo don't get shirty with me ruddy.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <div
                                        className="
                    appie-single-service-2 appie-single-service-about
                    item-3
                    mt-30
                    wow
                    animated
                    fadeInUp
                  "
                                        data-wow-duration="2000ms"
                                        data-wow-delay="600ms"
                                    >
                                        <div className="icon">
                                            <i className="fal fa-user-friends" />
                                        </div>
                                        <h4 className="title">User Interactive</h4>
                                        <p>
                                            He lost his bottle loo don't get shirty with me ruddy.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <div
                                        className="
                    appie-single-service-2 appie-single-service-about
                    item-4
                    mt-30
                    wow
                    animated
                    fadeInUp
                  "
                                        data-wow-duration="2000ms"
                                        data-wow-delay="200ms"
                                    >
                                        <div className="icon">
                                            <i className="fal fa-mobile" />
                                        </div>
                                        <h4 className="title">Choose a App</h4>
                                        <p>
                                            He lost his bottle loo don't get shirty with me ruddy.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="service-thumb">
                                <img src={serviceThumb} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ServicesHomeEight;
