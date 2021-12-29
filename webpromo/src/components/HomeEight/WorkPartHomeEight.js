import React from 'react';
import workThumb from '../../assets/images/how-it-work-thumb.png';

function WorkPartHomeEight() {
    return (
        <>
            <div className="appie-how-it-work-area pt-10 pb-100">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="how-it-work-thumb text-center">
                                <img src={workThumb} alt="" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="appie-how-it-work-content">
                                <h2 className="title">How It works</h2>
                                <p>
                                    The little rotter harry butty lurgy spend a peny spiffing skive
                                    off golly gosh baking cakes.
                                </p>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="how-it-work-box">
                                            <span>1</span>
                                            <h5 className="title">
                                                Download <br />
                                                the app
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="how-it-work-box">
                                            <span>2</span>
                                            <h5 className="title">
                                                Create a <br />
                                                free account
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="how-it-work-box">
                                            <span>3</span>
                                            <h5 className="title">
                                                Sync across <br />
                                                All devices
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="how-it-work-box">
                                            <span>4</span>
                                            <h5 className="title">
                                                Monthly & <br />
                                                weekly reports
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default WorkPartHomeEight;
