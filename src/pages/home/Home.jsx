import React from 'react';
import Banner from '../../components/Banner';
import Categories from './Categories';
import SpecialDeshes from './SpecialDeshes';
import Testimonials from './Testimonials';
import OurServices from './OurServices';

const Home = () => {
    return (
        <div>
            <Banner/>
            <Categories/>
            <SpecialDeshes/>
            <Testimonials/> <br />
            <OurServices/>
        </div>
    );
};

export default Home;