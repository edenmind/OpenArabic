import React, { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import testmonialUser from '../../assets/images/testimonial-user-1.png';

function TestimonialHomeTwo() {
    const sliderRef = useRef();
    const sliderNext = () => {
        sliderRef.current.slickNext();
    };
    const sliderPrev = () => {
        sliderRef.current.slickPrev();
    };
    const settings = {
        autoplay: true,
        arrows: false,
        dots: false,
    };
    return (
        <>
            <section className="appie-testimonial-2-area mb-90" id="testimonial">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="appie-testimonial-2-box">
                                <div
                                    className="appie-testimonial-slider-2"
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
                                        <div className="appie-testimonial-slider-2-item">
                                            <div className="item">
                                                <div className="thumb">
                                                    <img src={testmonialUser} alt="" />
                                                    <ul>
                                                        <li>
                                                            <i className="fas fa-star" />
                                                        </li>
                                                        <li>
                                                            <i className="fas fa-star" />
                                                        </li>
                                                        <li>
                                                            <i className="fas fa-star" />
                                                        </li>
                                                        <li>
                                                            <i className="fas fa-star" />
                                                        </li>
                                                        <li>
                                                            <i className="fas fa-star" />
                                                        </li>
                                                    </ul>
                                                    <span>(4.7) review</span>
                                                </div>
                                                <div className="content">
                                                    <p>
                                                        Why I say old chap that is spiffing chip
                                                        shop such a fibber the bee's knees, the
                                                        wireless Richard fantastic do one cracking
                                                        goal pukka baking cakes starkers mush don't
                                                        get shirty with me argy bargy, I naff
                                                        chimney pot blimey he lost his bottle cup.
                                                    </p>
                                                    <div className="author-info">
                                                        <h5 className="title">Hanson Deck</h5>
                                                        <span>Web developer</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="appie-testimonial-slider-2-item">
                                            <div className="item">
                                                <div className="thumb">
                                                    <img src={testmonialUser} alt="" />
                                                    <ul>
                                                        <li>
                                                            <i className="fas fa-star" />
                                                        </li>
                                                        <li>
                                                            <i className="fas fa-star" />
                                                        </li>
                                                        <li>
                                                            <i className="fas fa-star" />
                                                        </li>
                                                        <li>
                                                            <i className="fas fa-star" />
                                                        </li>
                                                        <li>
                                                            <i className="fas fa-star" />
                                                        </li>
                                                    </ul>
                                                    <span>(4.7) review</span>
                                                </div>
                                                <div className="content">
                                                    <p>
                                                        Why I say old chap that is spiffing chip
                                                        shop such a fibber the bee's knees, the
                                                        wireless Richard fantastic do one cracking
                                                        goal pukka baking cakes starkers mush don't
                                                        get shirty with me argy bargy, I naff
                                                        chimney pot blimey he lost his bottle cup.
                                                    </p>
                                                    <div className="author-info">
                                                        <h5 className="title">Hanson Deck</h5>
                                                        <span>Web developer</span>
                                                    </div>
                                                </div>
                                            </div>
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
                </div>
            </section>
        </>
    );
}

export default TestimonialHomeTwo;
