import React from 'react';
import aboutThumb from '../../assets/images/about-thumb.png';

function AboutHomeTwo() {
    return (
        <>
            <section className="appie-about-area mb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div
                                className="appie-about-box wow animated fadeInUp"
                                data-wow-duration="2000ms"
                                data-wow-delay="200ms"
                            >
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="about-thumb">
                                            <img src={aboutThumb} alt="" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="appie-about-content">
                                            <span>Marketing</span>
                                            <h3 className="title">
                                                Make a lasting impression with appie.
                                            </h3>
                                            <p>
                                                Jolly good quaint james bond victoria sponge happy
                                                days cras arse over blatant.
                                            </p>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="appie-about-service mt-30">
                                                    <div className="icon">
                                                        <i className="fal fa-check" />
                                                    </div>
                                                    <h4 className="title">Carefully designed</h4>
                                                    <p>
                                                        Mucker plastered bugger all mate morish are.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="appie-about-service mt-30">
                                                    <div className="icon">
                                                        <i className="fal fa-check" />
                                                    </div>
                                                    <h4 className="title">Choose a App</h4>
                                                    <p>
                                                        Mucker plastered bugger all mate morish are.
                                                    </p>
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

export default AboutHomeTwo;
