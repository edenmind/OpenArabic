import React from 'react';
import useToggle from '../../Hooks/useToggle';
import BackToTop from '../BackToTop';
import SignupHomeEight from '../HomeEight/SignupHomeEight';
import FooterHomeOne from '../HomeOne/FooterHomeOne';
import SponserHomeTwo from '../HomeTwo/SponserHomeTwo';
import Drawer from '../Mobile/Drawer';
import HeaderAbout from './HeaderAbout';
import HeroAbout from './HeroAbout';
import ServicesAbout from './ServicesAbout';
import TeamAbout from './TeamAbout';

function AboutUs() {
    const [drawer, drawerAction] = useToggle(false);
    return (
        <>
            <Drawer drawer={drawer} action={drawerAction.toggle} />
            <HeaderAbout drawer={drawer} action={drawerAction.toggle} />
            <HeroAbout />
            <ServicesAbout />
            <TeamAbout />
            <SponserHomeTwo />
            <SignupHomeEight />
            <FooterHomeOne className="appie-footer-about-area" />
            <BackToTop />
        </>
    );
}

export default AboutUs;
