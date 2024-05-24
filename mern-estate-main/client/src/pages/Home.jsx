import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useNavigate } from 'react-router-dom';
import SwiperCore from "swiper";
import "swiper/css/bundle";
import Footer from "./Footer.jsx";
import "../../src/index.css";
import ListingItem from "../components/ListingItem";
// import { useHistory } from "react-router-dom";

// import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
const features = [
  {
    name: "Uvek uz vas",
    description: "Besplatna procena vrednosti nekretnine",
  },
  {
    name: "Iskusan tim",
    description:
      "Iskusni agenti na raspolaganju tokom celog procesa kupoprodaje",
  },
  {
    name: "Pravno osigurani",
    description:
      "Prikupljanje dokumentacije za sastavljanje ugovora i pravna podrška",
  },
];
export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  const navigate = useNavigate();
  // const history = useHistory();
  const [sidebardata, setSidebardata] = useState({
    type: 'all',
    propertyType: 'all',
    opstina: 'all',
  });
  

  const handleChange = (e) => {

    if (e.target.id === 'type') {
      setSidebardata({ ...sidebardata, type: e.target.value });
    }

    if (e.target.id === 'tipNekretnine') {
      setSidebardata({ ...sidebardata, propertyType: e.target.value });
    }
   

    if (e.target.id === 'opstina') {
      // if(e.target.value === 'Stan' || e.target.value === 'Kuća'){
    setSidebardata({ ...sidebardata, opstina: e.target.value });
    // }
  }
    // }

  };
  
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/listing/get?offer=true&limit=4`);
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        // console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/listing/get?type=Iznajmljivanje&limit=3`);
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
        
      } catch (error) {
        // console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/listing/get?type=Prodaja&limit=3`);
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div>
      {/* top */}
      <div
        style={{
          backgroundImage: "url(" + "https://i.imgur.com/qCsHAh0.png" + ")",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className="flex text-center flex-col gap-6 p-40 px-3  mx-auto"
      >
        <h1 className="text-white font-bold text-3xl lg:text-6xl">
          Kupite ili zakupite stan
          <br />
          bez provizije
        </h1>
        <div className="text-gray-100 text-xs sm:text-sm">
          Superstan - Vaš pouzdani partner za nekretnine
        </div>
        <div className="flex items-center justify-center p-4">
        <div className="bg-white max-w-xs sm:max-w-3xl p-2 flex flex-col md:flex-row justify-between items-center rounded w-full">
        <div className="flex flex-col md:flex-row pl-4 pr-4 items-center gap-2 md:gap-5 w-full">
        <label className="flex flex-col md:flex-row items-center gap-2 md:gap-3 w-full">      
          <span className="text-gray-700">Usluga</span>
          <select
          className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-full"
          id="type"
          onChange={handleChange}
        ><option selected value='all'>Sve usluge</option>
          <option value={'Prodaja'}>Prodaja</option>
          <option value={'Iznajmljivanje'}>Iznajmljivanje</option>
          {/* Other options */}
        </select>
      </label>
      <label className="flex flex-col md:flex-row items-center gap-2 md:gap-3 w-full">     
         <span className="text-gray-700">Tip</span>
         <select
          className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-full"
          id="tipNekretnine"
          onChange={handleChange}
        >
          <option selected value='all'>Svi Tipovi</option>
          <option value='Stan'>Stan</option>
          <option value='Kuća'>Kuća</option>
          {/* Other options */}
        </select>
      </label>
      <label className="flex flex-col md:flex-row items-center gap-2 md:gap-3 w-full">     
         <span className="text-gray-700">Opština</span>
        <select
          className="rounded-lg p-3 bg-white border border-gray-300 text-gray-700 py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-full"
          id="opstina"
          onChange={handleChange}
          defaultValue={''}
          
        >
         <option selected value='all'>Sve opštine</option>

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
      </label>
    </div>
    {/* <option value={'Voždovac'}>Voždovac</option>
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
        <option value={'Sopot'}>Sopot</option> */}
    <button
            className="btn bg-superstan p-3 focus:outline-none rounded shadow w-full md:w-auto mt-4 md:mt-0"
        onClick={() => {
          navigate(`/nekretnine?type=${sidebardata.type}&tipNekretnine=${sidebardata.propertyType}&opstina=${sidebardata.opstina}`);
        
          // history.push(`/nekretnine?type=${sidebardata.type}&tipNekretnine=${sidebardata.propertyType}&opstina=${sidebardata.opstina}&search=true`);
        }}
    >
      <FaSearch className="text-white"></FaSearch>
    </button>
    <button
            className="btn2 font-bold bg-superstan p-3 text-white focus:outline-none rounded shadow w-full md:w-auto mt-4 md:mt-0"
        onClick={() => {
          navigate(`/nekretnine?type=${sidebardata.type}&tipNekretnine=${sidebardata.propertyType}&opstina=${sidebardata.opstina}`);
        
          // history.push(`/nekretnine?type=${sidebardata.type}&tipNekretnine=${sidebardata.propertyType}&opstina=${sidebardata.opstina}&search=true`);
        }}
    >
      Pretraga
    </button>
  </div>
</div>


        
        <Link
          to={"/nekretnine"}
          className="button-container mx-auto flex-none  bg-superstan hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          <p className=" inline-block">Pogledajte sve nekretnine</p>
        </Link>
      </div>

      {/* swiper */}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* listing results for offer, sale and rent */}

      <div className="listingContainer max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="flex my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Najnovije nekretnine
              </h2>
              <Link
                className="text-sm text-red-800 hover:underline"
                to={"/search?offer=true"}
              >
                Prikaži više
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.slice(0, 3).map((listing) => (
                <ListingItem className="widthFix" listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Najnovije nekretnine za iznajmljivanje
              </h2>
              <Link
                className="text-sm text-red-800 hover:underline"
                to={"/search?type=Iznajmljivanje"}
              >
                Prikaži više
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.slice(0, 3).map((listing) => (
                <ListingItem className="widthFix" listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Najnovije nekretnine za prodaju
              </h2>
              <Link
                className="text-sm text-red-800 hover:underline"
                to={"/search?type=sale"}
              >
                Prikaži više
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.slice(0, 3).map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="borderss shadow-md overflow-hidden max-w-6xl mx-auto bg-white py-15 mb-20 sm:py-9">
        <div className="aboutContainer mx-auto max-w-6xl px-6 lg:px-8"  style={{
                paddingRight:"0",
              }}>
          <div className="about mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pr-8 lg:pt-4">
              <div className="lg:max-w-lg">
                <h2 className="text-base font-semibold leading-7 text-red-600">
                  O nama
                </h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Brzo i sigurno prodajte i izdajte svoju nekretninu
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                Superstan je renomirana agencija za nekretnine sa sedištem u Beogradu, specijalizovana za prodaju, izdavanje i upravljanje nekretninama. Osnovana sa ciljem pružanja visokokvalitetnih usluga, Superstan se ponosi svojim profesionalnim pristupom, stručnim timom agenata i posvećenošću zadovoljstvu klijenata. Bez obzira da li tražite stan za iznajmljivanje, kuću za kupovinu ili investirate u komercijalne nekretnine, Superstan vam nudi sveobuhvatnu podršku kroz ceo proces. 
                </p>
                <dl className="mt-5 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                  {features.map((feature) => (
                    <div key={feature.name} className="relative">
                      <dt className="inline font-semibold text-gray-900">
                        {/* <feature.icon className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" /> */}
                        {feature.name}
                      </dt>{" "}
                      <dd className="inline">{feature.description}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <Link
                to={"/kontakt"}
                style={{
                  width: "100%",
                  textAlign:"center"
                }}
                className="button-container mx-auto flex-none mt-5 bg-superstan hover:bg-red-700 text-white hover:text-white font-bold py-2 px-4 rounded"
              >
                <p className="inline-block">Kontaktirajte Nas</p>
              </Link>
            </div>
            <img
              style={{
                width: "500px",
                height:"100%",
                objectFit:"cover",
                maxWidth: "none",
                borderRadius: "0.75rem",
                boxShadow:
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                border: "4px solid #9f1d21",
              }}
              src="https://images.pexels.com/photos/87223/pexels-photo-87223.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Product screenshot"
              className="aboutImg w-[48rem] max-w-none rounded-xl border-3 border-superstan shadow-xl ring-1 ring-gray-400/10 sm:w-[100%] md:-ml-4 lg:-ml-0"
              
            />
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundImage: "url(" + "https://i.imgur.com/i9BhzUA.png" + ")",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          borderRadius: "24px",
        }}
        className="cta flex text-center mt-10 mb-20 flex-col gap-6 p-28 px-3 max-w-6xl mx-auto"
      >
        <h1 className="text-white font-bold text-3xl lg:text-6xl">
          Otkrijte nekretninu iz snova
          <br />
          već danas!
        </h1>
        <div className="text-gray-100 text-xs sm:text-sm">
          Superstan - Vaš pouzdani partner za nekretnine
        </div>
        <Link
          to={"/nekretnine"}
          className="button-container mx-auto flex-none  bg-white hover:bg-red-700 text-superstan hover:text-white font-bold py-2 px-4 rounded"
        >
          <p className=" inline-block">Pogledaj ponudu</p>
        </Link>
      </div>
      <Footer></Footer>
    </div>
  );
}
