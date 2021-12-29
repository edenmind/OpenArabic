import React from 'react';
import thumb from '../../assets/images/fun-fact-thumb.png';

function HeroService() {
    return (
        <>
            <div className="appie-page-title-area appie-page-service-title-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="appie-page-title-item">
                                <span>Fast Development</span>
                                <h3 className="title">
                                    Simple but effective, <br /> effortless yet powerful.
                                </h3>
                                <div className="thumb">
                                    <img src={thumb} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HeroService;
