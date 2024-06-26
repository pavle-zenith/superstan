/* eslint-disable no-unused-vars */
import { useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'Iznajmljivanje',
    propertyType: 'Stan',
    struktura: "",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    sprat:1,
    spratTotal:1,
    offer: false,
    parking: false,
    furnished: false,
    kvadratura:0,
    heatingType: "Gas",
    opstina: "Voždovac",
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  


  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 16) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError('Nije uspelo uploadovanje slika (2 mb maksimum po slici)');
          setUploading(false);
        });
    } else {
      setImageUploadError('Možete da okačite maksimum 15 slika po nekretnini');
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  // const handleChange = (e) => {
  //   if (e.target.id === 'sale' || e.target.id === 'rent') {
  //     setFormData({
  //       ...formData,
  //       type: e.target.value,
  //     });
  //   }

  

  //   if (
  //     e.target.type === 'number' ||
  //     e.target.type === 'text' ||
  //     e.target.type === 'textarea'
  //   ) {
  //     setFormData({
  //       ...formData,
  //       [e.target.id]: e.target.value,
  //     });
  //   } else {
  //     setFormData({
  //       ...formData,
  //       [e.target.id]: e.target.value,
  //     });
  //   }
  // };
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
  
    setFormData((prevFormData) => {
      const newFormData = {
        ...prevFormData,
        [id]: newValue,
      };
  
      // Log the new state value after the state update
  
      return newFormData;
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError('Morate okačiti najmanje jednu sliku!');
      if (+formData.regularPrice < +formData.discountPrice)
        return setError('Discount price must be lower than regular price');
      setLoading(true);
      setError(false);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/listing/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/nekretnina/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Kreiraj Nekretninu
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
          <input
            type='text'
            placeholder='Naziv'
            className='border p-3 rounded-lg'
            id='name'
            maxLength='62'
            minLength='5'
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            type='text'
            placeholder='Opis'
            className='border p-3 rounded-lg'
            id='description'
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type='text'
            placeholder='Adresa'
            className='border p-3 rounded-lg'
            id='address'
            required
            onChange={handleChange}
            value={formData.address}
          />
          <input
            type='text'
            placeholder='Struktura'
            className='border p-3 rounded-lg'
            id='struktura'
            required
            onChange={handleChange}
            value={formData.struktura}
          />
          <select 
            className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            id="opstina"
            onChange={handleChange}
            value={formData.opstina}
          >
            <option value={'Voždovac'}>Voždovac</option>
            <option value={'Banjica'}>Banjica</option>
            <option value={'Čukarica'}>Čukarica</option>
            <option value={'Novi Beograd'}>Novi Beograd</option>
            <option value={'Palilula'}>Palilula</option>
            <option value={'Rakovica'}>Rakovica</option>
            <option value={'Surčin'}>Surčin</option>
            <option value={'Savski Venac'}>Savski Venac</option>
            <option value={'Stari Grad'}>Stari Grad</option>
            <option value={'Vračar'}>Vračar</option>
            <option value={'Zemun'}>Zemun</option>
            <option value={'Zvezdara'}>Zvezdara</option>
            <option value={'Barajevo'}>Barajevo</option>
            <option value={'Grocka'}>Grocka</option>
            <option value={'Mladenovac'}>Mladenovac</option>
            <option value={'Lazarevac'}>Lazarevac</option>
            <option value={'Obrenovac'}>Obrenovac</option>
            <option value={'Surčin'}>Surčin</option>
            <option value={'Sopot'}>Sopot</option>
          </select>
          <select 
            className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            id="propertyType"
            onChange={handleChange}
            value={formData.propertyType}
          >
            <option value='Stan'>Stan</option>
            <option value='Kuća'>Kuća</option>
          </select>
          <select
  className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
  id="type"
  onChange={handleChange}
  value={formData.type}
>
  <option value='Prodaja'>Prodaja</option>
  <option value='Iznajmljivanje'>Iznajmljivanje</option>
</select>
          <div className='flex gap-6 flex-wrap'>
          
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='parking'
                className='w-5'
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='furnished'
                className='w-5'
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Opremljen</span>
            </div>
            
          </div>
          <div className='flex flex-wrap gap-6'>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='bedrooms'
                min='1'
                max='10'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <p>Broj Kupatila</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='bathrooms'
                min='1'
                max='10'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <p>Broj Soba</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='kvadratura'
                min='1'
                max='10000'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                value={formData.kvadratura}
              />
              <p>Kvadratura</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='regularPrice'
                min='50'
                max='10000000'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div className='flex flex-col items-center'>
                <p>Cena (eur)</p>
                {formData.type === 'rent' && (
                  <span className='text-xs'>(eur / mesečno)</span>
                )}
              </div>
            </div>
            <div className='flex items-center gap-2'>
               <input
                type='text'
                id='heatingType'
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                value={formData.heatingType}
              />
              <div className='flex flex-col items-center'>
                <p>Vrsta grejanja</p>
              </div>
            </div>
            {formData.offer && (
              <div className='flex items-center gap-2'>
                <input
                  type='number'
                  id='discountPrice'
                  min='0'
                  max='10000000'
                  required
                  className='p-3 border border-gray-300 rounded-lg'
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <div className='flex flex-col items-center'>
                  <p>Snižena cena</p>

                  {formData.type === 'rent' && (
                    <span className='text-xs'>(eur / mesečno)</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='flex flex-col flex-1 gap-4'>
          <p className='font-semibold'>
            Slike:
            <span className='font-normal text-gray-600 ml-2'>
              Prva slika će biti naslovna (maks 15)
            </span>
          </p>
          <div className='flex gap-4'>
            <input
              onChange={(e) => setFiles(e.target.files)}
              className='p-3 border border-gray-300 rounded w-full'
              type='file'
              id='images'
              accept='image/*'
              multiple
            />
            <button
              type='button'
              disabled={uploading}
              onClick={handleImageSubmit}
              className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
            >
              {uploading ? 'Učitavam...' : 'Učitaj'}
            </button>
          </div>
          <p className='text-red-700 text-sm'>
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className='flex justify-between p-3 border items-center'
              >
                <img
                  src={url}
                  alt='listing image'
                  className='w-20 h-20 object-contain rounded-lg'
                />
                <button
                  type='button'
                  onClick={() => handleRemoveImage(index)}
                  className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                >
                Obriši
                </button>
              </div>
            ))}
          <button
            disabled={loading || uploading}
            className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          >
            {loading ? 'Kreiranje...' : 'Kreiraj Nekretninu'}
          </button>
          {error && <p className='text-red-700 text-sm'>{error}</p>}
        </div>
      </form>
    </main>
  );
}
