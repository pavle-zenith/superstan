import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import Footer from './Footer.jsx';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/admin');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className=''>
    <div className='spacer p-3 max-w-lg mx-auto mb-15'>
      <h1 className='text-3xl text-center font-semibold my-7'>Administratorski Portal</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
        <input
          type='email'
          placeholder='E-Mail'
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Lozinka'
          className='border p-3 rounded-lg'
          id='password'
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className='bg-superstan text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Učitavanje...' : 'Uloguj se kao administrator'}
        </button>
        {/* <OAuth/> */}
      </form>
      {/* <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to={'/sign-up'}>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div> */}
      {error && <p className='text-red-500 mt-5'>{error}</p>}
      
    </div>
    <Footer></Footer></div>
  );
}
