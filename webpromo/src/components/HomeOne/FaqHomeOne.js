import React, { useState } from 'react';

function FaqHomeOne({ className }) {
    const [showQues, setQues] = useState(1);
    const openQuestion = (value) => {
        setQues(value);
    };
    return (
        <>
            <section className={`appie-faq-area pb-95 ${className || ''}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="appie-section-title text-center">
                                <h3 className="appie-title">Frequently Asked Questions</h3>
                                Can't find an answer?{' '}
                                <a href="mailto:salam@edenmind.com">Email us</a>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div
                                className="faq-accordion wow fadeInRight mt-30"
                                data-wow-duration="1500ms"
                            >
                                <div
                                    className="accrodion-grp animated fadeIn faq-accrodion wow"
                                    data-wow-duration="1500ms"
                                    data-grp-name="faq-accrodion"
                                >
                                    <div
                                        onClick={() => openQuestion(1)}
                                        className={`accrodion ${showQues === 1 ? 'active' : ''}`}
                                    >
                                        <div className="accrodion-inner">
                                            <div className="accrodion-title">
                                                <h4>Which school does this app follow?</h4>
                                            </div>
                                            <div
                                                className="accrodion-content"
                                                style={{
                                                    display: showQues === 1 ? 'block' : 'none',
                                                }}
                                            >
                                                <div className="inner">
                                                    <p>
                                                        The theological foundation of OpenArabic is
                                                        based upon the Qurʼān, the Prophetic Sunnah
                                                        and the first generations of Muslims
                                                        understanding with texts from Islamic
                                                        Scholars such as: al-Hasan al-Basri, Imām
                                                        Abū Ḥanīfa, Imām Mālik bin Anas, Imām
                                                        al-Shāfiʿī, Imām Aḥmad ibn Ḥanbal, Ibn Rājab
                                                        al-Hanbali, Ibn Taymiyyah, Ibn Qayyim
                                                        al-Jawziyya, Shams ad-Dīn adh-Dhahabī, Imām
                                                        Nawawī, Ibn Kathīr, Ibn Ḥajar al-ʿAsqalānī,
                                                        al-Fuḍayl ibn ʻIyāḍ
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        onClick={() => openQuestion(2)}
                                        className={`accrodion ${showQues === 2 ? 'active' : ''}`}
                                    >
                                        <div className="accrodion-inner">
                                            <div className="accrodion-title">
                                                <h4>Which is the technical platform?</h4>
                                            </div>
                                            <div
                                                className="accrodion-content"
                                                style={{
                                                    display: showQues === 2 ? 'block' : 'none',
                                                }}
                                            >
                                                <div className="inner">
                                                    <p>
                                                        The platform that OpenArabic runs upon is
                                                        built using Open Source tools such as React
                                                        Native, .NET, and Kubernetes.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div
                                className="faq-accordion wow fadeInRight mt-30"
                                data-wow-duration="1500ms"
                            >
                                <div
                                    className="accrodion-grp animated fadeIn faq-accrodion wow"
                                    data-wow-duration="1500ms"
                                    data-grp-name="faq-accrodion"
                                >
                                    <div
                                        onClick={() => openQuestion(3)}
                                        className={`accrodion ${showQues === 3 ? 'active' : ''}`}
                                    >
                                        <div className="accrodion-inner">
                                            <div className="accrodion-title">
                                                <h4>How can I participate?</h4>
                                            </div>
                                            <div
                                                className="accrodion-content"
                                                style={{
                                                    display: showQues === 3 ? 'block' : 'none',
                                                }}
                                            >
                                                <div className="inner">
                                                    <p>
                                                        If you are interested in helping out with
                                                        the development, then please check out the{' '}
                                                        <a
                                                            className="simple-link link-color"
                                                            href="https://github.com/edenmind/OpenArabic"
                                                        >
                                                            OpenArabic project
                                                        </a>{' '}
                                                        on GitHub.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        onClick={() => openQuestion(4)}
                                        className={`accrodion ${showQues === 4 ? 'active' : ''}`}
                                    >
                                        <div className="accrodion-inner">
                                            <div className="accrodion-title">
                                                <h4>Who founded OpenArabic?</h4>
                                            </div>
                                            <div
                                                className="accrodion-content"
                                                style={{
                                                    display: showQues === 4 ? 'block' : 'none',
                                                }}
                                            >
                                                <div className="inner">
                                                    <p>
                                                        OpenArabic.io was founded by Yūnus
                                                        Andréasson in 1442 AH or 2020 AD. Yūnus is a
                                                        convert to Islam since ~20 years ago
                                                        residing in Sweden working as a Software
                                                        Developer. If you want to reach out, then
                                                        please send an email to{' '}
                                                        <a
                                                            className="simple-link link-color"
                                                            href="mailto:yunus@edenmind.com"
                                                        >
                                                            yunus@edenmind.com
                                                        </a>{' '}
                                                        or make contact on
                                                        <a
                                                            className="simple-link link-color"
                                                            href="https://twitter.com/yunusandreasson"
                                                        >
                                                            Twitter
                                                        </a>
                                                        .
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="faq-text text-center pt-40">
                                {/* <p>
                                    Can't find an answer?{' '}
                                    <a href="mailto:salam@edenmind.com">Email us</a>
                                </p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default FaqHomeOne;
