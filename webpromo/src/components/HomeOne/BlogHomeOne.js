import React from 'react';
import blogOne from '../../assets/images/blog-1.jpg';
import blogTwo from '../../assets/images/blog-2.jpg';
import blogThree from '../../assets/images/blog-3.jpg';

function BlogHomeOne() {
    return (
        <>
            <section className="appie-blog-area pt-90 pb-95">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="appie-section-title text-center">
                                <h3 className="appie-title">Latest blog posts</h3>
                                <p>Different layouts and styles for team sections.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div
                                className="appie-blog-item mt-30 wow animated fadeInUp"
                                data-wow-duration="3000ms"
                                data-wow-delay="200ms"
                            >
                                <div className="thumb">
                                    <img src={blogOne} alt="" />
                                </div>
                                <div className="content">
                                    <div className="blog-meta">
                                        <ul>
                                            <li>March 10, 2022</li>
                                            <li>
                                                <a href="#">Saas & App</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <h3 className="title">
                                        <a href="/news/single-news">
                                            Introducing New Apps Design for our iOS App
                                        </a>
                                    </h3>
                                    <a href="#">
                                        Learn More <i className="fal fa-arrow-right" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div
                                className="appie-blog-item mt-30 wow animated fadeInUp"
                                data-wow-duration="3000ms"
                                data-wow-delay="400ms"
                            >
                                <div className="thumb">
                                    <img src={blogTwo} alt="" />
                                </div>
                                <div className="content">
                                    <div className="blog-meta">
                                        <ul>
                                            <li>March 10, 2022</li>
                                            <li>
                                                <a href="#">Saas & App</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <h3 className="title">
                                        <a href="/news/single-news">
                                            How to bring Dolce to your company
                                        </a>
                                    </h3>
                                    <a href="#">
                                        Learn More <i className="fal fa-arrow-right" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div
                                className="appie-blog-item mt-30 wow animated fadeInUp"
                                data-wow-duration="3000ms"
                                data-wow-delay="600ms"
                            >
                                <div className="thumb">
                                    <img src={blogThree} alt="" />
                                </div>
                                <div className="content">
                                    <div className="blog-meta">
                                        <ul>
                                            <li>March 10, 2022</li>
                                            <li>
                                                <a href="#">Saas & App</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <h3 className="title">
                                        <a href="/news/single-news">
                                            17 Effective Ways to Monetize Mobile Apps
                                        </a>
                                    </h3>
                                    <a href="#">
                                        Learn More <i className="fal fa-arrow-right" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default BlogHomeOne;
