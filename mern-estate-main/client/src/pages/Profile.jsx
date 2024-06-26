/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate,useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Footer from './Footer.jsx';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from '../redux/user/userSlice';

export default function Profile() {
  const fileRef = useRef(null);
  const navigate = useNavigate();
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();

  // Empty dependency array ensures this runs only once

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = `${new Date().getTime()}${file.name}`;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!data.success) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!data.success) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      // console.log("pokrenulo se");
      dispatch(signOutUserStart());
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signout`);
      const data = await res.json();
      // console.log(res);
      // console.log(data);
      if (!res.ok) {
        // console.log("ovaj if blokira");
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
      // console.log("izlgovoan");
      navigate('/prijava', { replace: true });
      // Navigate('/prijava');
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/listings/${currentUser._id}`, {
        credentials: 'include'
      });
      const data = await res.json();
      // console.log("test");
      // console.log(data);
      // if (!data.success) {
      //   setShowListingsError(true);
      //   return;
      // }
      setUserListings(data);
    } catch (error) {
      // console.log(error);
      setShowListingsError(true);
    }
  };
  useEffect(() => {
    handleShowListings(); 
  }, []);
  const handleListingDelete = async (listingId) => {
    try {
      Swal.fire({
        title: "Da li ste sigurni?",
        showDenyButton: true,
        
        confirmButtonText: "Obriši",
        denyButtonText: `Otkaži`
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire("Nekretnina uspešno izbrisana!", "", "Uspešno brisanje");
          const res = await fetch(`${import.meta.env.VITE_API_URL}/api/listing/delete/${listingId}`, {
            method: 'DELETE',
            credentials: 'include'
          });
          const data = await res.json();
          if (!data.success) {
            // console.log(data.message);
            return;
          }
          
          setUserListings((prev) =>
            prev.filter((listing) => listing._id !== listingId)
          );
        } else if (result.isDenied) {
          Swal.fire("Otkazali ste brisanje nekretnine", "", "Brisanje otkazano");
        }
      });
      
    } catch (error) {
      // console.log(error.message);
    }
  };

  return (
    <div>
      <div className='spacer p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Administrator</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type='file'
            ref={fileRef}
            hidden
            accept='image/*'
          />
          <img
            onClick={() => fileRef.current.click()}
            src={formData.avatar || currentUser.avatar}
            alt='profile'
            className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
          />
          <p className='text-sm self-center'>
            {fileUploadError ? (
              <span className='text-red-500'>
                Problem pri promeni slike (slika mora biti manja od 2 MB)
              </span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className='text-green-700'>Slika promenjena uspešno!</span>
            ) : (
              ''
            )}
          </p>
          <input
            type='text'
            placeholder='username'
            defaultValue={currentUser.username}
            id='username'
            disabled={true}
            className='border p-3 rounded-lg'
            onChange={handleChange}
          />
          <input
            type='email'
            placeholder='email'
            disabled={true}
            id='email'
            defaultValue={currentUser.email}
            className='border p-3 rounded-lg'
            onChange={handleChange}
          />
          <Link
            className='bg-superstan text-white mb-4 p-3 rounded-lg uppercase text-center hover:opacity-95'
            to={'/kreiraj-oglas'}
          >
            Kreiraj Oglas
          </Link>
        </form>
        <span onClick={handleSignOut} className='text-superstan cursor-pointer'>
          Izloguj se
        </span>
        <p className='text-red-700 mt-5'>{error ? error : ''}</p>
        <p className='text-green-700 mt-5'>
          {updateSuccess ? 'Podaci su uspešno ažurirani!' : ''}
        </p>
        <p className='text-superstan mt-5'>
          {showListingsError ? 'Greška pri prikazivanju listinga' : ''}
        </p>

        {userListings && userListings.length > 0 && (
          <div className='flex flex-col gap-4'>
            <h1 className='text-center mt-7 text-2xl font-semibold'>
              Vaše nekretnine
            </h1>
            {userListings.map((listing) => (
              <div
                key={listing._id}
                className='border rounded-lg p-3 flex justify-between items-center gap-4'
              >
                <Link to={`/nekretnina/${listing._id}`}>
                  <img
                    src={listing.imageUrls[0]}
                    alt='listing cover'
                    className='h-16 w-16 object-contain'
                  />
                </Link>
                <Link
                  className='text-slate-700 font-semibold  hover:underline truncate flex-1'
                  to={`/nekretnina/${listing._id}`}
                >
                  <p>{listing.name}</p>
                </Link>

                <div className='flex flex-col item-center'>
                  <button
                    onClick={() => handleListingDelete(listing._id)}
                    className='text-red-700 uppercase'
                  >
                    Obriši
                  </button>
                  <Link to={`/izmeni-nekretninu/${listing._id}`}>
                    <button className='text-green-700 uppercase'>Izmeni</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
