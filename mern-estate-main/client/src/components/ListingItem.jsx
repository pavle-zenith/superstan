import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

export default function ListingItem({ listing }) {
  return (
    <div className='cenaParent bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
      <p className='cena text-slate-700 text-lg font-semibold '>
          €
            {listing.offer
              ? listing.discountPrice.toLocaleString('en-US')
              : listing.regularPrice.toLocaleString('en-US')}
            {listing.type === 'Iznajmljivanje' && ' / mesečno'}
          </p>
      <Link to={`/listing/${listing._id}`}>
      
        <img
          src={
            listing.imageUrls[0] ||
            'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
          }
          alt='listing cover'
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
        />
        
        <div className='p-3 flex flex-col gap-2 w-full'>
          <div className='flex justify-between items-center mb-2'>
          <p className='truncate text-lg font-semibold text-slate-700'>
            {listing.name}
          </p>
          
          </div>
          
          <div className='flex mb-2  items-center gap-1'>
            <MdLocationOn className='h-4 w-4 text-red-700' />
            <p className='text-sm text-gray-600 font-semibold truncate w-full'>
              {listing.address}
            </p>
          </div>
          <p className='text-sm mb-3 font-semibold text-gray-600 line-clamp-2'>
            {`${listing.type} - ${listing.propertyType}`}
          </p>
          
          <div className='text-white bg-superstan rounded p-1 pl-2 pr-2 flex justify-between gap-4'>
            <div className='font-bold text-xs'>
              {listing.furnished == true
                ? `Opremljen `
                : `Nije opremljen `}
            </div>
            <div className='font-bold text-xs'>
              {`${listing.kvadratura}m`} <sup>2</sup>
            </div>
            <div className='font-bold text-xs'>
            {listing.opstina}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
