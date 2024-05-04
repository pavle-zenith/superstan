import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ListingItem from '../components/ListingItem';
import MultiSelectDropdown from '../components/MultiSelectDropdown';
import Footer from './Footer.jsx';

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    sprat:'1',
    spratTotal:'1',
    propertyType:'all',
    opstina:'',
    kvadratura:0,
    regularPrice:0,
    parking: false,
    furnished: false,
    offer: false,
    sort: 'created_at',
    order: 'desc',
  });
  const options = ['Čukarica','Novi Beograd','Paliula','Rakovica','Savski venac', 'Stari grad','Voždovac','Vračar','Zemun','Zvezdara','Barajevo','Grocka','Lazarevac','Mladenovac','Obrenovac','Sopot','Surčin'];
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
    const opstinaFromUrl = urlParams.get('opstina');
    const tipNekretnineFromUrl = urlParams.get('tipNekretnine');

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl ||
      opstinaFromUrl || 
      tipNekretnineFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        parking: parkingFromUrl === 'true' ? true : false,
        furnished: furnishedFromUrl === 'true' ? true : false,
        offer: offerFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
        opstina: opstinaFromUrl || '',
        tipNekretnine: tipNekretnineFromUrl || '',
      });
    }

    if (urlParams.get('search')) {
      console.log('search');
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      console.log(data);
      console.log(searchQuery)
      // if (data.length > 8) {
      //   setShowMore(true);
      // } else {
      //   setShowMore(false);
      // }
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
    if (e.target.id === 'tipNekretnine') {
      setSidebardata({ ...sidebardata, tipNekretnine: e.target.value });
    }
    if (e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'created_at';

      const order = e.target.value.split('_')[1] || 'desc';

      setSidebardata({ ...sidebardata, sort, order });
    }

    if (e.target.id === 'opstina') {
      // if(e.target.value === 'Stan' || e.target.value === 'Kuća'){
    setSidebardata({ ...sidebardata, opstina: e.target.value });
    // }
  }
    // }
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
    urlParams.set('opstina', sidebardata.opstina);
    urlParams.set('tipNekretnine', sidebardata.tipNekretnine);
    const searchQuery = urlParams.toString();
    navigate(`/nekretnine?${searchQuery}`);
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
    <div>
    <div className='flex flex-col lg:flex-row'>
  <div className='p-7 border-b-2 lg:border-r-2 lg:min-h-screen lg:w-1/4'>
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
            {/* <div className='flex gap-2'>
              <input
                type='checkbox'
                id='all'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.type === 'all'}
              />
              <span>Iznajmljivanje i Prodaja</span>
            </div> */}
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
          {/* <MultiSelectDropdown options={options} /> */}
          <label className="flex flex-col md:flex-row pr-4 items-center gap-5 w-full">
        <span className="whitespace-nowrap font-semibold">Opština: </span>
        <select
          className="border rounded-lg p-3"
          id="opstina"
          onChange={handleChange}
          defaultValue={''}
          
        >
         <option selected value='all'>Sve opštine</option>

          <option value={'Voždovac'}>Voždovac</option>
        <option value={'Čukarica'}>Čukarica</option>
        <option value={'Banjica'}>Banjica</option>
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
      </label>
            
          </div>
          <div className='flex items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>
              Kvadratura:
            </label>
            <input
              type='number'
              id=''
              placeholder=''
              className='border rounded-lg p-3 w-3/12'
              
              onChange={handleChange}
            />
            <label className='whitespace-nowrap font-semibold'>
            m<sup>2</sup>
            </label>
            <input
              type='number'
              id='searchTerm'
              placeholder='max'
              className='border rounded-lg p-3 w-3/12'
              // value={sidebardata.searchTerm}
              onChange={handleChange}
            />
            <label className='whitespace-nowrap font-semibold'>
            m<sup>2</sup>
            </label>
          </div>
          <div className='flex items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>
              Cena:
            </label>
            <input
              type='number'
              id='min_kvadratura' 
              placeholder=''
              className='border rounded-lg p-3 w-3/12'
              // value={sidebardata.searchTerm}
              // onChange={handleChange}
            />
            <label className='whitespace-nowrap font-semibold'>
            €
            </label>
            <input
              type='number'
              id='searchTerm'
              placeholder='max'
              className='border rounded-lg p-3 w-3/12'
              // value={sidebardata.searchTerm}
              onChange={handleChange}
            />
            <label className='whitespace-nowrap font-semibold'>
            €
            </label>
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Tip:</label>
            <select
              onChange={handleChange}
              defaultValue={''}
              id='tipNekretnine'
              className='border rounded-lg p-3'
            >
              <option selected value='all'>Izaberi tip</option>
              <option value='Stan'>Stan</option>
              <option value='Kuća'>Kuća</option>
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
          <button className='bg-superstan text-white p-3 rounded-lg hover:opacity-95'>
            Pretraga
          </button>
          </form>
          </div>
  <div className='flex-1 lg:w-3/4'>
    <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5 lg:mt-0'>
      Rezultati pretrage:
    </h1>
    <div className='p-7 grid karte grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-2 gap-4'>
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
          <div key={listing._id} className=''>
            <ListingItem listing={listing} />
          </div>
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
<Footer></Footer></div>
  );
}
