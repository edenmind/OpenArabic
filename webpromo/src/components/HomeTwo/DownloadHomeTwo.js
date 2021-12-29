import React from 'react';
import shape13 from '../../assets/images/shape/shape-13.png';
import shape14 from '../../assets/images/shape/shape-14.png';
import shape15 from '../../assets/images/shape/shape-15.png';

function DownloadHomeTwo({ className }) {
    return (
        <>
            <section className={`appie-download-area pt-150 pb-160 mb-90 ${className || ''}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="appie-download-content">
                                <span>Download Our App</span>
                                <h3 className="title">
                                    App is available <br />
                                    for free on app store
                                </h3>
                                <p>
                                    Jolly good quaint james bond victoria sponge happy days cras
                                    arse over blatant.
                                </p>
                                <ul>
                                    <li>
                                        <a href="#">
                                            <i className="fab fa-apple" />
                                            <span>
                                                Download for <span>iOS</span>
                                            </span>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="item-2" href="#">
                                            <i className="fab fa-google-play" />
                                            <span>
                                                Download for <span>Android</span>
                                            </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="download-shape-1">
                    <img src={shape15} alt="" />
                </div>
                <div className="download-shape-2">
                    <img src={shape14} alt="" />
                </div>
                <div className="download-shape-3">
                    <img src={shape13} alt="" />
                </div>
            </section>
        </>
    );
}

export default DownloadHomeTwo;
