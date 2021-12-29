import React from 'react';
import blog4 from '../../assets/images/blog-4.jpg';
import blog5 from '../../assets/images/blog-5.jpg';
import blog6 from '../../assets/images/blog-6.jpg';
import blog7 from '../../assets/images/blog-7.jpg';
import shape5 from '../../assets/images/shape/5.png';
import shape12 from '../../assets/images/shape/shape-12.png';

function BlogHomeEight() {
    return (
        <>
            <section className="appie-blog-3-area appie-blog-8-area pt-90 pb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="appie-section-title text-center">
                                <h3 className="appie-title">Latest blog posts</h3>
                                <p>The app provides design and digital marketing.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="appie-blog-item-3 appie-blog-item-8 mt-30">
                                <div className="thumb">
                                    <img src={blog4} alt="" />
                                </div>
                                <div className="content">
                                    <h5 className="title">
                                        <a href="/news/single-news">
                                            How to Improve Your App Store Position
                                        </a>
                                    </h5>
                                    <div className="meta-item">
                                        <ul>
                                            <li>
                                                <i className="fal fa-clock"></i> July 14, 2022
                                            </li>
                                            <li>
                                                <i className="fal fa-comments"></i> July 14, 2022
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="appie-blog-item-3 appie-blog-item-8 mt-30">
                                <div className="thumb">
                                    <img src={blog5} alt="" />
                                </div>
                                <div className="content">
                                    <h5 className="title">
                                        <a href="/news/single-news">
                                            Introducing New App Design for our iOS App
                                        </a>
                                    </h5>
                                    <div className="meta-item">
                                        <ul>
                                            <li>
                                                <i className="fal fa-clock"></i> July 14, 2022
                                            </li>
                                            <li>
                                                <i className="fal fa-comments"></i> July 14, 2022
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="appie-blog-item-3 appie-blog-item-8 mt-30">
                                <div className="thumb">
                                    <img src={blog6} alt="" />
                                </div>
                                <div className="content">
                                    <h5 className="title">
                                        <a href="#">
                                            Engineering job is Becoming More interesting.
                                        </a>
                                    </h5>
                                    <div className="meta-item">
                                        <ul>
                                            <li>
                                                <i className="fal fa-clock"></i> July 14, 2022
                                            </li>
                                            <li>
                                                <i className="fal fa-comments"></i> July 14, 2022
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="appie-blog-item-3 appie-blog-item-8 mt-30">
                                <div className="thumb">
                                    <img src={blog7} alt="" />
                                </div>
                                <div className="content">
                                    <h5 className="title">
                                        <a href="//news/single-news">
                                            20 Myths About Mobile Applications
                                        </a>
                                    </h5>
                                    <div className="meta-item">
                                        <ul>
                                            <li>
                                                <i className="fal fa-clock"></i> July 14, 2022
                                            </li>
                                            <li>
                                                <i className="fal fa-comments"></i> July 14, 2022
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="blog-btn text-center mt-60">
                                <a className="main-btn" href="#">
                                    View All Posts <i className="fal fa-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="appie-blog-8-shape-1">
                    <img src={shape5} alt="" />
                </div>
                <div className="appie-blog-8-shape-2">
                    <img src={shape12} alt="" />
                </div>
            </section>
        </>
    );
}

export default BlogHomeEight;
