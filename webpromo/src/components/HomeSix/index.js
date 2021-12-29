import React from 'react';
import useToggle from '../../Hooks/useToggle';
import BackToTop from '../BackToTop';
import FeaturesHomeOne from '../HomeOne/FeaturesHomeOne';
import PricingHomeOne from '../HomeOne/PricingHomeOne';
import BlogHomeThree from '../HomeThree/BlogHomeThree';
import DownloadHomeThree from '../HomeThree/DownloadHomeThree';
import CounterArea from '../HomeTwo/CounterArea';
import ServicesHomeTwo from '../HomeTwo/ServicesHomeTwo';
import VideoPlayerHomeTwo from '../HomeTwo/VideoPlayerHomeTwo';
import Drawer from '../Mobile/Drawer';
import FooterHomeSix from './FooterHomeSix';
import HeaderHomeSix from './HeaderHomeSix';
import HeroHomeSix from './HeroHomeSix';

function HomeSix() {
    const [drawer, drawerAction] = useToggle(false);
    return (
        <>
            <Drawer drawer={drawer} action={drawerAction.toggle} />
            <HeaderHomeSix action={drawerAction.toggle} />
            <HeroHomeSix />
            <ServicesHomeTwo className="pt-90" />
            <BackToTop className="back-to-top-6" />
            <FeaturesHomeOne className="appie-features-6-area" />
            <CounterArea />
            <VideoPlayerHomeTwo />
            <DownloadHomeThree className="pt-0 pb-100" />
            <PricingHomeOne className="appie-pricing-6-area" />
            <BlogHomeThree />
            <FooterHomeSix />
        </>
    );
}

export default HomeSix;
