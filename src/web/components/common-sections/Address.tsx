type Props = {
  country: string;
  address: string;
  city: string;
  state: string;
  zip: string;
};

export const Address: React.FC<Props> = ({
  country,
  address,
  city,
  state,
  zip,
}) => {
  return isUSCanadaAddress(country)? (
    <span>
      {address}, {city}, {state}, {zip}, {country}
    </span>
  ) : (
    <span>
      {address}, {city}, {country}
    </span>
  );
};

export const isUSCanadaAddress = (country: string): boolean =>
  country === "United States" || country === "Canada";
