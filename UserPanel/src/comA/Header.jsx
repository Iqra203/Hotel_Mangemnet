import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      setUser(loggedInUser);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/signIn');
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 px-8 py-4 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md text-black' : 'bg-transparent text-white'
      }`}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="rooms/"
          className={`border px-3 py-1 text-lg font-semibold cursor-pointer ${
            isScrolled ? 'border-black' : 'border-white'
          }`}
        >
          LuxuryStay Hospitality
        </Link>

        <nav className="hidden md:flex space-x-6 font-bold">
          <Link
            to="/"
            className={`${
              isScrolled ? 'text-orange-500' : 'text-orange-300'
            } hover:text-orange-600 transition`}
          >
            Home
          </Link>
          <Link to="/about" className="hover:text-orange-400 transition">
            About us
          </Link>
          <Link to="/roomf" className="hover:text-orange-400 transition">
            Rooms
          </Link>
          <Link to="/contact" className="hover:text-orange-400 transition">
            Contact
          </Link>
        </nav>

        <div className="flex items-center space-x-3 max-sm:flex-col max-sm:space-x-0 max-sm:space-y-2">
          {user ? (
            <>
              <span className={`${isScrolled ? 'text-black' : 'text-white'} font-medium`}>
                {`Hello, ${user.name}`}
              </span>
              <button
                onClick={handleLogout}
                className="bg-orange-400 text-white px-5 py-2 text-sm rounded hover:bg-orange-500 hover:scale-105 transform transition duration-200 shadow-md"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/signIn')}
                className="bg-orange-400 text-white px-5 py-2 text-sm rounded hover:bg-orange-500 hover:scale-105 transform transition duration-200 shadow-md"
              >
                Sign In
              </button>

              <button
                onClick={() => navigate('/signUp')}
                className="bg-white text-orange-500 px-5 py-2 text-sm rounded hover:bg-orange-100 hover:scale-105 transform transition duration-200 shadow-md border border-orange-400"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
