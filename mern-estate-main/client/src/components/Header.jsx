import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/nekretnine?${searchQuery}`);
  };
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
      <header className='bg-white shadow-md relative'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
          <Link to='/' className='ml-5 sm:ml-0'>
              <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                  <img className='img' src="https://i.imgur.com/Q1ig12D.jpeg" alt="" />
              </h1>
          </Link>

          {/* Hamburger Menu Button */}
          <button onClick={toggleMenu} className="sm:hidden z-50 mr-5 text-4xl">
              {isMenuOpen ? <FaTimes className="text-superstan" /> : <FaBars className="text-superstan" />}
          </button>

          {/* Mobile Menu */}
          <div className={`${isMenuOpen ? 'fixed inset-0 bg-white flex flex-col items-center justify-center' : 'hidden'} z-40 sm:hidden`}>
              {/* Additional Close Button for visibility */}
              {/* <button onClick={toggleMenu} className="absolute top-3 right-3 text-2xl text-black">
                  <FaTimes />
              </button> */}
              <Link to='/' onClick={() => setIsMenuOpen(false)} className='text-slate-700 hover:underline text-lg mb-6'>
                  Početna
              </Link>
              <Link to='/nekretnine' onClick={() => setIsMenuOpen(false)} className='text-slate-700 hover:underline text-lg mb-6'>
                  Sve Nekretnine
              </Link>
              <Link to='/kontakt' onClick={() => setIsMenuOpen(false)} className='text-white font-bold py-2 px-4 rounded bg-superstan hover:bg-red-500 text-lg mb-6'>
                  Kontakt
              </Link>
              <Link to='/admin' onClick={() => setIsMenuOpen(false)} className='mb-6'>
                  <img
                      className='rounded-full h-12 w-12 object-cover'
                      src={currentUser ? currentUser.avatar : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
                      alt='profile'
                  />
              </Link>
          </div>

          {/* Desktop Menu */}
          <ul className='hidden sm:flex items-center gap-4'>
              <Link to='/'>
                  <li className='text-slate-700 hover:underline'>Početna</li>
              </Link>
              <Link to='/nekretnine'>
                  <li className='text-slate-700 hover:underline'>Sve Nekretnine</li>
              </Link>
              <Link to='/kontakt' className='button-container mx-auto flex-none bg-superstan hover:bg-red-500 text-white font-bold py-2 px-4 rounded'>
                  <p className="inline-block">Kontakt</p>
              </Link>
              <Link to='/admin'>
                  <img
                      className='rounded-full h-7 w-7 object-cover'
                      src={currentUser ? currentUser.avatar : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
                      alt='profile'
                  />
              </Link>
          </ul>
      </div>
  </header>
  );
}
