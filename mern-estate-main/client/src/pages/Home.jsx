import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import Footer from "./Footer.jsx";
import "../../src/index.css";
import ListingItem from "../components/ListingItem";
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
  // console.log(offerListings);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=Iznajmljivanje&limit=3");
        const data = await res.json();
        console.log("xd")
        console.log(data);
        setRentListings(data);
        fetchSaleListings();
        
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=Prodaja&limit=3");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferListings();
    console.log(rentListings)
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
  <div className="bg-white max-w-s md:max-w-3xl p-2 flex flex-col md:flex-row justify-between items-center rounded w-full">
    <div className="flex flex-col md:flex-row pl-4 pr-4 items-center gap-5 w-full">
      <label className="flex items-center gap-3 w-full">
        <span className="text-gray-700">Usluga</span>
        <select
          className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-full"
          id="grid-state"
        >
          <option>Prodaja</option>
          <option>Iznajmljivanje</option>
          {/* Other options */}
        </select>
      </label>
      <label className="flex flex-col md:flex-row pl-4 pr-4 items-center gap-5 w-full">
        <span className="text-gray-700">Tip</span>
        <select
          className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-full"
          id="grid-state"
        >
          <option>Stan</option>
          <option>Kuća</option>
          {/* Other options */}
        </select>
      </label>
      <label className="flex flex-col md:flex-row pl-4 pr-4 items-center gap-5 w-full">
        <span className="text-gray-700">Opština</span>
        <select
          className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-full"
          id="grid-state"
        >
          <option>Voždovac</option>
        <option>Čukarica</option>
        <option>Novi Beograd</option>
        <option>Palilula</option>
        <option>Rakovica</option>
        <option>Surčin</option>
        <option>Savski Venac</option>
        <option>Stari Grad</option>
        <option>Vračar</option>
        <option>Zemun</option>
        <option>Zvezdara</option>
        <option>Barajevo</option>
        <option>Grocka</option>
        <option>Mladenovac</option>
        <option>Lazarevac</option>
        <option>Obrenovac</option>
        <option>Surčin</option>
        <option>Sopot</option>
        </select>
      </label>
    </div>
    <button className="bg-superstan p-3 focus:outline-none rounded shadow w-full md:w-auto my-2 md:my-0">
      <FaSearch className="text-white"></FaSearch>
    </button>
  </div>
</div>


        
        <Link
          to={"/search"}
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
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* listing results for offer, sale and rent */}

      <div className="listingContainer max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="flexmy-3">
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
                <ListingItem listing={listing} key={listing._id} />
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
                <ListingItem listing={listing} key={listing._id} />
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
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Maiores impedit perferendis suscipit eaque, iste dolor
                  cupiditate blanditiis ratione.
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
                to={"/search"}
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
          to={"/search"}
          className="button-container mx-auto flex-none  bg-white hover:bg-red-700 text-superstan hover:text-white font-bold py-2 px-4 rounded"
        >
          <p className=" inline-block">Pogledaj ponudu</p>
        </Link>
      </div>
      <Footer></Footer>
    </div>
  );
}
