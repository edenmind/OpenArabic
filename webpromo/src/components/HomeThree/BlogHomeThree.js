import React from 'react';
import { Link } from 'react-router-dom';
import BlogFour from '../../assets/images/blog-4.jpg';
import BlogFive from '../../assets/images/blog-5.jpg';
import BlogSix from '../../assets/images/blog-6.jpg';
import BlogSeven from '../../assets/images/blog-7.jpg';

function BlogHomeThree() {
    return (
        <>
            <section className="appie-blog-3-area pt-90 pb-100">
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
                            <div className="appie-blog-item-3 mt-30">
                                <div className="thumb">
                                    <img src={BlogFour} alt="" />
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
                                                <i className="fal fa-clock" /> July 14, 2022
                                            </li>
                                            <li>
                                                <i className="fal fa-comments" /> July 14, 2022
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="appie-blog-item-3 mt-30">
                                <div className="thumb">
                                    <img src={BlogFive} alt="" />
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
                                                <i className="fal fa-clock" /> July 14, 2022
                                            </li>
                                            <li>
                                                <i className="fal fa-comments" /> July 14, 2022
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="appie-blog-item-3 mt-30">
                                <div className="thumb">
                                    <img src={BlogSix} alt="" />
                                </div>
                                <div className="content">
                                    <h5 className="title">
                                        <a href="/news/single-news">
                                            Engineering job is Becoming More interesting.
                                        </a>
                                    </h5>
                                    <div className="meta-item">
                                        <ul>
                                            <li>
                                                <i className="fal fa-clock" /> July 14, 2022
                                            </li>
                                            <li>
                                                <i className="fal fa-comments" /> July 14, 2022
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="appie-blog-item-3 mt-30">
                                <div className="thumb">
                                    <img src={BlogSeven} alt="" />
                                </div>
                                <div className="content">
                                    <h5 className="title">
                                        <a href="/news/single-news">
                                            20 Myths About Mobile Applications
                                        </a>
                                    </h5>
                                    <div className="meta-item">
                                        <ul>
                                            <li>
                                                <i className="fal fa-clock" /> July 14, 2022
                                            </li>
                                            <li>
                                                <i className="fal fa-comments" /> July 14, 2022
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="blog-btn text-center mt-60">
                                <Link className="main-btn" to="/news">
                                    View All Posts <i className="fal fa-arrow-right" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default BlogHomeThree;
