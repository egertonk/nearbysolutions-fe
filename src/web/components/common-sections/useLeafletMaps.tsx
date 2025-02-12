import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

export const useLeafletMaps = (Todo: string) => {
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

  const leafletMap = (
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
  );

  return {
    leafletMap,
  };
};
