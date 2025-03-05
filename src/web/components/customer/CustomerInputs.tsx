import { customerInputCSS, errorCss } from "../../assets/common-css/css";

type CustomerInputProps = {
  id: string;
  value: string;
  placeholder: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
};

export const CustomerInput: React.FC<CustomerInputProps> = ({
  id,
  value,
  placeholder,
  onChange,
}) => {
  const isError = value.trim().length === 0; // Ensures spaces aren't counted

  return (
    <input
      id={id}
      name={id}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`${customerInputCSS} ${isError ? errorCss : ""}`}
    />
  );
};
