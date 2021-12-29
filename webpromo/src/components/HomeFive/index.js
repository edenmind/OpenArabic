// import React, { useState } from 'react';
import useToggle from '../../Hooks/useToggle';
import BackToTop from '../BackToTop';
import Cart from '../Cart';
import TestimonialHomeOne from '../HomeOne/TestimonialHomeOne';
import DownloadHomeThree from '../HomeThree/DownloadHomeThree';
import ServicesHomeThree from '../HomeThree/ServicesHomeThree';
import ShowCaseHomeThree from '../HomeThree/ShowCaseHomeThree';
import FeaturesHomeTwo from '../HomeTwo/FeaturesHomeTwo';
import SponserHomeTwo from '../HomeTwo/SponserHomeTwo';
import Drawer from '../Mobile/Drawer';
import SearchModule from '../SearchModule';
import FooterHomeFive from './FooterHomeFive';
import HeaderHomeFive from './HeaderHomeFive';
import HeroHomeFive from './HeroHomeFive';

function HomeFive() {
    const [search, searchAction] = useToggle(false);
    const [cart, cartAction] = useToggle(false);
    const [drawer, drawerAction] = useToggle(false);
    return (
        <>
            <Drawer drawer={drawer} action={drawerAction.toggle} />
            <SearchModule value={search} searchToggle={searchAction.toggle} />
            <Cart value={cart} action={cartAction.toggle} />
            <HeaderHomeFive
                action={drawerAction.toggle}
                cartToggle={cartAction.toggle}
                searchToggle={searchAction.toggle}
            />
            <HeroHomeFive />
            <ServicesHomeThree />
            <FeaturesHomeTwo />
            <DownloadHomeThree className="pb-90" />
            <ShowCaseHomeThree />
            <TestimonialHomeOne />
            <SponserHomeTwo className="pt-90" />
            <FooterHomeFive />
            <BackToTop className="back-to-top-5" />
        </>
    );
}

export default HomeFive;
