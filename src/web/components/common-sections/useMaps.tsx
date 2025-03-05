import { isUSCanadaAddress } from "./Address";

export const useMaps = (
  country: string,
  address: string,
  city: string,
  state?: string,
  zip?: string
) => {
  const fullAddress = isUSCanadaAddress(country)
    ? `${address}, ${city}, ${state}, ${zip}, ${country}`
    : `${address}, ${city}, ${country}`;

  // Ensure the full address is properly encoded for URLs
  const formattedAddress = encodeURIComponent(fullAddress);

  const googleMapsUrl = `https://www.google.com/maps?q=${formattedAddress}&output=embed`;
  const googleMapsUrlWithKey = `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${formattedAddress}&zoom=14&maptype=roadmap`;

  return {
    formattedAddress,
    googleMapsUrl,
    googleMapsUrlWithKey,
    fullAddress,
  };
};
