import { isUSCanadaAddress } from "./Address";

export const useMaps = (
  country: string,
  address: string,
  city: string,
  state: string,
  zip: string
) => {
  const fullAddress = isUSCanadaAddress(country)
    ? `
          ${address}, ${city}, ${state},
          ${zip}, ${country}
        `
    : `${address}, ${city}, ${country}`;

  // Links to google documentations = https://developers.google.com/maps/documentation/embed/get-started?utm_source=chatgpt.com
  const formattedAddress = encodeURIComponent(address); // Ensures the address is URL-safe
  const googleMapsUrl = `https://www.google.com/maps?q=${formattedAddress}&output=embed`;
  const googleMapsUrlWithKey = `https://www.google.com/maps/embed/v1/place?key=AIzaSyB2NIWI3Tv9iDPrlnowr_0ZqZWoAQydKJU&q=${formattedAddress}&zoom=14&maptype=roadmap`;

  return {
    formattedAddress,
    googleMapsUrl,
    googleMapsUrlWithKey,
    fullAddress,
  };
};
