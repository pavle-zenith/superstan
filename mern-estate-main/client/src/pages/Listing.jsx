import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useSelector } from "react-redux";
import { Navigation } from "swiper/modules";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
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
  FaToilet,
} from "react-icons/fa";
import Contact from "../components/Contact";

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const [mapCenter, setMapCenter] = useState([44.8125, 20.4612]); // Default center for Belgrade
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

        // Fetch coordinates for the listing address
        const coordinates = await getCoordinates(data.address);
        setMapCenter([coordinates.lat, coordinates.lon]);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  function handleCall() {
    window.location.href = 'tel:+38163413113';
  }

  const MapInvalidate = () => {
    const map = useMap();
    useEffect(() => {
      map.invalidateSize();
      map.setView(mapCenter);
    }, [map, mapCenter]);
    return null;
  };

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
              €
              {listing.offer
                ? listing.discountPrice.toLocaleString('en-US')
                : listing.regularPrice.toLocaleString('en-US')}
              {listing.type === 'Iznajmljivanje' && ' / mesečno'}
            </p>
            {listing.imageUrls.map((url) => (
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
                {listing.type}
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
                        <FaHome className="text-lg" />
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
                        <FaBook className="text-lg" />
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
                        <FaMapMarkedAlt className="text-lg" />
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
                        <FaFireAlt className="text-lg" />
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
                        <FaBuilding className="text-lg" />
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
                        <FaDoorOpen className="text-lg" />
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
                        <FaChair className="text-lg" />
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
                        <FaParking className="text-lg" />
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
                  <div className="p-4 md:w-1/3 w-full">
                    <div className="bg-white rounded-lg flex items-center p-4">
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-superstan text-white mr-4">
                        <FaToilet className="text-lg" />
                      </div>
                      <div className="flex-grow">
                        <h2 className="text-black font-medium text-lg title-font">
                          Kupatila:
                        </h2>
                        <p className="leading-relaxed text-base">
                          {listing.bedrooms}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 md:w-1/3 w-full">
                    {/* <div className="bg-white rounded-lg flex items-center p-4">
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-superstan text-white mr-4">
                        <FaToilet className="text-lg" />
                      </div>
                      <div className="flex-grow">
                        <h2 className="text-black font-medium text-lg title-font">
                          Struktura:
                        </h2>
                        <p className="leading-relaxed text-base">
                          {listing.struktura}
                        </p>
                      </div>
                    </div> */}
                  </div>
                </div>
                <MapContainer id="map" center={mapCenter} zoom={13}>
                  <MapInvalidate />
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={mapCenter}>
                    <Popup>
                      {listing.address}
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </section>
          </div>
        </div>
      )}
      <Footer></Footer>
    </main>
  );
}

// Function to fetch coordinates based on address
async function getCoordinates(address) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
  );
  const data = await response.json();

  if (data.length > 0) {
    const { lat, lon } = data[0];
    return { lat: parseFloat(lat), lon: parseFloat(lon) };
  } else {
    throw new Error('Failed to get coordinates');
  }
}
