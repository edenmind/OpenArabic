import React from 'react';
import useToggle from '../../Hooks/useToggle';
import BackToTop from '../BackToTop';
import Drawer from '../Mobile/Drawer';
import AboutHomeEight from './AboutHomeEight';
import BlogHomeEight from './BlogHomeEight';
import FaqHomeEight from './FaqHomeEight';
import FooterHomeEight from './FooterHomeEight';
import HeaderHomeEight from './HeaderHomeEight';
import HeroHomeEight from './HeroHomeEight';
import ServicesHomeEight from './ServicesHomeEight';
import SignupHomeEight from './SignupHomeEight';
import TeamHomeEight from './TeamHomeEight';
import TestimonialHomeEight from './TestimonialHomeEight';
import WorkPartHomeEight from './WorkPartHomeEight';

function HomeEight() {
    const [drawer, setDrawer] = useToggle(false);
    return (
        <>
            <Drawer drawer={drawer} action={setDrawer.toggle} />
            <HeaderHomeEight drawer={drawer} action={setDrawer.toggle} />
            <HeroHomeEight />
            <AboutHomeEight />
            <ServicesHomeEight />
            <WorkPartHomeEight />
            <FaqHomeEight />
            <TeamHomeEight />
            <TestimonialHomeEight />
            <BlogHomeEight />
            <SignupHomeEight className="appie-signup-8-area" />
            <FooterHomeEight />
            <BackToTop className="back-to-top-8" />
        </>
    );
}

export default HomeEight;
