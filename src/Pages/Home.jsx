import React from 'react';
import Banner from './Banner';
import WhyGoGreen from './WhyGoGreen';
import HowItWorks from './HowItWorks';
import Challenges from './Challenges';
import RecentTips from './RecentTips';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Challenges></Challenges>
            <RecentTips></RecentTips>
            <WhyGoGreen></WhyGoGreen>
            <HowItWorks></HowItWorks>
        </div>
    );
};

export default Home;