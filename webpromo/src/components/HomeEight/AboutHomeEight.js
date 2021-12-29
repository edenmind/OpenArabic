import React from 'react';
import thumb4 from '../../assets/images/about-thumb-4.png';
import thumb5 from '../../assets/images/about-thumb-5.png';

function AboutHomeEight() {
    return (
        <>
            <section className="appie-about-8-area pt-100 pb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="appie-section-title mb-30">
                                <h3 className="appie-title">
                                    We bring everything <br />
                                    that's required to build apps
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-7">
                            <div className="appie-about-8-box">
                                <h3 className="title">
                                    Will my Template be <br />
                                    Mobile Friendly
                                </h3>
                                <p>
                                    A load of old tosh spiffing pear shaped show <br />
                                    off pick your nose and blow
                                </p>
                                <a className="main-btn" href="#">
                                    Learn More <i className="fal fa-arrow-right" />
                                </a>
                                <div className="thumb">
                                    <img src={thumb4} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="appie-about-8-box">
                                <h3 className="title">
                                    Website & Mobile <br />
                                    App Design
                                </h3>
                                <p>
                                    A load of old tosh spiffing pear shaped show <br />
                                    off pick your nose and blow
                                </p>
                                <a className="main-btn" href="#">
                                    Learn More <i className="fal fa-arrow-right" />
                                </a>
                                <div className="thumb mr-30">
                                    <img src={thumb5} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default AboutHomeEight;
