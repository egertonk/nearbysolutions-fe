type AddressProps = {
  country: string;
  address: string;
  city: string;
  state?: string; // Optional for non-US/Canada addresses
  zip?: string; // Optional for non-US/Canada addresses
};

export const Address: React.FC<AddressProps> = ({
  country,
  address,
  city,
  state,
  zip,
}) => (
  <span>
    {address}, {city}
    {isUSCanadaAddress(country) ? `, ${state}, ${zip}` : ""}, {country}
  </span>
);

export const isUSCanadaAddress = (country: string): boolean =>
  ["United States", "Canada"].includes(country);
