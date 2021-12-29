import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import videoSlideOne from '../../assets/images/video-slide-1.jpg';
import videoSlideTwo from '../../assets/images/video-slide-2.jpg';
import videoThumb from '../../assets/images/video-thumb-1.jpg';
import PopupVideo from '../PopupVideo';

function VideoPlayerHomeTwo({ className }) {
    const [showVideo, setshowVideoValue] = useState(false);
    const handleVideoShow = (e) => {
        e.preventDefault();
        setshowVideoValue(!showVideo);
    };
    const sliderRef = useRef();
    const settings = {
        autoplay: true,
        arrows: false,
        dots: false,
    };
    const sliderNext = () => {
        sliderRef.current.slickNext();
    };
    const sliderPrev = () => {
        sliderRef.current.slickPrev();
    };
    return (
        <>
            {showVideo && (
                <PopupVideo
                    handler={(e) => handleVideoShow(e)}
                    videoSrc="//www.youtube.com/embed/EE7NqzhMDms?autoplay=1"
                />
            )}
            <section className={`appie-video-player-area pb-100 ${className || ''}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="appie-video-player-item">
                                <div className="thumb">
                                    <img src={videoThumb} alt="" />
                                    <div className="video-popup">
                                        <a
                                            onClick={(e) => handleVideoShow(e)}
                                            role="button"
                                            href="#"
                                            className="appie-video-popup"
                                        >
                                            <i className="fas fa-play" />
                                        </a>
                                    </div>
                                </div>
                                <div className="content">
                                    <h3 className="title">
                                        Watch the two-minute video to learn how.
                                    </h3>
                                    <p>
                                        The wireless cheesed on your bike mate zonked a load of old
                                        tosh hunky dory it's all gone to pot haggle william car boot
                                        pear shaped geeza.
                                    </p>
                                    <a className="main-btn" href="#">
                                        Get Started
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div
                                className="appie-video-player-slider"
                                style={{ position: 'relative' }}
                            >
                                <span
                                    onClick={sliderPrev}
                                    className="prev slick-arrow"
                                    style={{ display: 'block' }}
                                >
                                    <i className="fal fa-arrow-left" />
                                </span>
                                <Slider ref={sliderRef} {...settings}>
                                    <div className="item">
                                        <img src={videoSlideOne} alt="" />
                                    </div>
                                    <div className="item">
                                        <img src={videoSlideTwo} alt="" />
                                    </div>
                                </Slider>
                                <span
                                    onClick={sliderNext}
                                    className="next slick-arrow"
                                    style={{ display: 'block' }}
                                >
                                    <i className="fal fa-arrow-right" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default VideoPlayerHomeTwo;
