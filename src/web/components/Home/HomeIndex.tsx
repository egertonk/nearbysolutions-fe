import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "../../../App.css";
import nearbySolutionsIcon from "../../assets/company-logos-icons/icononly_transparent_nobuffer.png";

export const HomeIndex: React.FC = () => {
  // Sample data: list of cities with their coordinates
  const cities = [
    { name: "New York", lat: 40.7128, lng: -74.006 },
    { name: "Los Angeles", lat: 34.0522, lng: -118.2437 },
    { name: "Chicago", lat: 41.8781, lng: -87.6298 },
    { name: "Houston", lat: 29.7604, lng: -95.3698 },
    { name: "Phoenix", lat: 33.4484, lng: -112.074 },
  ];

  // Custom icon for the markers
  const customIcon = new L.Icon({
    iconUrl: require("../../assets/company-logos-icons/icononly_transparent_nobuffer.png"),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    shadowSize: [41, 41],
  });

  return (
    <>
      <div className="px-4 sm:px-10">
        <div className="h-[400px] mt-2">
          <div className="grid md:grid-cols-2 justify-center items-center gap-10">
            <div className="max-md:order-1">
              <p className="mt-4 mb-2 font-semibold text-blue-600">
                CONNECTING YOU TO LOCAL EXPERTISE
              </p>
              <h1 className="md:text-5xl text-4xl font-bold mb-4 md:!leading-[55px]">
                Find a nearby solution effortlessly today
              </h1>
              <p className="mt-4 text-base leading-relaxed">
                Embark on a gastronomic journey with our curated dishes,
                delivered promptly to your doorstep. Elevate your dining
                experience today. Delve into the details and let us enhance
                every aspect of your dining adventure.
              </p>
              <div className="bg-white mt-10 flex px-1 py-1.5 rounded-full shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] overflow-hidden">
                <input
                  type="email"
                  placeholder="Search for a solution..."
                  className="w-full outline-none bg-white pl-4"
                />
                <button
                  type="button"
                  className="bg-purple-600 hover:bg-purple-700 transition-all text-white rounded-full px-5 py-2.5"
                >
                  Search
                </button>
              </div>
            </div>
            <div className="max-md:mt-12 h-full">
              <img
                src="https://readymadeui.com/team-image.webp"
                alt="banner img"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <MapContainer
        center={[37.0902, -95.7129]}
        zoom={4}
        className="leaflet-container"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {cities.map((city, index) => (
          <Marker key={index} position={[city.lat, city.lng]} icon={customIcon}>
            <Popup>{city.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};
