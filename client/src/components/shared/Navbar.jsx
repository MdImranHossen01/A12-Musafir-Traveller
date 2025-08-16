import React, { useContext } from 'react';
// FIX 1: Correctly import from 'react-router-dom'
import { Link, NavLink } from 'react-router';

// FIX 2: Import your REAL AuthContext from your providers folder
import { AuthContext } from '../../providers/AuthProvider';
import Logo from './Logo';

const Navbar = () => {
  // This now uses your actual user, loading state, and logout function
  const { user, loading, logOut } = useContext(AuthContext);

  const navLinks = (
    <>
      <li><NavLink to="/" className={({ isActive }) => isActive ? "text-primary font-bold" : "font-medium"}>Home</NavLink></li>
      <li><NavLink to="/community" className={({ isActive }) => isActive ? "text-primary font-bold" : "font-medium"}>Community</NavLink></li>
      <li><NavLink to="/about-us" className={({ isActive }) => isActive ? "text-primary font-bold" : "font-medium"}>About Us</NavLink></li>
      <li><NavLink to="/all-trips" className={({ isActive }) => isActive ? "text-primary font-bold" : "font-medium"}>Trips</NavLink></li>
    </>
  );

  const handleLogout = () => {
    logOut();
  }

  return (
    <nav className='sticky top-0 z-50 shadow-sm bg-base-100'>
      <div className="navbar  px-4 container mx-auto">
      {/* Left Side */}
      <div className="navbar-start ">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {navLinks}
          </ul>
        </div>
        <Link to="/" className=" text-xl md:text-2xl gap-1">
          <Logo></Logo>
        </Link>
      </div>

      {/* Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">
          {navLinks}
        </ul>
      </div>

      {/* Right Side */}
      <div className="navbar-end">
        {loading ? (
          <span className="loading loading-spinner text-primary"></span>
        ) : user ? (
          // FIX 3: This is the reliable DaisyUI dropdown implementation
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full ring-2 ring-primary ring-offset-base-100 ring-offset-2" title={user.displayName}>
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/100x100/CCCCCC/FFFFFF?text=U'; }}
                />
              </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-64">
              <li className="p-2">
                <p className="font-bold text-lg pointer-events-none">{user.displayName}</p>
                <p className="text-sm text-gray-500 pointer-events-none">{user.email}</p>
              </li>
              <div className="divider my-1"></div>
              <li><Link to="/dashboard" className="justify-between">Dashboard</Link></li>
              <li><Link to="/offer-announcements">Offer Announcements</Link></li>
              <div className="divider my-1"></div>
              <li><button onClick={handleLogout} className="btn btn-sm btn-primary text-white w-full">Logout</button></li>
            </ul>
          </div>
        ) : (
          // Logged-out user view
          <div className="space-x-2">
            <Link to="/login" className="btn btn-outline btn-primary">Login</Link>
            <Link to="/register" className="btn btn-primary text-white">Register</Link>
          </div>
        )}
      </div>
    </div>
    </nav>
  );
};

export default Navbar;