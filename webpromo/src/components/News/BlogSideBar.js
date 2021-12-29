import React from 'react';
import BlogImg1 from '../../assets/images/blog/p1.jpg';
import BlogImg2 from '../../assets/images/blog/p2.jpg';
import BlogImg3 from '../../assets/images/blog/p3.jpg';
import BlogImg4 from '../../assets/images/blog/p4.jpg';

function BlogSideBar() {
    return (
        <div className="blog-sidebar">
            <aside className="widget widget-search">
                <form className="search-form" action="#" method="post">
                    <input type="search" name="s" placeholder="Search..." />
                    <button type="submit">
                        <i className="fal fa-search"></i>
                    </button>
                </form>
            </aside>
            <aside className="widget widget-categories">
                <h3 className="widget-title">Categories</h3>
                <ul>
                    <li>
                        <a href="#">Web Design</a>
                        <span>(24)</span>
                    </li>
                    <li>
                        <a href="#">Marketing</a>
                        <span>(15)</span>
                    </li>
                    <li>
                        <a href="#">Frontend</a>
                        <span>(8)</span>
                    </li>
                    <li>
                        <a href="#">IT & Software</a>
                        <span>(13)</span>
                    </li>
                    <li>
                        <a href="#">Photography</a>
                        <span>(4)</span>
                    </li>
                    <li>
                        <a href="#">Technology</a>
                        <span>(16)</span>
                    </li>
                    <li>
                        <a href="#">General</a>
                        <span>(12)</span>
                    </li>
                </ul>
            </aside>
            <aside className="widget widget-trend-post">
                <h3 className="widget-title">Popular Posts</h3>
                <div className="popular-post">
                    <a href="single-post.html">
                        <img src={BlogImg1} alt="" />
                    </a>
                    <h5>
                        <a href="single-post.html">Using creative problem Solving</a>
                    </h5>
                    <span>March 10, 2020</span>
                </div>
                <div className="popular-post">
                    <a href="single-post.html">
                        <img src={BlogImg2} alt="" />
                    </a>
                    <h5>
                        <a href="single-post.html">Fundamentals of UI Design</a>
                    </h5>
                    <span>Jan 14, 2020</span>
                </div>
                <div className="popular-post">
                    <a href="single-post.html">
                        <img src={BlogImg3} alt="" />
                    </a>
                    <h5>
                        <a href="single-post.html">Making music with Other people</a>
                    </h5>
                    <span>April 12, 2020</span>
                </div>
                <div className="popular-post">
                    <a href="single-post.html">
                        <img src={BlogImg4} alt="" />
                    </a>
                    <h5>
                        <a href="single-post.html">Brush strokes energize Trees in paintings</a>
                    </h5>
                    <span>July 4, 2020</span>
                </div>
            </aside>
            <aside className="widget">
                <h3 className="widget-title">Popular Tags</h3>
                <div className="tags">
                    <a href="#">Bisy LMS</a>
                    <a href="#">Design</a>
                    <a href="#">General</a>
                    <a href="#">Online</a>
                    <a href="#">Prevention</a>
                    <a href="#">Artist</a>
                    <a href="#">Education</a>
                    <a href="#">Motivation</a>
                    <a href="#">Politico</a>
                    <a href="#">Live Cases</a>
                </div>
            </aside>
        </div>
    );
}

export default BlogSideBar;
