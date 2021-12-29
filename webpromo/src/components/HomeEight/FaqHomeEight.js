import React, { useState } from 'react';
import CounterUpCom from '../../lib/CounterUpCom';
import PopupVideo from '../PopupVideo';

function FaqHomeEight() {
    const [showQuestion, setQuestion] = useState(0);
    const [showVideo, setVideoValue] = useState(false);
    const openQuestion = (e, value) => {
        e.preventDefault();
        setQuestion(value);
    };
    const handleShowVideo = (e) => {
        e.preventDefault();
        setVideoValue(!showVideo);
    };
    return (
        <>
            {showVideo && (
                <PopupVideo
                    videoSrc="//www.youtube.com/embed/EE7NqzhMDms?autoplay=1"
                    handler={(e) => handleShowVideo(e)}
                />
            )}
            <div className="appie-faq-8-area pt-100 pb-100" id="counter">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="appie-section-title">
                                <h3 className="appie-title">Get started with Appie Template.</h3>
                                <p>
                                    He nicked it tickety boo harry the cras bargy chap mush spiffing
                                    spend a penny the full monty burke butty.
                                </p>
                            </div>
                            <div
                                className="faq-accordion wow fadeInRight mt-30"
                                data-wow-duration="1500ms"
                            >
                                <div
                                    className="accrodion-grp wow fadeIn faq-accrodion"
                                    data-wow-duration="1500ms"
                                    data-grp-name="faq-accrodion"
                                >
                                    <div
                                        className={`accrodion ${
                                            showQuestion === 0 ? 'active' : ''
                                        }`}
                                        onClick={(e) => openQuestion(e, 0)}
                                    >
                                        <div className="accrodion-inner">
                                            <div className="accrodion-title">
                                                <h4>Does Appie have dynamic content?</h4>
                                            </div>
                                            <div
                                                className="accrodion-content"
                                                style={{
                                                    display: showQuestion === 0 ? 'block' : 'none',
                                                }}
                                            >
                                                <div className="inner">
                                                    <p>
                                                        Naff Oxford vagabond in my flat chinwag
                                                        blatant grub tomfoolery that I bits and bobs
                                                        up the cras boot.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className={`accrodion ${
                                            showQuestion === 1 ? 'active' : ''
                                        }`}
                                        onClick={(e) => openQuestion(e, 1)}
                                    >
                                        <div className="accrodion-inner">
                                            <div className="accrodion-title">
                                                <h4>Where do I usually find FAQs in a page?</h4>
                                            </div>
                                            <div
                                                className="accrodion-content"
                                                style={{
                                                    display: showQuestion === 1 ? 'block' : 'none',
                                                }}
                                            >
                                                <div className="inner">
                                                    <p>
                                                        Naff Oxford vagabond in my flat chinwag
                                                        blatant grub tomfoolery that I bits and bobs
                                                        up the cras boot.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className={`accrodion ${
                                            showQuestion === 2 ? 'active' : ''
                                        }`}
                                        onClick={(e) => openQuestion(e, 2)}
                                    >
                                        <div className="accrodion-inner">
                                            <div className="accrodion-title">
                                                <h4>Website & Mobile App Design</h4>
                                            </div>
                                            <div
                                                className="accrodion-content"
                                                style={{
                                                    display: showQuestion === 2 ? 'block' : 'none',
                                                }}
                                            >
                                                <div className="inner">
                                                    <p>
                                                        Naff Oxford vagabond in my flat chinwag
                                                        blatant grub tomfoolery that I bits and bobs
                                                        up the cras boot.
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
                <div className="faq-play-box">
                    <div className="play-btn">
                        <a
                            onClick={(e) => handleShowVideo(e)}
                            className="appie-video-popup"
                            href="https://www.youtube.com/watch?v=EE7NqzhMDms"
                        >
                            <i className="fas fa-play" />
                        </a>
                    </div>
                    <div className="faq-play-counter">
                        <div className="box-1">
                            <h4 className="title">
                                <CounterUpCom endValue="700" sectionSelect="counter" />k
                            </h4>
                            <span>App Downloads</span>
                        </div>
                        <div className="box-1 box-2">
                            <h4 className="title">
                                <CounterUpCom endValue="545" sectionSelect="counter" />k
                            </h4>
                            <span>App Downloads</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FaqHomeEight;
