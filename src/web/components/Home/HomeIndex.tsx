import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "../../../App.css";
import nearbySolutionsIcon from "../../assets/company-logos-icons/icononly_transparent_nobuffer.png";
import { MainTitle } from "../common-sections/MainTitle";
import { SolutionistCard } from "../solutionist/SolutionistCard";
import { useGetUsers } from "../../utils/fetchEndpoints";
import { useNavigate } from "react-router";
import { JobListings } from "../Find-Work-Post-A-Job/JobListings";
import { useFindWorkPostAJob } from "../../lib/useFindWorkPostAJob";
import { sortList } from "../Find-Work-Post-A-Job/FindWorkPostAJob";

export const HomeIndex: React.FC = () => {
  const navigate = useNavigate();

  const { data: users, isFetching } = useGetUsers();
  const { filteredJobs } = useFindWorkPostAJob(sortList, "home-page");
  console.log("filteredJobs = ", filteredJobs);
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
      <MainTitle title={"Nearby Solution Services"} />

      <div className="grid grid-flow-col gap-4 p-4 mt-4 mb-4 h-auto bg-purple-800 text-white">
        <div className="row-span-2">
          <div className="max-md:order-1">
            <p className="mt-4 mb-2 font-semibold">
              CONNECTING YOU TO LOCAL EXPERTISE
            </p>
            <h1 className="md:text-5xl text-4xl font-bold mb-4 md:!leading-[55px]">
              Find a nearby solution effortlessly today
            </h1>
            <p className="mt-4 text-base leading-relaxed">
              Embark on a gastronomic journey with our curated dishes, delivered
              promptly to your doorstep. Elevate your dining experience today.
              Delve into the details and let us enhance every aspect of your
              dining adventure.
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
        </div>
        <div className="col-span-2">
          <div className="max-md:mt-12 h-48 mb-5">
            <img
              src="https://readymadeui.com/team-image.webp"
              alt="banner img"
              className="w-full h-64 object-cover"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-flow-col grid-rows-2 gap-4 px-4 m-1">
        <div className="col-span-2 row-span-2 text-start mt-4">
          <span className="font-bold text-2xl font-heading text-purple-800 bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
            Our Solutionists
          </span>
        </div>
        <div className="col-span-2 row-span-2 text-end p-4">
          <button
            className="mx-2 px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white gap-2 font-bold inline-flex items-center rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg"
            onClick={() => navigate("/hire-a-talent")}
          >
            View more!
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              className="w-6 h-6 ml-2"
            >
              <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
        <SolutionistCard data={users || []} lastElementRef={() => {}} />
      </div>

      <hr className="w-full h-1 mx-auto  bg-purple-300 border-0 rounded-sm dark:bg-purple-800"></hr>

      <div className="grid grid-flow-col grid-rows-2 gap-4 px-4 m-1">
        <div className="col-span-2 row-span-2 text-start mt-4">
          <span className="font-bold text-2xl font-heading text-purple-800 bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
            Find Work
          </span>
        </div>
        <div className="col-span-2 row-span-2 text-end p-4">
          <button
            className="mx-2 mx-2 px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white gap-2 font-bold inline-flex items-center rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg"
            onClick={() => navigate("/post-a-job")}
          >
            Post A Job
          </button>
          <button
            className="mx-2 px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white gap-2 font-bold inline-flex items-center rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg"
            onClick={() => navigate("/find-work-post-a-job")}
          >
            View more!
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              className="w-6 h-6 ml-2"
            >
              <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </button>
        </div>
      </div>

      <JobListings customerJobsArray={filteredJobs} />

      <hr className="w-full h-1 mx-auto  bg-purple-300 border-0 rounded-sm dark:bg-purple-800 mt-4"></hr>

      <div className="grid grid-flow-col grid-rows-2 gap-4 px-4 m-1">
        <div className="col-span-2 row-span-2 text-start mt-4">
          <span className="font-bold text-2xl font-heading text-purple-800 bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
            DIY Tools Rental
          </span>
        </div>
        <div className="col-span-2 row-span-2 text-end p-4">
          <button
            className="mx-2 mx-2 px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white gap-2 font-bold inline-flex items-center rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg"
            onClick={() => navigate("/rent-your-home-tools")}
          >
            Rent Your Home Tools
          </button>
          <button
            className="mx-2 px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white gap-2 font-bold inline-flex items-center rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg"
            onClick={() => navigate("/DIY-tools-rental")}
          >
            View more!
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              className="w-6 h-6 ml-2"
            >
              <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
        <SolutionistCard data={users || []} lastElementRef={() => {}} />
      </div>

      {/* <MapContainer
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
      </MapContainer> */}
    </>
  );
};
