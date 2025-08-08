import React from 'react';
import Navbar from '../components/shared/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/shared/Footer';

const BasicLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default BasicLayout;