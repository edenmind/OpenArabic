import React from 'react';
import counterIconOne from '../../assets/images/icon/counter-icon-1.svg';
import counterIconTwo from '../../assets/images/icon/counter-icon-2.svg';
import counterIconThree from '../../assets/images/icon/counter-icon-3.svg';
import counterIconFour from '../../assets/images/icon/counter-icon-4.svg';
import CounterUpCom from '../../lib/CounterUpCom';

function CounterArea({ style }) {
    return (
        <>
            <section className="appie-counter-area pt-90 pb-190" id="counter" style={style}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="appie-section-title">
                                <h3 className="appie-title">How does it work</h3>
                                <p>
                                    The full monty spiffing good time no biggie cack grub fantastic.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-md-6">
                            <div
                                className="appie-single-counter mt-30 wow animated fadeInUp"
                                data-wow-duration="2000ms"
                                data-wow-delay="200ms"
                            >
                                <div className="counter-content">
                                    <div className="icon">
                                        <img src={counterIconOne} alt="" />
                                    </div>
                                    <h3 className="title">
                                        <span className="counter-item">
                                            <CounterUpCom endValue={100} sectionSelect="counter" />
                                        </span>
                                        k+
                                    </h3>
                                    <p>Active Installation</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div
                                className="appie-single-counter mt-30 item-2 wow animated fadeInUp"
                                data-wow-duration="2000ms"
                                data-wow-delay="400ms"
                            >
                                <div className="counter-content">
                                    <div className="icon">
                                        <img src={counterIconTwo} alt="" />
                                    </div>
                                    <h3 className="title">
                                        <span className="counter-item">
                                            <CounterUpCom endValue={108} sectionSelect="counter" />
                                        </span>
                                        +
                                    </h3>
                                    <p>Active Installation</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div
                                className="appie-single-counter mt-30 item-3 wow animated fadeInUp"
                                data-wow-duration="2000ms"
                                data-wow-delay="600ms"
                            >
                                <div className="counter-content">
                                    <div className="icon">
                                        <img src={counterIconThree} alt="" />
                                    </div>
                                    <h3 className="title">
                                        <span className="counter-item">
                                            <CounterUpCom endValue={307} sectionSelect="counter" />
                                        </span>
                                        +
                                    </h3>
                                    <p>Active Installation</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div
                                className="appie-single-counter mt-30 item-4 wow animated fadeInUp"
                                data-wow-duration="2000ms"
                                data-wow-delay="800ms"
                            >
                                <div className="counter-content">
                                    <div className="icon">
                                        <img src={counterIconFour} alt="" />
                                    </div>
                                    <h3 className="title">
                                        <span className="counter-item">
                                            <CounterUpCom endValue={725} sectionSelect="counter" />
                                        </span>
                                        k+
                                    </h3>
                                    <p>Active Installation</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default CounterArea;
