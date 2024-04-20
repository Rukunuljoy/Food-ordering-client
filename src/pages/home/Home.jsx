import React from 'react';
import Banner from '../../components/Banner';
import Categories from './Categories';
import SpecialDeshes from './SpecialDeshes';
import Testimonials from './Testimonials';

const Home = () => {
    return (
        <div>
            <Banner/>
            <Categories/>
            <SpecialDeshes/>
            <Testimonials/>
        </div>
    );
};

export default Home;