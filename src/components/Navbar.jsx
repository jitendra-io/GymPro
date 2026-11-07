import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Dumbbell, User, Award, Calculator, LogOut, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT US', path: '/about' },
    { name: 'DASHBOARD', path: '/essential' },
  ];

  const dropdownItems = [
    { name: 'BMI Calculator', path: '/bmi', icon: Calculator },
    { name: 'Gym Classes', path: '/classes', icon: Award },
  ];

  const activeStyle = ({ isActive }) =>
    `text-gymGreen font-semibold transition-all duration-300 ${
      isActive ? 'glow-text-yellow border-b-2 border-gymGreen pb-1' : 'hover:text-gymGreen'
    }`;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass border-b border-white/10 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="bg-gymGreen p-2 rounded-lg text-gymDark flex items-center justify-center glow-yellow">
              <Dumbbell className="h-6 w-6 transform -rotate-45" />
            </div>
            <span className="text-2xl font-black tracking-wider text-white flex items-center">
              GYM<span className="text-gymGreen">PRO</span>
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-7 text-sm font-semibold tracking-wide">
            {navLinks.map((link) => (
              <NavLink key={link.name} to={link.path} className={activeStyle}>
                {link.name}
              </NavLink>
            ))}

            {/* Pages Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-1 text-gray-300 hover:text-gymGreen transition-colors duration-200 h-full py-2"
              >
                PAGES <ChevronDown className="h-4 w-4" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl glass-dark shadow-2xl border border-white/10 py-2 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                  {dropdownItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-gymGreen hover:text-gymDark transition-all duration-150 rounded-lg mx-2"
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <NavLink to="/blogs" className={activeStyle}>
              BLOGS
            </NavLink>
          </div>

          {/* User Auth Section (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div 
                  onClick={() => navigate('/essential')}
                  className="flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-2 rounded-full cursor-pointer hover:border-gymGreen/50 transition-all"
                >
                  <div className="w-7 h-7 rounded-full bg-gymGreen/20 text-gymGreen flex items-center justify-center font-bold text-xs uppercase">
                    {user?.name ? user.name.charAt(0) : 'U'}
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-white leading-none">{user?.name?.split(' ')[0]}</p>
                    <span className="text-[10px] uppercase font-bold text-gymGreen tracking-widest leading-none">
                      {user?.role || 'Member'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  title="Sign Out"
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 border border-white/10 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-xs uppercase font-extrabold tracking-widest text-gray-300 hover:text-white px-3 py-2 transition-colors flex items-center gap-1.5"
                >
                  <LogIn className="h-4 w-4 text-gymGreen" /> Sign In
                </Link>
                <button
                  onClick={() => navigate('/register')}
                  className="bg-gymYellow hover:bg-yellow-400 text-gymDark font-black px-5 py-2.5 rounded-xl uppercase tracking-widest text-xs transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Join Now
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden glass-dark border-b border-white/10 px-4 pt-2 pb-6 space-y-4 shadow-2xl">
          {isAuthenticated && (
            <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gymGreen/20 text-gymGreen flex items-center justify-center font-black text-sm">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{user?.name}</p>
                  <p className="text-xs text-gray-400">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="text-red-400 hover:text-red-300 p-2"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          )}

          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={toggleMenu}
              className="block px-3 py-2 rounded-md text-base font-bold text-gray-300 hover:text-gymGreen hover:bg-white/5 transition-all"
            >
              {link.name}
            </Link>
          ))}

          <div className="border-t border-white/5 pt-2 pl-3">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Pages</p>
            {dropdownItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={toggleMenu}
                className="flex items-center gap-3 py-2 text-sm text-gray-300 hover:text-gymGreen transition-colors"
              >
                <item.icon className="h-4 w-4 text-gymGreen" />
                {item.name}
              </Link>
            ))}
          </div>

          <Link
            to="/blogs"
            onClick={toggleMenu}
            className="block px-3 py-2 rounded-md text-base font-bold text-gray-300 hover:text-gymGreen hover:bg-white/5 transition-all"
          >
            BLOGS
          </Link>

          {!isAuthenticated && (
            <div className="pt-4 border-t border-white/5 space-y-2">
              <Link
                to="/login"
                onClick={toggleMenu}
                className="w-full border border-gymGreen text-gymGreen font-bold py-3 text-center uppercase tracking-wider text-xs block rounded-xl"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={toggleMenu}
                className="w-full bg-gymYellow text-gymDark font-bold py-3 text-center uppercase tracking-wider text-xs block rounded-xl"
              >
                Join Now →
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
