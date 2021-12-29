import React from 'react';
import useToggle from '../../Hooks/useToggle';
import BackToTop from '../BackToTop';
import PricingHomeOne from '../HomeOne/PricingHomeOne';
import ServicesHomeOne from '../HomeOne/ServicesHomeOne';
import TestimonialHomeOne from '../HomeOne/TestimonialHomeOne';
import FooterHomeThree from '../HomeThree/FooterHomeThree';
import ProjectHomeThree from '../HomeThree/ProjectHomeThree';
import CounterArea from '../HomeTwo/CounterArea';
import VideoPlayerHomeTwo from '../HomeTwo/VideoPlayerHomeTwo';
import Drawer from '../Mobile/Drawer';
import FeaturesHomeFour from './FeaturesHomeFour';
import HeaderHomeFour from './HeaderHomeFour';
import HeroHomeFour from './HeroHomeFour';

function HomeFour() {
    const [drawer, drawerAction] = useToggle(false);
    return (
        <>
            <Drawer drawer={drawer} action={drawerAction.toggle} />
            <HeaderHomeFour action={drawerAction.toggle} />
            <HeroHomeFour />
            <ServicesHomeOne className="pt-190" />
            <FeaturesHomeFour />
            <CounterArea style={{ backgroundColor: '#EEF1F6' }} />
            <TestimonialHomeOne />
            <VideoPlayerHomeTwo className="pt-100" />
            <PricingHomeOne />
            <ProjectHomeThree className="home-four-project" />
            <FooterHomeThree className="home-four-footer" />
            <BackToTop className="back-to-top-3" />
        </>
    );
}

export default HomeFour;
