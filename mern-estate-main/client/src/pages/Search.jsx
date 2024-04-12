import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/ListingItem';
import Footer from './Footer.jsx';

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    sprat:'1',
    spratTotal:'1',
    propertyType:'Stan',
    kvadratura:0,
    regularPrice:0,
    parking: false,
    furnished: false,
    offer: false,
    sort: 'created_at',
    order: 'desc',
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const parkingFromUrl = urlParams.get('parking');
    const furnishedFromUrl = urlParams.get('furnished');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        parking: parkingFromUrl === 'true' ? true : false,
        furnished: furnishedFromUrl === 'true' ? true : false,
        offer: offerFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === 'all' ||
      e.target.id === 'Iznajmljivanje' ||
      e.target.id === 'Prodaja'
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === 'true' ? true : false,
      });
    }

    if (e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'created_at';

      const order = e.target.value.split('_')[1] || 'desc';

      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('type', sidebardata.type);
    urlParams.set('parking', sidebardata.parking);
    urlParams.set('furnished', sidebardata.furnished);
    urlParams.set('offer', sidebardata.offer);
    urlParams.set('sort', sidebardata.sort);
    urlParams.set('order', sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };
  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7  border-b-2 md:border-r-2 md:min-h-screen'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
          <div className='flex items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>
              Termin pretrage:
            </label>
            <input
              type='text'
              id='searchTerm'
              placeholder='Pretraži...'
              className='border rounded-lg p-3 w-full'
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Tip Usluge:</label>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='all'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.type === 'all'}
              />
              <span>Iznajmljivanje i Prodaja</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='Iznajmljivanje'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.type === 'Iznajmljivanje'}
              />
              <span>Iznajmljivanje</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='Prodaja'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.type === 'Prodaja'}
              />
              <span>Prodaja</span>
            </div>
            {/* <div className='flex gap-2'>
              <input
                type='checkbox'
                id='offer'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.offer}
              />
              <span>Akcija</span>
            </div> */}
          </div>
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Pogodnosti:</label>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='parking'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.parking}
              />
              <span>Parking</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='furnished'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.furnished}
              />
              <span>Opremljen</span>
            </div>
          </div>
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Lokacija:</label>
            
            
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='furnished'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.furnished}
              />
              <span>Rakovica</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='furnished'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.furnished}
              />
              <span>Zemun</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='furnished'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.furnished}
              />
              <span>Vračar</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='furnished'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.furnished}
              />
              <span>Voždovac</span>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>
              Kvadratura:
            </label>
            <input
              type='text'
              id='searchTerm'
              placeholder='Minimum'
              className='border rounded-lg p-3 w-3/12'
              // value={sidebardata.searchTerm}
              onChange={handleChange}
            />
            <label className='whitespace-nowrap font-semibold'>
              m2
            </label>
            <input
              type='text'
              id='searchTerm'
              placeholder='Maksimum'
              className='border rounded-lg p-3 w-3/12'
              // value={sidebardata.searchTerm}
              onChange={handleChange}
            />
            <label className='whitespace-nowrap font-semibold'>
              m2
            </label>
          </div>
          <div className='flex items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>
              Cena:
            </label>
            <input
              type='text'
              id='searchTerm'
              placeholder='Minimum'
              className='border rounded-lg p-3 w-3/12'
              // value={sidebardata.searchTerm}
              onChange={handleChange}
            />
            <label className='whitespace-nowrap font-semibold'>
              eur
            </label>
            <input
              type='text'
              id='searchTerm'
              placeholder='Maksimum'
              className='border rounded-lg p-3 w-3/12'
              // value={sidebardata.searchTerm}
              onChange={handleChange}
            />
            <label className='whitespace-nowrap font-semibold'>
              eur
            </label>
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Tip:</label>
            <select
              onChange={handleChange}
              defaultValue={'created_at_desc'}
              id='sprat'
              className='border rounded-lg p-3'
            >
              <option value='regularPrice_desc'>Stan</option>
              <option value='regularPrice_desc'>Kuća</option>
            </select>
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Sortiranje:</label>
            <select
              onChange={handleChange}
              defaultValue={'created_at_desc'}
              id='sort_order'
              className='border rounded-lg p-3'
            >
              <option value='regularPrice_desc'>Cena viša ka nižoj</option>
              <option value='regularPrice_asc'>Cena niža ka višoj</option>
              <option value='createdAt_desc'>Najnoviji</option>
              <option value='createdAt_asc'>Najstariji</option>
            </select>
          </div>
          <button className='bg-red-500 text-white p-3 rounded-lg hover:opacity-95'>
            Pretraga
          </button>
        </form>
      </div>
      <div className='flex-1'>
        <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>
          Rezultati pretrage:
        </h1>
        <div className='p-7 flex flex-wrap gap-4'>
          {!loading && listings.length === 0 && (
            <p className='text-xl text-slate-700'>Nije pronađena nijedna nekretnina!</p>
          )}
          {loading && (
            <p className='text-xl text-slate-700 text-center w-full'>
              Učitavanje...
            </p>
          )}

          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}

          {showMore && (
            <button
              onClick={onShowMoreClick}
              className='text-red-700 hover:underline p-7 text-center w-full'
            >
              Prikaži više
            </button>
          )}
        </div>
      </div>
      
    </div>
  );
}
