import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import Footer from './Footer';
import 'swiper/css/bundle';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from 'react-icons/fa';
import Contact from '../components/Contact';

// https://sabe.io/blog/javascript-format-numbers-commas#:~:text=The%20best%20way%20to%20format,format%20the%20number%20with%20commas.

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main>
      {loading && <p className='text-center my-7 text-2xl'>Učitavanje...</p>}
      {error && (
        <p className='text-center my-7 text-2xl'>Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div >
          <Swiper navigation className='max-w-6xl rounded-md mt-10'>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[550px]'
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
            <FaShare
              className='text-slate-500'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
              Link copied!
            </p>
          )}
          <div className='flex flex-col max-w-6xl mx-auto p-3 my-5 gap-4'>
            <p className='text-2xl font-semibold'>
              {listing.name} - €{' '}
              {listing.offer
                ? listing.discountPrice.toLocaleString('en-US')
                : listing.regularPrice.toLocaleString('en-US')}
              {listing.type === 'mesečno' && ' / mesečno'}
            </p>
            <p className='flex items-center mt-3 gap-2 text-slate-900 font-semibold text-md'>
              <FaMapMarkerAlt className='text-red-700' />
              {listing.address} - {listing.opstina}
            </p>
            <div className='flex gap-4'>
              <p className='bg-red-600 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                {listing.type === 'rent' ? 'Iznajmljivanje' : 'Prodaja'}
              </p>
              {listing.offer && (
                <p className='bg-red-600 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                  ${+listing.regularPrice - +listing.discountPrice} OFF
                </p>
              )}
            </div>
            
            <p className='text-slate-800'>
              <span className='font-semibold text-black'>Opis:<br></br> </span>
              {listing.description}
            </p>
            <p className='text-slate-800'>
              <span className='font-semibold text-black'>Vrsta Nekretine: </span>
              {listing.propertyType}
            </p>
            <section className="text-gray-400 body-font">
  <div className="container mx-auto mt-5 mb-5">
    
    <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
      <div className="p-4 bg-white rounded-lg  md:w-1/3 flex">
      <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-red-500 text-white mb-4 flex-shrink-0">
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            className="w-6 h-6"
            viewBox="0 0 24 24"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </div>
        <div className="flex-grow pl-6">
          <h2 className="text-black font-medium text-lg title-font mb-2">
          Kvadratura:
          </h2>
          <p className="leading-relaxed text-base">
          {listing.kvadratura}m2
          </p>
          
        </div>
      </div>
      <div className="p-4 md:w-1/3 flex">
        <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-red-500 text-white mb-4 flex-shrink-0">
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            className="w-6 h-6"
            viewBox="0 0 24 24"
          >
            <circle cx={6} cy={6} r={3} />
            <circle cx={6} cy={18} r={3} />
            <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12" />
          </svg>
        </div>
        <div className="flex-grow pl-6">
          <h2 className="text-black font-medium text-lg title-font mb-2">
            The Catalyzer
          </h2>
          <p className="leading-relaxed text-base">
            Blue bottle crucifix vinyl post-ironic four dollar toast vegan
            taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh mi
            pug VHS try-hard ugh iceland kickstarter tumblr live-edge tilde.
          </p>
          
        </div>
      </div>
      <div className="p-4 md:w-1/3 flex">
      <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-red-500 text-white mb-4 flex-shrink-0">
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            className="w-6 h-6"
            viewBox="0 0 24 24"
          >
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
            <circle cx={12} cy={7} r={4} />
          </svg>
        </div>
        <div className="flex-grow pl-6">
          <h2 className="text-black font-medium text-lg title-font mb-2">
            Neptune
          </h2>
          <p className="leading-relaxed text-base">
            Blue bottle crucifix vinyl post-ironic four dollar toast vegan
            taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh mi
            pug VHS try-hard ugh iceland kickstarter tumblr live-edge tilde.
          </p>
          
        </div>
      </div>
    </div>
  </div>
</section>

              <p className='text-slate-800'>
                <span className='font-semibold text-black'>Kvadratura: </span>
                {listing.kvadratura}m2
              </p>
            
            
            <p className='text-slate-800'>
              <span className='font-semibold text-black'>Opština: </span>
              {listing.opstina}
            </p>
            <p className='text-slate-800'>
              <span className='font-semibold text-black'>Vrsta grejanja: </span>
              {listing.heatingType}
            </p>
            <p className='text-slate-800'>
              <span className='font-semibold text-black'>Sprat:  </span>
              {listing.sprat}
            </p>
            <p className='text-slate-800'>
              <span className='font-semibold text-black'>Broj soba:  </span>
              {listing.bathrooms}
            </p>
            <ul className='text-red-600 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
              
            <li className='flex items-center gap-1 whitespace-nowrap '>
            <span className='font-semibold text-black'>Ostalo:  </span>
              </li>
              
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaParking className='text-lg' />
                {listing.parking ? 'Parking Mesto' : 'Nema Parking'}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaChair className='text-lg' />
                {listing.furnished ? 'Opremljen' : 'Neopremljen'}
              </li>
            </ul>
            <button
                onClick={() => setContact(true)}
                className='bg-red-500 text-white rounded-lg mt-19 mb-20 hover:opacity-95 p-3'
              >
                Kontakt
              </button>
              {/* <Contact listing={listing} /> */}
          </div>
        </div>
      )}
      <Footer></Footer>
    </main>
  );
}
