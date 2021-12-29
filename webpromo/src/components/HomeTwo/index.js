import React from 'react';
import useToggle from '../../Hooks/useToggle';
import BackToTop from '../BackToTop';
import Drawer from '../Mobile/Drawer';
import AboutHomeTwo from './AboutHomeTwo';
import CounterArea from './CounterArea';
import DownloadHomeTwo from './DownloadHomeTwo';
import FeaturesHomeTwo from './FeaturesHomeTwo';
import FooterHomeTwo from './FooterHomeTwo';
import HeaderHomeTwo from './HeaderHomeTwo';
import HeroHomeTwo from './HeroHomeTwo';
import PricingHomeTwo from './PricingHomeTwo';
import ServicesHomeTwo from './ServicesHomeTwo';
import SponserHomeTwo from './SponserHomeTwo';
import TestimonialHomeTwo from './TestimonialHomeTwo';
import VideoPlayerHomeTwo from './VideoPlayerHomeTwo';

function HomeTwo() {
    const [drawer, drawerAction] = useToggle(false);
    return (
        <>
            <Drawer drawer={drawer} action={drawerAction.toggle} />
            <HeaderHomeTwo action={drawerAction.toggle} />
            <HeroHomeTwo />
            <ServicesHomeTwo />
            <AboutHomeTwo />
            <FeaturesHomeTwo />
            <CounterArea />
            <VideoPlayerHomeTwo />
            <DownloadHomeTwo />
            <PricingHomeTwo />
            <TestimonialHomeTwo />
            <SponserHomeTwo />
            <FooterHomeTwo />
            <BackToTop className="back-to-top-2" />
        </>
    );
}

export default HomeTwo;
