import React from 'react';
import logo from '../../assets/sun-rise-logo.png'
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link to="/">
            <div className='gap-2 m-1 flex items-center'>
            <img className='w-12 h-12' src={logo} alt="" />
            <p><span className='text-[#f7a42d]'>Musafir</span> <span className='text-[#50abe4]'>Traveller</span></p>
        </div>
        </Link>
    );
};

export default Logo;