import React from 'react';
import shape13 from '../../assets/images/shape/shape-13.png';
import shape14 from '../../assets/images/shape/shape-14.png';
import shape15 from '../../assets/images/shape/shape-15.png';
import trafficThumb from '../../assets/images/traffic-thumb-2.png';

function FeaturesHomeFour() {
    return (
        <>
            <section
                className="appie-features-area-2 appie-features-area-5 pt-90 pb-100"
                id="features"
            >
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-12">
                            <div className="appie-section-title text-center">
                                <h3 className="appie-title">
                                    Wherever you need <br /> us the most
                                </h3>
                                <p>
                                    The full monty spiffing good time no biggie cack grub fantastic.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-30 align-items-center">
                        <div className="col-lg-6">
                            <div className="appie-features-boxes ">
                                <div className="appie-features-box-item appie-features-box-5-item">
                                    <h4 className="title">Well Integrated</h4>
                                    <p>The bee's knees chancer car boot absolutely.</p>
                                </div>
                                <div className="appie-features-box-item item-2 appie-features-box-5-item">
                                    <h4 className="title">Clean and modern Design</h4>
                                    <p>The bee's knees chancer car boot absolutely.</p>
                                </div>
                                <div className="appie-features-box-item item-3 appie-features-box-5-item">
                                    <h4 className="title">Light and dark mode</h4>
                                    <p>The bee's knees chancer car boot absolutely.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div
                                className="appie-features-thumb wow animated fadeInRight"
                                data-wow-duration="2000ms"
                                data-wow-delay="200ms"
                            >
                                <img src={trafficThumb} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="features-shape-1">
                    <img src={shape13} alt="" />
                </div>
                <div className="features-shape-2">
                    <img src={shape14} alt="" />
                </div>
                <div className="features-shape-3">
                    <img src={shape15} alt="" />
                </div>
            </section>
        </>
    );
}

export default FeaturesHomeFour;
