import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useSelector } from "react-redux";
import { Navigation } from "swiper/modules";
import Footer from "./Footer";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
  FaHome,
  FaFireAlt, 
  FaDoorClosed,
  FaDoorOpen,
  FaBuilding,
  FaBook,
  FaPhoneAlt,
} from "react-icons/fa";
import Contact from "../components/Contact";

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
    // 
  }, [params.listingId]);
  function handleCall() {
    window.location.href = 'tel:+38163413113';
  }
  
  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Učitavanje...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation className="slajder max-w-6xl rounded-md mt-10">
          <p className="cenaDetail text-2xl font-semibold">
              
              {listing.offer
                ? listing.discountPrice.toLocaleString("en-US")
                : listing.regularPrice.toLocaleString("en-US")}
              {listing.type === "mesečno" && " / mesečno"} €
            </p>
            {

            listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: window.innerWidth < 640 ? 'contain' : 'cover'
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
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
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )} */}
          <div className="flex flex-col max-w-6xl mx-auto p-3 my-5 gap-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
  <p className="text-2xl font-semibold self-start mb-4 sm:mb-0">
    {listing.name}
  </p>
  <button
    onClick={() => handleCall()}
    className="callme bg-superstan flex justify-center items-center text-center font-semibold gap-2 text-white rounded-lg hover:opacity-95 p-3 w-full sm:w-auto sm:px-20">
    <FaPhoneAlt></FaPhoneAlt> 063 413 113
  </button>
</div>

            <p className="flex items-center mt-1 gap-2 text-slate-900 font-semibold text-lg">
              <FaMapMarkerAlt className="text-superstan" />
              {listing.address} - {listing.opstina}
            </p>
            <div className="flex gap-4">
              <p className="bg-superstan w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listing.type === "rent" ? "Iznajmljivanje" : "Prodaja"}
              </p>
              {listing.offer && (
                <p className="bg-superstan w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  ${+listing.regularPrice - +listing.discountPrice} OFF
                </p>
              )}
            </div>

            <p className="text-slate-800">
              <span className="font-semibold text-black">
                Opis:<br></br>{" "}
              </span>
              {listing.description}
            </p>
            
            <section className="text-gray-400 body-font">
  <div className="container mx-auto mt-5 mb-2">
    <div className="flex flex-wrap -m-4">
      <div className="p-4 md:w-1/3 w-full">
        <div className="bg-white rounded-lg flex items-center p-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-superstan text-white mr-4">
          <FaHome className="text-lg"/>
          </div>
          <div className="flex-grow">
            <h2 className="text-black font-medium text-lg title-font">
              Vrsta Nekretnine:
            </h2>
            <p className="leading-relaxed text-base">
              {listing.propertyType}
            </p>
          </div>
        </div>
      </div>
      <div className="p-4 md:w-1/3 w-full">
        <div className="bg-white rounded-lg flex items-center p-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-superstan text-white mr-4">
          <FaBook className="text-lg"/>
          </div>
          <div className="flex-grow">
            <h2 className="text-black font-medium text-lg title-font">
              Kvadratura:
            </h2>
            <p className="leading-relaxed text-base">
              {listing.kvadratura}m2
            </p>
          </div>
        </div>
      </div>
      <div className="p-4 md:w-1/3 w-full">
        <div className="bg-white rounded-lg flex items-center p-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-superstan text-white mr-4">
          <FaMapMarkedAlt className="text-lg"/>
          </div>
          <div className="flex-grow">
            <h2 className="text-black font-medium text-lg title-font">
              Opština:
            </h2>
            <p className="leading-relaxed text-base">
              {listing.opstina}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section className="text-gray-400 body-font">
  <div className="container mx-auto mb-5">
    <div className="flex flex-wrap -m-4">
      <div className="p-4 md:w-1/3 w-full">
        <div className="bg-white rounded-lg flex items-center p-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-superstan text-white mr-4">
          <FaFireAlt className="text-lg"/>
          </div>
          <div className="flex-grow">
            <h2 className="text-black font-medium text-lg title-font">
              Tip Grejanja:
            </h2>
            <p className="leading-relaxed text-base">
              {listing.heatingType}
            </p>
          </div>
        </div>
      </div>
      <div className="p-4 md:w-1/3 w-full">
        <div className="bg-white rounded-lg flex items-center p-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-superstan text-white mr-4">
          <FaBuilding className="text-lg"/>
          </div>
          <div className="flex-grow">
            <h2 className="text-black font-medium text-lg title-font">
              Sprat:
            </h2>
            <p className="leading-relaxed text-base">
              {listing.sprat}
            </p>
          </div>
        </div>
      </div>
      <div className="p-4 md:w-1/3 w-full">
        <div className="bg-white rounded-lg flex items-center p-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-superstan text-white mr-4">
          <FaDoorOpen className="text-lg"/>
          </div>
          <div className="flex-grow">
            <h2 className="text-black font-medium text-lg title-font">
              Broj Soba:
            </h2>
            <p className="leading-relaxed text-base">
              {listing.bathrooms}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<section className="text-gray-400 body-font">
  <div className="container mx-auto mb-5">
    <div className="flex flex-wrap -m-4">
      <div className="p-4 md:w-1/3 w-full">
        <div className="bg-white rounded-lg flex items-center p-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-superstan text-white mr-4">
          <FaChair className="text-lg"/>
          </div>
          <div className="flex-grow">
            <h2 className="text-black font-medium text-lg title-font">
              Opremljen:
            </h2>
            <p className="leading-relaxed text-base">
            {listing.furnished ? "Opremljen" : "Neopremljen"}
            </p>
          </div>
        </div>
      </div>
      
      <div className="p-4 md:w-1/3 w-full">
        <div className="bg-white rounded-lg flex items-center p-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-superstan text-white mr-4">
          <FaParking  className="text-lg"/>
          </div>
          <div className="flex-grow">
            <h2 className="text-black font-medium text-lg title-font">
              Parking:
            </h2>
            <p className="leading-relaxed text-base">
            {listing.parking ? "Parking Mesto" : "Nema Parking"}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

            {/* <p className="text-slate-800">
              <span className="font-semibold text-black">Kvadratura: </span>
              {listing.kvadratura}m2
            </p>

            <p className="text-slate-800">
              <span className="font-semibold text-black">Opština: </span>
              {listing.opstina}
            </p>
            <p className="text-slate-800">
              <span className="font-semibold text-black">Vrsta grejanja: </span>
              {listing.heatingType}
            </p>
            <p className="text-slate-800">
              <span className="font-semibold text-black">Sprat: </span>
              {listing.sprat}
            </p>
            <p className="text-slate-800">
              <span className="font-semibold text-black">Broj soba: </span>
              {listing.bathrooms}
            </p> */}
            {/* <ul className="text-superstan font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <span className="font-semibold text-black">Ostalo: </span>
              </li>

              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaParking className="text-lg" />
                {listing.parking ? "Parking Mesto" : "Nema Parking"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaChair className="text-lg" />
                {listing.furnished ? "Opremljen" : "Neopremljen"}
              </li>
            </ul> */}
            
            {/* <Contact listing={listing} /> */}
          </div>
        </div>
      )}
      <Footer></Footer>
    </main>
  );
}
