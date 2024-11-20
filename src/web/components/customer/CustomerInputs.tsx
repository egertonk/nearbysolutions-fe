import { useSelector } from "react-redux";
import { customerInputCSS, errorCss } from "../../assets/common-css/css";
import { RootState } from "../../../store";

type CustomerInputTypes = {
  id: string;
  value: string;
  placeHolder: string;
  updateInfo: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
};

export const CustomerInputs: React.FC<CustomerInputTypes> = ({
  id,
  value,
  placeHolder,
  updateInfo,
}) => {
  return (
    <input
      className={`${customerInputCSS} ${value.length === 0 && errorCss}`}
      id={id}
      name={id}
      type="text"
      placeholder={placeHolder}
      value={value}
      onChange={updateInfo}
    />
  );
};
