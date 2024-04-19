import React from 'react';
import Banner from '../../components/Banner';
import Categories from './Categories';
import SpecialDeshes from './SpecialDeshes';

const Home = () => {
    return (
        <div>
            <Banner/>
            <Categories/>
            <SpecialDeshes/>
        </div>
    );
};

export default Home;