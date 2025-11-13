import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';

const MainLayouts = () => {
    return (
        <div>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayouts;